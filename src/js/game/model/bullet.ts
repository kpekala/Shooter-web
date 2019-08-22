import Phaser from 'phaser';
import { Gun } from './gun';
import BaseImage from './base/base-image';

const bulletSpeed = 2000

export default class Bullet extends BaseImage{

    constructor(scene: Phaser.Scene, x: integer, y: integer, textureKey: string){
        super(scene,x,y, textureKey);

        this.scene.physics.world.enable(this);
        this.setGravity(0);
        this.setVisible(false);
    }
    
    update(){

    }

    fire(gun: Gun, pos: any, angle: integer){
        this.setPosition(pos.x, pos.y);
        this.setVisible(true);
        
        this.scene.physics.velocityFromAngle(angle, bulletSpeed, this.body.velocity);
    }
}