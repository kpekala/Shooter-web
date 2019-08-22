import Phaser from 'phaser';

export default class BaseImage extends Phaser.Physics.Arcade.Image{

    constructor(scene: Phaser.Scene, x: integer, y: integer, key: string){
        super(scene,x,y,key);
    }

}