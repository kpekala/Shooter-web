import Phaser from 'phaser'
import Player from './player';
import BaseSprite from './base-sprite';

export default class Hand extends BaseSprite{

    constructor(scene: Phaser.Scene){
        super(scene, 400, 300,'hand');

        scene.add.existing(this);
    }

    update(){
    }


    calculateAngle(pointer:any){
        let vec = {x: pointer.x - this.x, y: pointer.y - this.y}
        const angle = Math.atan2(vec.y, vec.x) * 180 / Math.PI;
        this.angle = angle;

        this.flipY = vec.x < 0
    }

    stickToPlayer(player: Player){
        this.setPosition(player.x, player.y - 8);
    }
}