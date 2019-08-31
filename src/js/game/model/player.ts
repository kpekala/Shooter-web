import Phaser from 'phaser'
import Hand from './hand';
import BattleScene from '../scene/battle-scene';
import BaseSprite from './base/base-sprite';
import { Gun, GunToTake } from './gun';
import Bullet from './bullet';
//Plunker
const movementSpeed = 200;
const jumpSpeed = 500;
const shootingFreeze = 50;

export default class Player extends BaseSprite{

    hand: Hand;
    gun!: Gun;
    timeFromLastShoot: number;
    bullets!: Phaser.GameObjects.Group;

    constructor(scene: BattleScene){
        super(scene, 400, 300,'player_sprite');

        this.scene.physics.world.enable(this);
        this.hand = new Hand(scene,0,0);
        this.timeFromLastShoot = 0;

        this.setUpPlayer();
        this.initBulletGroup();
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
    
    initBulletGroup(){
        this.bullets = this.scene.add.group();
    }

    update(time:any, delta:any){
        if(this.gun){
            this.gun.update(time. delta);
        }
        this.timeFromLastShoot += delta;
        this.checkPlayerFlip();
        this.updateMovement();
        this.fireIfNecessary();
    }

    updateMovement(){
        if(this.keyA.isDown){
            this.anims.play('move', true);
            this.setVelocityX(-movementSpeed);
        }
        else if(this.keyD.isDown){
            this.anims.play('move', true);
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
            this.timeFromLastShoot = 0;
            this.fire();
        }
    }

    fire(){
        let bulletPos = this.hand.getEndOfGunPosition();

        let newBullet = new Bullet(this.scene,0,0,'bullet');
        this.bullets.add(newBullet,true);
        newBullet.fire(this.gun,bulletPos, this.hand.angle);

        this.scene.sound.play('gun_shoot');
    }

    takeGun(gun: GunToTake){
        if(this.gun){
            this.hand.remove(this.gun);
        }   
        this.gun = new Gun(this.scene,45,0,gun.texture.key)
        this.hand.addGun(this.gun);
    }

    checkPlayerFlip(){
        this.flipX = this.getMouserPointer().x < this.x
    }

    preRender(){
        this.hand.stickToPlayer(this);
    }
}