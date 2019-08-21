import Phaser from 'phaser'
import Player from './player';
import BaseContainer from './base-container';
import BaseSprite from './base-sprite';

export default class Hand extends BaseContainer{

    handSprite: Phaser.GameObjects.Image

    constructor(scene: Phaser.Scene, x: integer, y: integer){
        super(scene,x,y);

        this.handSprite = scene.add.image(0,0,'hand');
        this.add(this.handSprite);
    }

    update(){

    }


    calculateAngle(pointer:any){
        let vec = {x: pointer.x - this.x, y: pointer.y - this.y}
        const angle = Math.atan2(vec.y, vec.x) * 180 / Math.PI;
        this.angle = angle;

        this.handSprite.flipY = vec.x < 0
    }

    stickToPlayer(player: Player){
        this.setPosition(player.x, player.y - 8);
    }
}