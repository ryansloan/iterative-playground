/**********/
/*PATTERNS*/
/**********/
goog.require('Blockly.Blocks');
Blockly.Blocks['put_circle'] = {
  init: function() {
    this.jsonInit({
      "message0": 'put circle',
      "colour": 120,
      "tooltip": "Puts a circle",
      "helpUrl": "",
      "previousStatement":null,
      "nextStatement":null
    });
  }
};

Blockly.JavaScript['put_circle'] = function(block) {
  return "putCircle();\n";
};

Blockly.Blocks['put_square'] = {
  init: function() {
    this.jsonInit({
      "message0": 'put square',
      "colour": 120,
      "tooltip": "Puts a square",
      "helpUrl": "",
      "previousStatement":null,
      "nextStatement":null
    });
  }
};

Blockly.JavaScript['put_square'] = function(block) {

  return "putSquare();\n";
};


Blockly.Blocks['put_triangle'] = {
  init: function() {
    this.jsonInit({
      "message0": 'put triangle',
      "colour": 120,
      "tooltip": "Puts a triangle",
      "helpUrl": "",
      "previousStatement":null,
      "nextStatement":null
    });
  }
};

Blockly.JavaScript['put_triangle'] = function(block) {

  return "putTriangle();\n";
};


/************/
/****MAZE****/
/************/
Blockly.Blocks['move_right'] = {
  init: function() {
    this.jsonInit({
      "message0": 'move right',
      "colour": 120,
      "tooltip": "move right",
      "helpUrl": "",
      "previousStatement":null,
      "nextStatement":null
    });
  }
};

Blockly.JavaScript['move_right'] = function(block) {

  return "moveRight();\n";
};
Blockly.Blocks['move_left'] = {
  init: function() {
    this.jsonInit({
      "message0": 'move left',
      "colour": 120,
      "tooltip": "move left",
      "helpUrl": "",
      "previousStatement":null,
      "nextStatement":null
    });
  }
};

Blockly.JavaScript['move_left'] = function(block) {
  return "moveLeft();\n";
};

Blockly.Blocks['move_up'] = {
  init: function() {
    this.jsonInit({
      "message0": 'move up',
      "colour": 120,
      "tooltip": "move up",
      "helpUrl": "",
      "previousStatement":null,
      "nextStatement":null
    });
  }
};

Blockly.JavaScript['move_up'] = function(block) {
  return "moveUp();\n";
};

Blockly.Blocks['move_down'] = {
  init: function() {
    this.jsonInit({
      "message0": 'move down',
      "colour": 120,
      "tooltip": "move down",
      "helpUrl": "",
      "previousStatement":null,
      "nextStatement":null
    });
  }
};

Blockly.JavaScript['move_down'] = function(block) {
  return "moveDown();\n";
};

