var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 640,
    backgroundColor: '#2d2d2d',
    physics: {
        default: 'arcade',
        arcade: {
            //gravity: { y: 0 },
            debug: false
        }
    },
    scene: [Scene2,Scene1]
};
var game = new Phaser.Game(config);

var map;
var cursors;
var debugGraphics;
var text;
var texto;
var player;
var showDebug = false;
var groundLayer;
var onPaddle;
var paddle;
var ball;
var bricks;
var coinsLayer;
var thitPaddle;
var score = 0;
var coinsCollected = 0;
var tomatosCollected = 0;
var scoreV = 3;
var stars;
