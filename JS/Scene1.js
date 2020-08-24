var starfield;
var tween;
var iter = 0;
var Breakout = new Phaser.Class({

  Extends: Phaser.Scene1,

  initialize:

  function Breakout ()
  {
      Phaser.Scene.call(this, { key: 'breakout' });

      this.bricks;
      this.paddle;
      this.ball;
      this.fondo;
  },

  preload: function ()
  {
      this.load.image("tiles", "./Assets/Imagenes/mapas/tileMap.png");
     this.load.tilemapTiledJSON("World", "./Assets/Imagenes/mapas/tileMap.json");
      this.load.atlas('assets', './Assets/Imagenes/atlas.png', './Assets/Imagenes/atlas_atlas.json');
  },
  

  create: function ()
  {
    this.map = this.add.tilemap("World");
    var tileset = this.map.addTilesetImage("tiles", "tiles");
    this.backgroundLayer = this.map.createStaticLayer("World", tileset);

    //starfield =  this.add.tileSprite( 380,350,1200, 1100, 'assets', 'sp').setScale(1);
    //tween = this.tweens.addCounter({
      //from: 1,
      //to: 2,
      //duration: 5000,
      //ease: 'Sine.easeInOut',
      //yoyo: true,
      //repeat: -1
  //});
      //  Enable world bounds, but disable the floor
      this.physics.world.setBoundsCollision(true, true, true, false);

      //  Create the bricks in a 10x6 grid
      this.bricks = this.physics.add.staticGroup({
          key: 'assets' , frame: [ 'ca', 'cp', 'cr', 'cv', 'cy', 'cn' ],
          //setScale: {x: 0.20, y: 0.20 },cambiar escala del grupo
          frameQuantity: 10,
          gridAlign: { width: 10, height: 6, cellWidth: 70, cellHeight: 45, x: 112, y: 50 }
      });

      this.ball = this.physics.add.image(400, 500, 'assets', 'bola').setCollideWorldBounds(true).setBounce(1);
      this.ball.setData('onPaddle', true);

      this.paddle = this.physics.add.image(400, 550, 'assets', 'b1').setImmovable();

      //  Our colliders
      this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
      this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);

      //  Input events
      this.input.on('pointermove', function (pointer) {

          //  Keep the paddle within the game
          this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);

          if (this.ball.getData('onPaddle'))
          {
              this.ball.x = this.paddle.x;
          }

      }, this);

      this.input.on('pointerup', function (pointer) {

          if (this.ball.getData('onPaddle'))
          {
              this.ball.setVelocity(-75, -300);
              this.ball.setData('onPaddle', false);
          }

      }, this);
  },

  hitBrick: function (ball, brick)
  {
      brick.disableBody(true, true);

      if (this.bricks.countActive() === 0)
      {
          this.resetLevel();
      }
  },

  resetBall: function ()
  {
      this.ball.setVelocity(0);
      this.ball.setPosition(this.paddle.x, 500);
      this.ball.setData('onPaddle', true);
  },

  resetLevel: function ()
  {
      this.resetBall();

      this.bricks.children.each(function (brick) {

          brick.enableBody(false, 0, 0, true, true);

      });
  },

  hitPaddle: function (ball, paddle)
  {
      var diff = 0;

      if (ball.x < paddle.x)
      {
          //  Ball is on the left-hand side of the paddle
          diff = paddle.x - ball.x;
          ball.setVelocityX(-10 * diff);
      }
      else if (ball.x > paddle.x)
      {
          //  Ball is on the right-hand side of the paddle
          diff = ball.x -paddle.x;
          ball.setVelocityX(10 * diff);
      }
      else
      {
          //  Ball is perfectly in the middle
          //  Add a little random X to stop it bouncing straight up!
          ball.setVelocityX(2 + Math.random() * 8);
      }
  },

  update: function ()
  {
    var cont = 0;
      if (this.ball.y > 600)
      {
          this.resetBall();
      }
     // starfield.tilePositionX = iter *5;
      //starfield.tilePositionY = Math.sin(iter) *5;

    //iter += 0.5;
      //starfield.tilePositionX = Math.cos(iter) * 90;
      //starfield.tilePosition.y += 2;
  }

});

var config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  parent: 'phaser-example',
  scene: [ Breakout ],
  physics: {
      default: 'arcade',
      arcade: {debug:true}
      
  }
  
};

var game = new Phaser.Game(config);