import Phaser from 'phaser'
import Hand from './hand';
import FightingScene from '../fighting-scene';
import BaseSprite from './base/base-sprite';
import { Gun, GunToTake } from './gun';

const movementSpeed = 200;
const jumpSpeed = 500;

export default class Player extends BaseSprite{

    hand: Hand;
    gun!: Gun
    constructor(scene: FightingScene){
        super(scene, 400, 300,'player_sprite');

        this.scene.physics.world.enable(this);
        this.hand = new Hand(scene,0,0);
        this.setUpPlayer();
        this.initListeners();
    }

    setUpPlayer(){
        this.setBounce(0.2)
    }

    initListeners(){
        this.scene.input.on("pointermove", (pointer:any) => {
            this.hand.calculateAngle(pointer)
        });
    }

    update(time:any, delta:any){
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
        //if(this.getMouserPointer().isDown)
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