# iterative-playground
Help Quackers the Robot find all his rubber ducks amongs the crates! His programming is fried, so you'll have to rebuild his code from scratch.

This is a prototype of an adaptive learning tutorial for programming in Blockly. Students progress through a few learning objectives related to simple repeat loops. All functionality is currently purely client-side, and has no session-to-session memory.




## Setup
When you clone the repo, make sure you also clone the google/blockly submodule.


## File Descriptions

### assets/
Contains images and .mp3 sound effects

### index.html
Contains the user-facing application code, as well as learning objective definitions.


### iterative_playground_blocks.js
Contains Blockly block definitions for the blocks used in the two puzzle types.

### maps.js
Contains map defintions for all quackers-maps, as well as the number of lines of code in the solution.

### maze_puzzle.js
Contains rendering logic, scorekeeping, results evaluation, and other app-specific logic for the maze puzzle types.

### scoring.js
Logic for scorekeeping, including thresholds for learning objective transitions, and backpropagation of results to earlier learning objectives.

### shape_pattern.html
More primitive variant of this game in which students must write code to match a text pattern of shape names. This was the original prototype but it's less interesting.

### shapes_puzzle.js
This is the equivalent of `maze_puzzle.js` for the earlier shape pattern puzzle type. 