class Scene1 extends Phaser.Scene{
    constructor() {
        super('Scene1');
    }

preload() {
    this.load.image('fondo' , './Assets/Imagenes/mapas/fondo.png');
   
    this.load.atlas('assets', './Assets/Imagenes/mapas/bloques.png', './Assets/Imagenes/mapas/bloques_atlas.json');

    this.load.image('bola' , './Assets/Imagenes/mapas/bola.png');
    this.load.image('player' , './Assets/Imagenes/mapas/jugador.png');

    this.load.tilemapTiledJSON('map' , './Assets/Imagenes/mapas/nivel1.json');
    
   

}

create(){
    map = this.make.tilemap({ key: 'map' });

    var groundTiles = map.addTilesetImage('fondo');
    
    
    var groundLayer  = map.createDynamicLayer('fondo', groundTiles, 0, 0);        
            
            
      
    

    this.physics.world.setBoundsCollision(true, true, true, false);


        // grupo de bloques
    this.bricks = this.physics.add.staticGroup({
            setScale: {x: 1, y: 1 },
              key: 'assets', frame: [ 'a', 'n', 'v', 'na', 'r' ],
              frameQuantity: 8,
              gridAlign: { width: 8, height: 8, cellWidth: 80, cellHeight: 50, x: 135, y: 100 }
            
          });

          this.stars = this.physics.add.staticGroup({
            setScale: {x: 1, y: 1 },
              key: 'assets', frame: [  'am' ],
              frameQuantity: 1,
              gridAlign: { width: 8, height: 8, cellWidth: 80, cellHeight: 50, x: 425, y: 30 }
            
          }); 

          // agregamos la bola y paleta
    this.ball = this.physics.add.image(400, 545,  'bola').setCollideWorldBounds(true).setBounce(1).setScale(1);
    this.ball.setData('onPaddle', true);

     this.paddle = this.physics.add.image(400, 575, 'player').setImmovable().setScale(1);
        

         //  Colisiones
         this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);
         this.physics.add.collider(this.ball, this.paddle, this.hitPaddle, null, this);
         this.physics.add.collider(this.ball, this.stars, this.collectStar, null, this);

    
//  Input events
this.input.on('pointermove', function (pointer) {

    //  Keep the paddle within the game
    this.paddle.x = Phaser.Math.Clamp(pointer.x, 52, 748);


    // Comprobamos si la pelota esta en la paleta y hacemos que la siga
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
    

    

    let textoCreator = new Vidas({scene: this, x:600, y:20});
    
    let textCreator = new Puntaje({scene: this, x:64, y:20});

}


update (time, delta)
    {
        // Comprobamos si la pelota se va del mapa
     if (this.ball.y > 600)
     {
        scoreV = scoreV - 1;
        text.setText('Vidas: ' + scoreV);
        if (scoreV >= 1)
         this.resetBall();
         if (scoreV == 0) {
            this.resetLevel();
          
         }
     }
    
        
    }

    //estrella
    collectStar(ball, star){
        star.disableBody(true, true);
        scoreV = scoreV + 1;
        text.setText('Vidas: ' + scoreV);

}
// Funcion para romper el bloque
    hitBrick (ball, brick)
  {
      brick.disableBody(true, true);
      
      
      if (this.bricks.countActive() === 0)
      {
        //aca pasar al nivel 2  
        this.scene.start('Scene2');
        
      }
      else {
        
        score = score + 10;
        texto.setText('Score: ' + score);
      }
  }
// Funcion de resetear la bola
resetBall ()
{
    this.ball.setVelocity(0);
    this.ball.setPosition(this.paddle.x, 545);
    this.ball.setData('onPaddle', true);
}
// Funcion de resetear el nivel
resetLevel ()
{
    this.resetBall();

    this.bricks.children.each(function (brick) {

        brick.enableBody(false, 0, 0, true, true);
        });
        this.stars.children.each(function (star) {

            star.enableBody(false, 0, 0, true, true);
            });
    score = 0;
    scoreV = 3;
    texto.setText('Score: ' + score);
    text.setText('Vidas: ' + scoreV);
}
// Funcion para comprobar en que parte de la paleta pega la bola
    hitPaddle (ball, player)
    {
        var diff = 0;
  
        if (ball.x < player.x)
        {
            //  Ball is on the left-hand side of the paddle
            diff = player.x - ball.x;
            ball.setVelocityX(-10 * diff);
        }
        else if (ball.x > player.x)
        {
            //  Ball is on the right-hand side of the paddle
            diff = ball.x -player.x;
            ball.setVelocityX(10 * diff);
        }
        else
        {
            //  Ball is perfectly in the middle
            //  Add a little random X to stop it bouncing straight up!
            ball.setVelocityX(2 + Math.random() * 8);
        }
    }


    
   




}