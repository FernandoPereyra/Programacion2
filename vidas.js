class Vidas extends Phaser.GameObjects.Text{

    constructor(config){

        super(config.scene, config.x, config.y);
        config.scene.add.existing(this);
        text = config.scene.add.text(config.x, config.y, 'Vidas: ' + scoreV, { fontSize: '32px', color: 'red' });
    }

}