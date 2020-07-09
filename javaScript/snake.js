
var canvas=document.querySelector('canvas');
canvas.width=480;
canvas.height=480;
var c=canvas.getContext('2d');
var score=document.getElementById("score");


   var snake=
 {
   x:11,
   y:11,
   speedX:1,
   speedY:0,
   lenght:1,
   tail:[[0,0]]   
}

   var apple=
  {
   x:0,
   y:0,
   exists:1
  }
  function createMap()
{
var i,j,x,y;

for(i=0;i<24;i++)
   for(j=0;j<24;j++)
   {
   x=i*20;
   y=j*20;
   c.fillStyle='black';
   c.fillRect(x,y,20,20);
   }
}

createMap();

function wait(ms){ return new Promise(resolve=>setTimeout(resolve,ms))}

function isInSnakeTail(coordonateX,coordonateY)
{

	let i=0,value;
 for(i=0;i<snake.lenght-1;i++)
  		if(coordonateX==snake.tail[i][0]&&coordonateY==snake.tail[i][1]) return true;
  return false;
}  
function snakeMove()
   {
   	snake.x+=snake.speedX;
    snake.y+=snake.speedY;
    var move=1;
    window.addEventListener("keydown",key=>{
   if(key.keyCode=='40'&&(snake.speedY!=-1||snake.lenght==1)&&move==1){snake.speedX=0;snake.speedY=1;move=0;}
   if(key.keyCode=='39'&&(snake.speedX!=-1||snake.lenght==1)&&move==1){snake.speedX=1;snake.speedY=0;move=0;}
   if(key.keyCode=='38'&&(snake.speedY!=1||snake.lenght==1)&&move==1){snake.speedX=0;snake.speedY=-1;move=0;}
   if(key.keyCode=='37'&&(snake.speedX!=1||snake.lenght==1)&&move==1){snake.speedX=-1;snake.speedY=0;move=0;}
   })
   
   }
function createApple()
{
	placement=Math.floor(Math.random()*24*24);
 	apple.x=placement%24;
 	apple.y=Math.floor(placement/24);
 	let i;
 
 	while(isInSnakeTail(apple.x,apple.y)||(apple.x==snake.x&&apple.y==snake.y))
 	{
 		apple.x++;
 		if(apple.x==snake.x&&apple.y==snake.y)apple.x++;
 		if(apple.x>=24){apple.x=0;apple.y++;}
 		if(apple.y>=24){apple.y=0;apple.x=0;}
 	}
 	apple.exist=1;
 	c.fillStyle='red';
    c.fillRect(apple.x*20,apple.y*20,20,20);
}
async function play()
{
var gameOver=0; snake.x=5;snake.y=11;

createApple();
let Score=0

while(gameOver!=1)
{
   if(snake.x!=apple.x||snake.y!=apple.y)
  {c.fillStyle='black';
   c.fillRect(snake.tail[0][0]*20,snake.tail[0][1]*20,20,20);
   snake.tail.shift();}
   else {snake.lenght++;createApple();score.innerHTML="SCORE:"+(++Score);}

   c.fillStyle='green';
   c.fillRect(snake.x*20,snake.y*20,20,20);
   snake.tail.push([snake.x,snake.y]);
   await wait(220);

  if(isInSnakeTail(snake.x,snake.y)){gameOver=1;break;}


   snakeMove();

if(!((snake.x>=-1&&snake.x<=24)&&(snake.y>=0&&snake.y<=24)))
 { gameOver=1;}
}
window.addEventListener("keydown",key=>{
	if(key.keyCode==82&&gameOver==1)
		{   snake.tail=[[11,11]];
			snake.lenght=1;
			snake.speedX=1;
			snake.speedY=0;
			createMap();
	        gameOver=0;
	        Score=0;
	        score.innerHTML="SCORE:"+Score;
			play();
		}
})
}
play();
