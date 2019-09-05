import Phaser from 'phaser'
import Player from './player';
import BaseContainer from './base/base-container';
import BaseSprite from './base/base-sprite';
import { Gun } from './gun';
import Human from './human';

export default class Hand extends BaseContainer{

    handImage: Phaser.GameObjects.Image
    gun!: Gun;

    constructor(scene: Phaser.Scene, x: integer, y: integer, handSpriteKey: string){
        super(scene,x,y);

        this.handImage = scene.add.image(0,0,handSpriteKey);

        this.add(this.handImage);
    }
    
    update(){

    }

    addGun(gun: Gun){
        this.add(gun);
        this.gun = gun;
        gun.flipY = this.handImage.flipY;
    }

    calculateAngle(pointer:any){
        let vec = {x: pointer.x - this.x, y: pointer.y - this.y}
        const angle = Math.atan2(vec.y, vec.x) * 180 / Math.PI;
        this.angle = angle;

        this.updateFlip(vec.x < 0);
    }

    getEndOfGunPosition(){
        let distanceFromPlayer = (this.gun.x) + this.gun.width;
        let angleInRad = Phaser.Math.DegToRad(this.angle)
        let cosOfAngle = Math.cos(angleInRad);
        let sinfAngle = Math.sin(angleInRad);

        let localX = distanceFromPlayer * cosOfAngle;
        let localY = distanceFromPlayer * sinfAngle;
        let x = this.x + localX;
        let y = this.y + localY;
        return {x,y}
    }

    updateFlip(shouldFlip: boolean){
        this.handImage.flipY = shouldFlip;
        this.list.forEach((child ) => {
            let image = child as Phaser.GameObjects.Image;
            image.flipY = shouldFlip;
        });
    }

    stickToHuman(human: Human){
        this.setPosition(human.x, human.y - 8);
    }
}