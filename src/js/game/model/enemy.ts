import Phaser from 'phaser'
import Hand from './hand';
import BaseImage from './base/base-image';
import BaseSprite from './base/base-sprite';
import Player from './player';
import BattleScene from '../scene/battle-scene';
import PlayerModel from '../../data/player-model';

export default class Enemy extends BaseSprite{

    hand: Hand;
    name: string;
    constructor(scene: BattleScene,model: PlayerModel){
        super(scene, model.x, model.y,'enemy_sprite');

        this.scene.physics.world.enable(this);
        this.hand = new Hand(scene,0,0);
        this.name = model.name;
        //this.setGravityY(500);
    }

    updateData(enemyModel: PlayerModel){
        this.x = enemyModel.x;
        this.y = enemyModel.y;
        this.flipX = enemyModel.hasFlip;
        this.hand.angle = enemyModel.handAngle;
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