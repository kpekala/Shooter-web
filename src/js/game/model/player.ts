import Phaser from 'phaser'
import Hand from './hand';
import FightingScene from '../fighting-scene';
import BaseSprite from './base-sprite';

export default class Player extends BaseSprite{

    hand: Hand;
    scene!: FightingScene
    constructor(scene: FightingScene){
        super(scene, 400, 300,'player_sprite');

        scene.physics.world.enable(this);
        this.setBounce(0.2)

        this.hand = new Hand(scene,0,0);

        scene.input.on("pointermove", (pointer:any) => {
            this.hand.calculateAngle(pointer)
        });
    }

    onEvents(){
        this.checkPlayerFlip();

        if(this.keyA.isDown){
            this.anims.play('move', true);
            this.setVelocityX(-200);
        }
        else if(this.keyD.isDown){
            this.anims.play('move', true);
            this.setVelocityX(200);
        }else{
            this.anims.stop();
            this.setVelocityX(0);
        }
        if (this.keySpace.isDown && this.body.touching.down){
            this.setVelocityY(-500);
        }
        if(!this.body.touching.down){
            this.anims.stop();
        }
    }

    checkPlayerFlip(){
        this.flipX = this.mousePointer.x < this.x
    }

    preRender(){
        this.hand.stickToPlayer(this);
    }
}