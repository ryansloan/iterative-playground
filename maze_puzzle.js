//maze_puzzle.js
var commandQueue;
var currentMapIdx=-1;
var heroImage,obstacleImage,obstacleImage2,goalImage;

function genCode() {
	commandQueue=[];
	eval(code);
	tick();
}

function checkSolution(objectiveMet) {
	var strippedCode = code.replaceAll("\n *}\n","\n");
	var linesInSubmission = strippedCode.split(/\r\n|\r|\n/).length-1;
	if (objectiveMet) {
		if (linesInSubmission<=linesTarget) {
			goalsFound++;
			finish(100);
		}
		else { 
			finish(50);
		}
	} else {
		finish(0);
	}
}


//Blockly target functions
function moveRight() {
	commandQueue.push(stepRight);
}

function moveDown() {
	commandQueue.push(stepDown);
}
function moveUp() {
	commandQueue.push(stepUp);
}
function moveLeft() {
	commandQueue.push(stepLeft);
}


//Generator Functions
function genSimpleLinearProgram(currentScore) {
	var mapOptions;
	if (currentScore<2) {
		mapOptions=[4,5]
	} else {
		mapOptions=[3,4,5,11];
	}
	//var toolboxStr=
	return setupNewPuzzle(mapOptions);
}


function genSingleInstructionInLoop(currentScore) {
	if (currentScore<1) {
		var mapOptions=[0,6];
	}
	else {
		var mapOptions = [0,6,14,15,16];
	}
	return setupNewPuzzle(mapOptions);
}

function genTwoInstructionsInLoop() {
	var mapOptions = [2,10,20];
	return setupNewPuzzle(mapOptions);
}


function genThreeOrMoreInstructionsInLoop() {
	var mapOptions=[7,8,9,18,19];
	return setupNewPuzzle(mapOptions);
}

function genSimpleLoopsInSeries() {
	var mapOptions=[1,12,13];
	return setupNewPuzzle(mapOptions);
}

//CUSTOM RENDER
var cellSize=32;
var firstRun=true;
var cellX=3;
var cellY=0;
var targetX=0;
var targetY=0
var currentX;
var currentY;
var playspaceCanvas; 
var playspaceContext;
var ticksToGo;
var map;
var goalsFound=0;

function renderTick() {
	renderMap();
	playspaceContext.drawImage(heroImage,currentX>targetX ? currentX-=1 : (currentX<targetX ? currentX+=1 : currentX),currentY>targetY ? currentY-=1 : (currentY<targetY ? currentY+=1 : currentY),cellSize-2,cellSize-2);
	if ((currentX!=targetX) || (currentY!=targetY)) {
		setTimeout(renderTick,16);
	} else {
		checkTreasure();
		tick();
	}
}
function tick() {
	ticksToGo=cellSize;
	if (commandQueue.length>0) {
		if ((commandQueue.shift())()) {
			//Next instruction executed successfully
			renderTick();
		} else { //return 0
			renderMap();
			playspaceContext.drawImage(heroImage,currentX,currentY,cellSize-2,cellSize-2);
			checkSolution(false);
		}
	} else {
		renderMap();
		if (collected > 0) {
			playspaceContext.drawImage(heroImage,currentX,currentY,cellSize-2,cellSize-2);
			checkSolution(true);
		} else {
			playspaceContext.drawImage(heroImage,currentX,currentY,cellSize-2,cellSize-2);
			checkSolution(false);
		}
	}
}
function stepRight() {
	console.log("stepRight");
	if ((map[(cellX+1)+(cellY*10)]==1) || (cellX>=9)) {
		console.log("I can't go right!");
		return false;
	} else {
		cellX++;
		targetX=currentX+cellSize;
		return true;
	}
}	
function stepLeft() {
	console.log("stepLeft");
	if ((map[(cellX-1)+(cellY*10)]==1) || (cellX<=0)){
		console.log("I can't go left!");
		return false;
	} else {
		cellX--;
		targetX=currentX-cellSize;
		return true;
	}
}
function stepDown() {
	console.log("stepDown");
	if ((map[cellX+((cellY+1)*10)]==1) || (cellY>=9)) {
		console.log("I can't go down!");
		return false;
	} else {
		cellY++;
		targetY=currentY+cellSize;
		return true;
	}
}
function stepUp() {
	console.log("stepUp");
	if ((map[cellX+((cellY-1)*10)]==1) || (cellY <=0)) {
		console.log("I can't go Up!");
		return false;
	} else {
		cellY--;
		targetY=currentY-cellSize;
		return true;
	}
}
function prepCanvas() {
	playspaceCanvas = document.getElementById('playspace');
	playspaceContext = playspaceCanvas.getContext("2d");
	heroImage = new Image();
	obstacleImage = new Image();
	obstacleImage2 = new Image();
	heroImage.src = "idle_avatar.png";
	heroImage.onload = function() {
		obstacleImage.src = "crate_gray.png";
		obstacleImage.onload = function() {
			obstacleImage2.src = "crate_blue.png";
			obstacleImage2.onload = function () {
				goalImage = new Image();
				goalImage.src = "duck.png";
				goalImage.onload = function() {
					renderMap();
				}
			}
		}
	}
}
function findHero(m) {
	for (var i = 0;i<m.length;i++) {
		if (map[i] == 3)
		return [i%10,Math.floor(i/10)];
	}
}

function rotateMap(m) {
	var newMap = new Array(m.length);
	newMap=m.slice(0);
	if (Math.random() >= .5){ 
		for (i=0;i<m.length;i++) {
			newMap[m.length-i-1]=m[i];
		}
		return newMap;
	} else {
		return newMap;
	}
}

function renderMap() {
	playspaceContext.fillStyle='#ffffff';
	playspaceContext.fillRect(0,0,400,400);
	for (var i=0;i<map.length;i++) {
		playspaceContext.fillStyle = "#F4A460";//"#339966";
		playspaceContext.fillRect((i%10)*cellSize,Math.floor(i/10)*cellSize,cellSize,cellSize);
		playspaceContext.fillStyle = "#006633";
		playspaceContext.fillRect((i%10)*cellSize+1,Math.floor(i/10)*cellSize+1,cellSize-1,cellSize-1);
		if (map[i] == 1) { //obstacle
			if ((i % 2 == 0) && (i%3==2)) {
				playspaceContext.drawImage(obstacleImage2,(i%10)*cellSize,Math.floor(i/10)*cellSize,cellSize+1,cellSize+1);
			} else {
				playspaceContext.drawImage(obstacleImage,(i%10)*cellSize,Math.floor(i/10)*cellSize,cellSize+1,cellSize+1);
			}
		}
		if ((map[i] == 2) && (collected == 0 )){ //goal
			playspaceContext.drawImage(goalImage,(i%10)*cellSize,Math.floor(i/10)*cellSize,cellSize-4,cellSize-4);
		}
		if ((map[i] == 3) && (firstRun)) { //player, and game is starting
			firstRun=false;
			currentX=cellX*cellSize;
			currentY=cellY*cellSize;
			targetX=currentX;
			targetY=currentY;
			playspaceContext.drawImage(heroImage,(i%10)*cellSize,Math.floor(i/10)*cellSize,cellSize-2,cellSize-2);
		}

	}
	return;
}
function checkTreasure() {
	if (map[cellX+cellY*10] == 2) {
		improvingSound.play();
		collected++;
	}
}
function setupNewPuzzle(mapIndexOptions) {
	var randMapIdx=currentMapIdx;
	while (randMapIdx == currentMapIdx) {
		randMapIdx = mapIndexOptions[Math.round(Math.random()*(mapIndexOptions.length-1))];
	}
	currentMapIdx=randMapIdx;
	console.log("Rendering Map: "+currentMapIdx);
	map = rotateMap(map_init[currentMapIdx]["map"]);
	return ["",map_init[currentMapIdx]["lines"],setup()[2]];
}
function setup() {
	firstRun=true;
	collected=0;
	var toolboxStr = '<xml><block type="move_up"></block><block type="move_down"></block><block type="move_right"></block><block type="move_left"></block><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">4</field></block></value></block></xml>';
	[cellX,cellY] = findHero(map);
	map[cellX+cellY*10]=3;
	prepCanvas();
	return ["",linesTarget,toolboxStr]
}