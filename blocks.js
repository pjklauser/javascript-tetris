// **************************************************
// t up, right, down, left
var T_up =
 [  [0,0,0,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
 ]

var T_right =
 [  [0,0,0,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
 ]

var T_down =
 [  [0,0,0,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
 ]

var T_left =
 [  [0,0,0,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
 ]


// **************************************************
// longBlock up, right, down, left
/*
var longBlock_up =
 [  [0,0,1,0]
   ,[0,0,1,0]
   ,[0,0,1,0]
   ,[0,0,1,0]
 ]

var longBlock_right =
 [  [0,0,0,0]
   ,[0,0,0,0]
   ,[1,1,1,1]
   ,[0,0,0,0]
 ]
*/
var longBlock_down =
 [  [0,1,0,0]
   ,[0,1,0,0]
   ,[0,1,0,0]
   ,[0,1,0,0]
 ]

var longBlock_left =
 [  [0,0,0,0]
   ,[1,1,1,1]
   ,[0,0,0,0]
   ,[0,0,0,0]
 ]

var longBlock = [ /*longBlock_up, longBlock_right,*/ longBlock_down, longBlock_left ];




// **************************************************
// shortblock up, right, down, left
var shortBlock_up =
 [  [0,0,0,0]
   ,[0,1,0,0]
   ,[0,1,0,0]
   ,[0,0,0,0]
 ]

var shortBlock_right =
 [  [0,0,0,0]
   ,[0,0,0,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var shortBlock_down =
 [  [0,0,0,0]
   ,[0,0,1,0]
   ,[0,0,1,0]
   ,[0,0,0,0]
 ]

var shortBlock_left =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
 ]


var shortBlock = [ shortBlock_up, shortBlock_right, shortBlock_down, shortBlock_left ];



// **************************************************
// LONGKORNER up, right, down, left
var LONGKORNER_up =
 [  [0,0,0,0]
   ,[1,1,0,0]
   ,[0,1,0,0]
   ,[0,1,0,0]
 ]

var LONGKORNER_right =
 [  [0,0,0,0]
   ,[0,0,0,0]
   ,[0,1,1,1]
   ,[0,1,0,0]
 ]

var LONGKORNER_down =
 [  [0,0,1,0]
   ,[0,0,1,0]
   ,[0,0,1,1]
   ,[0,0,0,0]
 ]

var LONGKORNER_left =
 [  [0,0,1,0]
   ,[1,1,1,0]
   ,[0,0,0,0]
   ,[0,0,0,0]
 ]

var LONGKORNER = [ LONGKORNER_up, LONGKORNER_right, LONGKORNER_down, LONGKORNER_left ];



// **************************************************
// LONGKORNER2 up, right, down, left
var LONGKORNER2_up =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[0,1,0,0]
   ,[0,1,0,0]
 ]

var LONGKORNER2_right =
 [  [0,0,0,0]
   ,[0,1,0,0]
   ,[0,1,1,1]
   ,[0,0,0,0]
 ]

var LONGKORNER2_down =
 [  [0,0,1,0]
   ,[0,0,1,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var LONGKORNER2_left =
 [  [0,0,0,0]
   ,[1,1,1,0]
   ,[0,0,1,0]
   ,[0,0,0,0]
 ]

var LONGKORNER2 = [ LONGKORNER2_up, LONGKORNER2_right, LONGKORNER2_down, LONGKORNER2_left ];



// **************************************************
// square up, right, down, left
var square_up =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var square_right =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var square_down =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var square_left =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var square = [ square_up, square_right, square_down, square_left ];


// **************************************************
// club up, right, down, left
var club_up =
 [  [0,1,0,0]
   ,[0,1,1,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var club_right =
 [  [0,0,0,0]
   ,[0,1,1,1]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var club_down =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[0,1,1,0]
   ,[0,0,1,0]
 ]

var club_left =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[1,1,1,0]
   ,[0,0,0,0]
 ]

var club = [ club_up, club_right, club_down, club_left ];


// **************************************************
// korner up, right, down, left
var korner_up =
 [  [0,0,0,0]
   ,[0,1,0,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var korner_right =
 [  [0,0,0,0]
   ,[0,0,1,0]
   ,[0,1,1,0]
   ,[0,0,0,0]
 ]

var korner_down =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[0,0,1,0]
   ,[0,0,0,0]
 ]

var korner_left =
 [  [0,0,0,0]
   ,[0,1,1,0]
   ,[0,1,0,0]
   ,[0,0,0,0]
 ]

var korner = [ korner_up, korner_right, korner_down, korner_left ];







var blockTypes = [ longBlock, shortBlock, LONGKORNER, LONGKORNER2, club, square, korner];

