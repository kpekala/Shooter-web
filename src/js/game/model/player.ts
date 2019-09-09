import Phaser from 'phaser'
import Hand from './hand';
import BattleScene from '../scene/battle-scene';
import BaseSprite from './base/base-sprite';
import { Gun, GunToTake } from './gun';
import Bullet from './bullet';
import Human from './human';
import uniqid from 'uniqid';
import { GAME_HEIGHT } from '../game-utils';

//Plunker
const movementSpeed = 200;
const jumpSpeed = 500;
const shootingFreeze = 50;

export default class Player extends Human{

    timeFromLastShoot: number;

    constructor(scene: BattleScene, name: string){
        super(scene, 'player_sprite');

        this.timeFromLastShoot = 0;
        this.hand = new Hand(scene,0,0, 'hand');
        this.name = name;

        this.setUpPlayer();
        this.initListeners();
    }

    setUpPlayer(){
        this.setGravityY(500);
        this.setBounce(0.2)
    }

    initListeners(){
        this.scene.input.on("pointermove", (pointer:any) => {
            this.hand.calculateAngle(pointer)
        });
    }

    update(time:any, delta:any){
        if(this.gun){
            this.gun.update(time.delta);
        }
        this.timeFromLastShoot += delta;
        this.checkPlayerFlip();
        this.updateMovement();
        this.fireIfNecessary();
        this.checkIfPlayerWentOutOfBattle()
    }

    updateMovement(){
        if(this.keyA.isDown){
            this.anims.play('playerMove', true);
            this.setVelocityX(-movementSpeed);
        }
        else if(this.keyD.isDown){
            this.anims.play('playerMove', true);
            this.setVelocityX(movementSpeed);
        }else{
            this.anims.stop();
            this.setVelocityX(0);
        }
        if (this.keySpace.isDown && this.body.touching.down){
            this.setVelocityY(-jumpSpeed);
        }
        if(!this.body.touching.down){
            this.anims.stop();
        }
    }

    fireIfNecessary(){
        if(this.getMouserPointer().isDown && this.timeFromLastShoot > shootingFreeze && this.gun){
            this.fire();
        }
    }

    fire(){
        this.timeFromLastShoot = 0;
        let {x,y} = this.hand.getEndOfGunPosition();
        let newBullet = new Bullet(this.scene,x,y,'bullet', uniqid());
        this.battleScene.onNewPlayerBullet(newBullet);
        super.fire(newBullet);
    }

    checkPlayerFlip(){
        this.flipX = this.getMouserPointer().x < this.x
    }

    checkIfPlayerWentOutOfBattle(){
        if(this.y >= GAME_HEIGHT + 100){
            this.hp = 0;
            this.battleScene.onPlayerDead();
        }
    }
}