class Puntaje extends Phaser.GameObjects.Text{

    constructor(config){

        super(config.scene, config.x, config.y);
        config.scene.add.existing(this);
        texto = config.scene.add.text(config.x, config.y, 'Score: ' + score, { fontSize: '32px', color: 'red' });
    }

}