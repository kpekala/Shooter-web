import Phaser from 'phaser'
import Hand from './hand';
import BattleScene from '../scene/battle-scene';
import BaseSprite from './base/base-sprite';
import { Gun, GunToTake } from './gun';
import Bullet from './bullet';

export default class Human extends BaseSprite{

    hand!: Hand;
    gun!: Gun;
    bullets!: Phaser.GameObjects.Group;

    constructor(scene: BattleScene, spriteKey: string){
        super(scene, 400, 300, spriteKey);

        this.scene.physics.world.enable(this);

        this.initBulletGroup();
    }

    initBulletGroup(){
        this.bullets = this.scene.add.group();
    }

    fire(bulletPos: any, bulletId: string){
        let newBullet = new Bullet(this.scene,0,0,'bullet', bulletId);
        this.bullets.add(newBullet,true);
        newBullet.fire(this.gun,bulletPos, this.hand.angle);    
    }

    takeGun(gun: GunToTake){
        if(this.gun){
            this.hand.remove(this.gun);
        }   
        this.gun = new Gun(this.scene,45,0,gun.texture.key)
        this.hand.addGun(this.gun);
    }
}