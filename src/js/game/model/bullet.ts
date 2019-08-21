import Phaser from 'phaser'
import BaseSprite from './base/base-sprite';

export default class Bullet extends BaseSprite{

    constructor(scene: Phaser.Scene, x: integer, y: integer, textureKey: string){
        super(scene,x,y, textureKey);
    }
    
    update(){

    }

    fire(startingPos: any){
        
    }
}