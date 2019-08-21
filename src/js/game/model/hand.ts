import Phaser from 'phaser'
import Player from './player';
import BaseContainer from './base/base-container';
import BaseSprite from './base/base-sprite';
import { Gun } from './gun';

export default class Hand extends BaseContainer{

    handImage: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: integer, y: integer){
        super(scene,x,y);

        this.handImage = scene.add.image(0,0,'hand');
        this.add(this.handImage);
    }
    
    update(){

    }

    addGun(gun: Gun){
        this.add(gun);
        gun.flipY = this.handImage.flipY;
    }


    calculateAngle(pointer:any){
        let vec = {x: pointer.x - this.x, y: pointer.y - this.y}
        const angle = Math.atan2(vec.y, vec.x) * 180 / Math.PI;
        this.angle = angle;

        this.updateFlip(vec.x < 0);
        
    }

    updateFlip(shouldFlip: boolean){
        this.handImage.flipY = shouldFlip;
        this.list.forEach((child ) => {
            let image = child as Phaser.GameObjects.Image;
            image.flipY = shouldFlip;
        });
    }

    stickToPlayer(player: Player){
        this.setPosition(player.x, player.y - 8);
    }
}