import Phaser from 'phaser'
import Hand from './hand';
import FightingScene from '../fighting-scene';
import BaseImage from './base/base-image';
import BaseSprite from './base/base-sprite';
import Player from './player';

export default class Enemy extends BaseSprite{

    hand: Hand

    constructor(scene: FightingScene){
        super(scene, 400, 250,'enemy_sprite');

        this.scene.physics.world.enable(this);
        this.hand = new Hand(scene,0,0);

        this.setGravityY(500);
    }
  
    preRender(){
        this.hand.stickToPlayer(this);
    }

    findPlayer(player: Player){
        let x = player.x - this.x
        if(x != 0 && Math.abs(x) > 50){
            this.setVelocityX((Math.abs(x)/x) * 100);
        }else{
            this.setVelocityX(0);
        }
        
    }
}