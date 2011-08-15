var world = {};  // [y,x]
world.x=10;
world.y=15;
world.current = null; // see createWorld

function createWorld( w ) {
	var a = new Array(w.y);
	for( var height = 0; height < w.y; height++ ) {
		var row = new Array(w.x);
		
		for( var width = 0; width < w.x; width++ ) {
			row[width] = 0;
		}
		a[height] = row;
	}
	w.current = a;
}



var blockStartX = 5;
var blockStartY = 0;
var gameOver = false;
var timerInterval = 1000;
var keyTimerInterval = 250;

var block = {};
block.reset = function() {
	block.type = blockTypes[getRandomInteger(blockTypes.length)];
	block.index = 0;
	block.current = block.type[block.index];
	block.x = blockStartX;
	block.y = blockStartY;
};



var leftPressed = false;
var leftPressedTime = null;

var rightPressed = false;
var rightPressedTime = null;

var downPressed = false;
var downPressedTime = null;

var rotateLeftPressed = false;
var rotateLeftPressedTime = null;

var rotateRightPressed = false;
var rotateRightPressedTime = null;

 
function getRandomInteger( max ) {
	var rnd = Math.random() ;
	return Math.round( rnd * max );
}

function debug( obj ) {
	var debugElem = document.getElementById("debug");
	if ( debugElem == "undefined" ) {
		alert(debugElem);
		return;
	}
	while ( debugElem.firstChild != null ) {
		//alert(deleteElem);
		debugElem.removeChild(debugElem.firstChild);
	}
	
	var elem = document.createElement("p");
	try {
		elem.innerHTML=" " + obj;
	} catch ( errorObj ) {
		elem.innerHTML="ERROR";
	}
	debugElem.appendChild(elem);		
	if ( typeof(obj) == "object" ) {
		for( var attrib in obj ) {
			var elem = document.createElement("p");
			try {
				elem.innerHTML=" " + attrib + "=" + obj[attrib];
			} catch ( errorObj ) {
				elem.innerHTML="ERROR " + attrib;
			}
			debugElem.appendChild(elem);		
		}
	} else {
	}

}


function createTable( x, y ){
	var table = document.getElementById("tetris");

	for( var height = 0; height < y; height++ ) {
		var rowElem = document.createElement("tr");
		
		for( var width = 0; width < x; width++ ) {
			var tabElem = document.createElement("td");

			tabElem.id = getPos(width,height);

			tabElem.className = "empty";
			tabElem.innerHTML = "&nbsp;&nbsp;";
			//var tabText = document.createTextNode(" ");
			//tabElem.appendChild(tabText);
			rowElem.appendChild(tabElem);			
		}
		table.appendChild(rowElem);
	}
	
}


function getPos( width, height ) { return "pos" + height + "_" + width;}


function renderWorld( w ) {
	var worldArray = w.current;
	for( var height = 0; height < w.y; height++ ) {
		for( var width = 0; width < w.x; width++ ) {
			var pos = document.getElementById(getPos(width,height));
			if ( worldArray[height][width] == 0 ) {
				pos.className = "empty";
			} else if ( worldArray[height][width] == 1 ) {
				pos.className = "full";
			} else if ( worldArray[height][width] == 2 ) {
				pos.className = "block";
			} else if ( worldArray[height][width] == 3 ) {
				pos.className = "remove";
			} else if ( worldArray[height][width] == 4 ) {
				pos.className = "conflict";
			} else {
				debug("Unknown value at position " + height + " "+ width );
			}
		}
	}
}

function drawBlockInWorld( w, blockArray, x, y, value ) {
	for( var height = 0; height < blockArray.length; height++ ) {
		var blockLen = blockArray[height].length;
		
		for( var width = 0; width < blockLen; width++ ) {
			if ( blockArray[height][width] == 1 ) {
				w[height+y][width+x] = value;
			}
		}
	}
}

// returns if the world
function isBounded( worldArray, blockArray, bX, bY, directionX, directionY ) {
	var blocked = false;
	for( var height = 0; height < blockArray.length && !blocked; height++ ) {
		var blockLen = blockArray[height].length;
		
		for( var width = 0; width < blockLen && !blocked; width++ ) {
			if ( blockArray[height][width] == 1 ) {
				var wy = height+bY+directionY;
				var wx = width+bX+directionX;
				if ( wy < 0 || wx < 0 ) {
					blocked = true;
				} else if ( wy >= worldArray.length || wx >= worldArray[0].length) {
					blocked = true;
				} else if ( worldArray[wy][wx] == 1 ) {
					blocked = true;
				}
			}
		}
	}
	return blocked;
}

function moveDirection( directionX, directionY ) {
	if ( !isBounded( world.current, block.current, block.x, block.y, directionX, directionY ) ) {
		drawBlockInWorld( world.current, block.current, block.x, block.y, 0 );
		block.x += directionX;
		block.y += directionY;
		drawBlockInWorld( world.current, block.current, block.x, block.y, 2 );
		renderWorld(world);
	}
}

function rotate( clockwise ) {
	var newIndex = ( clockwise ) ? block.index - 1 : block.index + 1;
	newIndex %= block.type.length;
	if ( newIndex < 0 ) {
		newIndex += block.type.length;
	}
	var rotatedBlock = block.type[newIndex]; 
	if ( !isBounded( world.current, rotatedBlock, block.x, block.y, 0, 0 ) ) {
		drawBlockInWorld( world.current, block.current, block.x, block.y, 0 );
		block.index = newIndex;
		block.current = rotatedBlock;
		drawBlockInWorld( world.current, block.current, block.x, block.y, 2 );
		renderWorld(world);
	}
}

// mark full rows for compression and return the number of rows
function markForCompression( w ) {
	var numRowsFull = 0;
	var worldArray = w.current;
	for( var height = 0; height < w.y; height++ ) {
		var rowFull = true;
		for( var width = 0; width < w.x; width++ ) {
			if ( worldArray[height][width] != 1 ) {
				rowFull = false;
				break;
			}
		}
		if ( rowFull ) {
			for( var width = 0; width < w.x; width++ ) {
				worldArray[height][width] = 3;
			}
			numRowsFull++;

		}
	}
	return numRowsFull;
}

// shift down full rows, returning the number of full rows compressed.
function compressWorld( w ) {
	var numFullRows = 0;

	var worldArray = w.current;
	for( var height = w.y-1; height >= 0; height-- ) {
		if ( worldArray[height][0] == 3 ) {
			numFullRows++;
			shiftDownWorld(w,height);
			height++; // otherwise miss the row if double
		}
	}
	return numFullRows;
}

function shiftDownWorld( w, rowNum ) {
	var worldArray = w.current;
	for( var height = rowNum-1; height >= 0; height-- ) {
		for( var width = 0; width < w.x; width++ ) {
			worldArray[height+1][width] = worldArray[height][width];
		}
	}
}

function gameloop() {
	if ( gameOver ) {
		return;
	}
	var reset = false;
	if ( world.current == null ) {
		createWorld( world );
		createTable( world.x, world.y );
		reset = true;
	} else if ( compressWorld( world ) == 0 ) {
		if ( isBounded( world.current, block.current, block.x, block.y, 0, 1 ) ) {
			drawBlockInWorld( world.current, block.current, block.x, block.y, 1 );
			if ( markForCompression( world ) == 0 ) {
				reset = true;
			}
			
		} else {
			drawBlockInWorld( world.current, block.current, block.x, block.y, 0 );
			block.y += 1;
			drawBlockInWorld( world.current, block.current, block.x, block.y, 2 );
		}
		
	} else {
		reset = true;
	}
	if ( reset ) {
		// reset block to starting position and choose new block ( next block )
		block.reset();
		if ( isBounded( world.current, block.current, block.x, block.y, 0, 0 ) ) {
			// overlapping at start position 
			gameOver = true;
			drawBlockInWorld( world.current, block.current, block.x, block.y, 4 );
		} else {
			drawBlockInWorld( world.current, block.current, block.x, block.y, 2 );
		}
	}

	renderWorld(world);
}

function startTimer() {
	var timerID = window.setInterval( gameloop, timerInterval );
	var keyTimerID = window.setInterval( keypressed, keyTimerInterval );
}

function keypressed() {
	debug( getTime() );
	if ( downPressed ) {
		moveDirection( 0, 1 );
	}
	if ( rightPressed ) {
		moveDirection( 1, 0 );
	}
	if ( leftPressed ) {
		moveDirection( -1, 0 );
	}
	if ( rotateRightPressed ) {
		rotate(false);
	}
	if ( rotateLeftPressed ) {
		rotate(true);
	}
	if ( downPressed ) {
		moveDirection( 0, 1 );
	}
}

function getTime() {
	return new Date().getTime();
}

function handleKeyPressedUp( keyboardEvent ) {
	if ( gameOver ) {
		return;
	}
	switch ( keyboardEvent.keyCode ){
	case 40: // down cursor
		if ( downPressed ) {
			downPressed = false;
		}
		break;
	case 39: // right cursor
		if ( rightPressed ) {
			rightPressed = false;
		}
		break;
	case 37: // left cursor
		if ( leftPressed ) {
			leftPressed = false;
		}
		break;
	case 34: // page down
		if ( rotateRightPressed ) {
			rotateRightPressed = false;
		}
		break;
	case 33: // page up
		if ( rotateLeftPressed ) {
			rotateLeftPressed = false;
		}
		break;
	case 32: // space
		if ( downPressed ) {
			downPressed = false;
		}
		break;
	default:
		debug(keyboardEvent);
		break;
	}
}


function handleKeyPressedDown( keyboardEvent ) {
	if ( gameOver ) {
		return;
	}
	switch ( keyboardEvent.keyCode ){
	case 40: // down cursor
		if ( !downPressed ) {
			downPressed = true;
			downPressedTime = getTime();
			moveDirection( 0, 1 );
		}
		break;
	case 39: // right cursor
		if ( !rightPressed ) {
			rightPressed = true;
			rightPressedTime = getTime();
			moveDirection( 1, 0 );
		}
		break;
	case 37: // left cursor
		if ( !leftPressed ) {
			leftPressed = true;
			leftPressedTime = getTime();
			moveDirection( -1, 0 );
		}
		break;
	case 34: // page down
		if ( !rotateRightPressed ) {
			rotateRightPressed = true;
			rotateRightPressedTime = getTime();
			rotate(false);
		}
		break;
	case 33: // page up
		if ( !rotateLeftPressed ) {
			rotateLeftPressed = true;
			rotateLeftPressedTime = getTime();
			rotate(true);
		}
		break;
	case 32: // space
		if ( !downPressed ) {
			downPressed = true;
			downPressedTime = getTime();
			moveDirection( 0, 1 );
		}
		break;
	default:
		debug(keyboardEvent);
		break;
	}
}


//world[0][0] = 1;
//world[1][0] = 1;
//world[1][2] = 2;
//drawBlockInWorld( world, block, 1, 1, 1 );


window.addEventListener( "load", function() { gameloop(); startTimer(); }, false);
window.addEventListener( "keyup", handleKeyPressedUp, false);
window.addEventListener( "keydown", handleKeyPressedDown, false);
//debug(getRandomInteger(10));