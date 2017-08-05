//When Run, this gets
function genCode() {
		$('#outputArea').text('')
		code+="checkSolution();"
		console.log(code);
		eval(code);
}

///Checks the result of the puzzle, and posts a score update.
function checkSolution() {
	setTimeout(function() {
		var strippedCode = code.replaceAll("\n *}\n","\n");
		var linesInSubmission = strippedCode.split(/\r\n|\r|\n/).length-1;
		console.log(linesInSubmission+" lines submitted")
		if ($('#outputArea').text() === $('#problemArea').text()) {
			if (linesInSubmission > linesTarget) {
				finish(50);
			}
			else {
				finish(100);
			}
		}
		else {
			finish(0);	
		}
	},500);
}

//Blockly target functions
function putCircle() {
	$('#outputArea').text(function (i,prevText) { return prevText+"circle "});
}
function putSquare() {
	$('#outputArea').text(function (i,prevText) { return prevText+"square "});
}
function putTriangle() {
	$('#outputArea').text(function (i,prevText) { return prevText+"triangle "});
}
//Generator Functions
var shapes = ["circle","square","triangle"];
function genSimpleLinearProgram(currentScore) {
	var shape
	var iterations = Math.round((Math.random()*1)+(currentScore>=2 ? 4 : 2));
	var lines=0;
	var problem = "";
	var toolboxString = '<xml><block type="put_circle"></block><block type="put_square"></block><block type="put_triangle"></block></xml>';
	for (var i = 0;i<iterations;i++) {
		shape = Math.round(Math.random()*(shapes.length-1));
		problem+=shapes[shape]+" ";	
		lines++;
	}
	return [problem, lines,toolboxString];
}
function genSingleInstructionInLoop() {
	var shape = Math.round(Math.random()*(shapes.length-1));
	var iterations = Math.round(Math.random()*5)+3;
	var lines=0;
	var problem = "";
	var toolboxString = '<xml><block type="put_circle"></block><block type="put_square"></block><block type="put_triangle"></block><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">4</field></block></value></block></xml>';
	for (var i = 0;i<iterations;i++) {
		problem+=shapes[shape]+" ";	
		lines = 2;
	}
	return [problem, lines,toolboxString];
}

function genTwoInstructionsInLoop() {
	var shapeIndexes = [0,1,2];
	var shape1Idx = Math.round(Math.random()*(shapeIndexes.length-1));
	var shape1 = shapeIndexes[shape1Idx];
	shapeIndexes.splice(shape1Idx,1);
	var shape2Idx = Math.round(Math.random()*(shapeIndexes.length-1));
	shape2 = shapeIndexes[shape2Idx];
	var iterations = Math.round(Math.random()*3)+2;
	var lines=0;
	var problem = "";
	var toolboxString = '<xml><block type="put_circle"></block><block type="put_square"></block><block type="put_triangle"></block><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">4</field></block></value></block></xml>';
	for (var i = 0;i<iterations;i++) {
		problem+=shapes[shape1]+" "+shapes[shape2]+" ";	
		lines = 3;
	}
	return [problem, lines,toolboxString];
}

var threeProblemsSeed = [
'square circle square ',
'circle square circle ',
'circle square circle circle ',
'square square circle square ',
'square circle square square ',
'square circle circle square ',
'square triangle circle ',
'square triangle square ',
'circle triangle circle ',
'triangle circle triangle ',
'triangle square triangle ',
'circle triangle square ',
'triangle triangle square ',
'triangle triangle circle ',
'circle circle triangle ',
'circle triangle triangle ',
'square triangle triangle '];

function genThreeOrMoreInstructionsInLoop() {
	var seed = threeProblemsSeed[Math.round(Math.random()*(threeProblemsSeed.length-1))];
	var iterations = Math.round(Math.random()*4)+2;
	var lines = seed.split(/ /).length; //number in seed, plus one for loop.
	var problem = "";
	var toolboxString = '<xml><block type="put_circle"></block><block type="put_square"></block><block type="put_triangle"></block><block type="controls_repeat_ext"><value name="TIMES"><block type="math_number"><field name="NUM">4</field></block></value></block></xml>';
	for (var i = 0;i<iterations;i++) {
		problem+=seed;
	}
	return [problem, lines, toolboxString];
}