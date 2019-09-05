import Phaser from 'phaser'
import Hand from './hand';
import BaseImage from './base/base-image';
import BaseSprite from './base/base-sprite';
import Player from './player';
import BattleScene from '../scene/battle-scene';
import PlayerModel from '../../data/player-model';
import { Gun, GunToTake } from './gun';
import Bullet from './bullet';
import Human from './human';

export default class Enemy extends Human{

    name: string;
    timeSinceLastUpdate: number = 0;

    constructor(scene: BattleScene,model: PlayerModel){
        super(scene,'enemy_sprite');

        this.scene.physics.world.enable(this);
        this.hand = new Hand(scene,0,0, 'handEnemy');
        this.name = model.name;
    }

    update(time:any, delta:any){
        this.timeSinceLastUpdate += delta;
    }

    updateData(enemyModel: PlayerModel){
        if(this.x !== enemyModel.x && this.y === enemyModel.y){
            this.anims.play('enemyMove', true);
        }else{
            this.anims.stop();
        }
        this.x = enemyModel.x;
        this.y = enemyModel.y;
        this.flipX = enemyModel.hasFlip;
        this.hand.angle = enemyModel.handAngle;
        this.hand.updateFlip(this.flipX);
    }
  
    preRender(){
        this.hand.stickToPlayer(this);
    }


    fireBullet(bulletModel: any){
        let {x,y} = bulletModel;
        let newBullet = new Bullet(this.scene,x,y,'bullet', bulletModel.bulletId);
        this.fire(newBullet);
    }
}