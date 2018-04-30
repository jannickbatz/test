/* jslint browser*/
var  board = document.getElementById('board');
var tilesflipped = [];
var tilesMatch = []; 
var tilesImgs = ["A", "B", "C", "D", "E", "G", "H", "I", "J", "K", "L","M"];




function drawBoard(event){
event.preventDefault();
document.getElementById('welcome').style.display = 'none';
board.style.display ='flex';
var gametiles = document.getElementById('PlayGame').level.value;
console.log(gametiles);
var gametilesImgs = tilesImgs.slice(0, gametiles/2);
gametilesImgs = gametilesImgs.dublesuffle();	

for(i = 0; i<gametilesImgs.length; i+=1 ){
	var content = '';
	content += '<section>';
	content += '<div class="front"></div>'
	content += '<div class="back">' + gametilesImgs[i] + '</div>'
	content += '</section>';
	board.insertAdjacentHTML('beforeend',content);
}
}
Array.prototype.dublesuffle = function() {
	var d;
for (d=0; d<this.length;  d= d + 2){
this.splice(d+1, 0, this[d]);
}
console.log(this)
var i = this.length;
var L;
var temp;
while(--i > 0) {
	L=Math.floor(Math.random() * (i+1));
	console.log(L);
	temp = this[L];
	this[L] = this[i];
	this[i] = temp;
	console.log(this);
}	
	return this;
}

function newGame(){
board.innerHTML = '';
board.style.display = 'none';
document.getElementById('welcome').style.display = 'flex';
document.getElementById('message').classList.remove('show');
}
function endOfGame() {
	if(board.querySelectorAll('section').length === board.querySelectorAll('.reward').length){
		document.getElementById('message').classList.add('show');
	}
}

function flipback(){
	var tiles = board.querySelectorAll('section');
	tiles[tilesflipped[0]].classList.remove('flip');
	tiles[tilesflipped[1]].classList.remove('flip');
	tilesflipped =[];
	tilesMatch = [];
	board.style.pointerEvents = 'auto';
}

function twoTiles(tiles)    {
	if(tilesflipped.length >= 2){
	board.style.pointerEvents = 'none';
	if(tilesMatch[0] === tilesMatch[1]) {
	tiles[tilesflipped[0]].classList.add('reward');
	tiles[tilesflipped[1]].classList.add('reward');
	tilesflipped = [];
	tilesMatch = [];
	setTimeout(endOfGame, 500);
	board.style.pointerEvents = 'auto';
 		 }else{
			  setTimeout(flipback,1500);
				  
			  }
		  }
	}
 
function flipTile(event){
	'use strict'
	var tiles = Array.from(board.getElementsByTagName('section'));
	if(event.target !== event.currentTarget) {
	if(!event.target.parentNode.classList.contains('flip')) {
	event.target.parentNode.classList.add('flip');
	tilesflipped.push(tiles.indexOf(event.target.parentNode));
	console.log(tilesflipped);
	tilesMatch.push(event.target.nextElementSibling.innerHTML);
	console.log(tilesMatch);
	twoTiles(tiles);
	  }
   }
}
document.getElementById('PlayGame').addEventListener('submit', drawBoard);
board.addEventListener('touchend', flipTile);
document.getElementById('message').getElementsByTagName('button')[0].addEventListener('click', newGame);


