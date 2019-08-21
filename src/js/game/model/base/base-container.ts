import Phaser from 'phaser'


export default class BaseContainer extends Phaser.GameObjects.Container{

    constructor(scene: Phaser.Scene, x: integer, y: integer){
        super(scene, 400, 300);

        scene.add.existing(this);
    }

}