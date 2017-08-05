//Has scoring logic

//Updates the user's scores based on the result from the puzzle.
function updateScore(result) {
		if (result==100) {
			propagateEffect(1,userScores,currentLO);
		}
		else if (result == 50) {
			propagateEffect(-.25,userScores,currentLO);
		}
		else {
			propagateEffect(-.5,userScores,currentLO);
		}
	}


//Backpropagation of the user's result to earlier learning objectives.
function propagateEffect(effect, userScores,obj) {
	var decayFactor = .5
	var backPropObjects = [[obj,0]]
	var objToAdjust;
	var parent_ts;
	while (backPropObjects.length > 0) {
		objToAdjust = backPropObjects.splice(0,1);
		objToAdjust = objToAdjust[0];
		parent_ts = thresholds[objToAdjust[0]];
		for (var t in parent_ts) {
			if (parent_ts.hasOwnProperty(t)) {
				backPropObjects.push([t,objToAdjust[1]+1]);
			}
		}
		userScores[objToAdjust[0]] += effect*Math.pow(decayFactor,objToAdjust[1]);
	}
	return userScores;
}

//Given a set of scores, select learning objectives that 
//are within this student's proficiency based on the thresholds.
function selectViableObjectives(userScores,objectivesList) {
	var obj;
	var objViable;
	viableObjectives=[]
	for (var i=0;i<objectivesList.length;i++) {
		obj = objectivesList[i];
		objViable=true;
		current_ts = thresholds[obj];
		for (var t in current_ts) {
			if (current_ts.hasOwnProperty(t)) {
				if (userScores[t]<current_ts[t]) {
					objViable=false;
				}
			}
		}
		if (objViable) {
			viableObjectives.push(obj);
		}
	}
	return viableObjectives;
}

//Given a list of objectives, select one from the bottom three scores
function chooseRandomObjectiveFromList(objectives,userScores) {
	var maxObjIndex = (objectives.length<2 ? objectives.length-1 : 1);
	var chosenIdx = Math.round(Math.random()*maxObjIndex);
	var scoreList = [];
	for (var i=0;i<objectives.length;i++) {
		scoreList.push([objectives[i],userScores[objectives[i]]]);
	}
	scoreList = scoreList.sort(function (a,b) { if (a[1]<b[1]) {return -1; } if (a[1]>b[1]) { return 1; } return 0; });
	console.log(scoreList)
	console.log(maxObjIndex)
	return scoreList[chosenIdx][0];
}
