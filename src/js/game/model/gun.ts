import Phaser from 'phaser'
import Hand from './hand';
import FightingScene from '../fighting-scene';
import BaseSprite from './base/base-sprite';

const movementSpeed = 200;
const jumpSpeed = 500;
/**
 * Class of randomly spawned gun representation
 */
export class GunToTake extends BaseSprite{

    constructor(scene: Phaser.Scene, x:number, y:number, spriteKey: string){
        super(scene, x, y, spriteKey);
        this.scaleX = 1.5
        this.scaleY = 1.5
    }

    update(time:any, delta:any){
 
    }
}
/**
 * This class represents real gun which will be hold by player
 */
export class Gun extends BaseSprite{

    lastFired: number

    constructor(scene: Phaser.Scene, x:number, y:number, spriteKey: string){
        super(scene, x, y, spriteKey);
        this.scaleX = 1.5
        this.scaleY = 1.5

        this.lastFired = 0.0;
    }
} 