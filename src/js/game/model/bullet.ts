import Phaser from 'phaser';
import { Gun } from './gun';
import BaseImage from './base/base-image';
import BaseSprite from './base/base-sprite';

const bulletSpeed = 1000

export default class Bullet extends BaseImage{

    id!: string;

    constructor(scene: Phaser.Scene, x: integer, y: integer, textureKey: string, id: string){
        super(scene,x,y, textureKey);

        this.scene.physics.world.enable(this,0);
        this.setVisible(false);
        this.id = id;
    }
    
    update(){

    }

    fire(gun: Gun, angle: integer){
        this.setVisible(true);
        this.scene.physics.velocityFromAngle(angle, bulletSpeed, this.body.velocity);
    }
}