import Phaser from 'phaser'
import Hand from './hand';
import BattleScene from '../scene/battle-scene';
import BaseSprite from './base/base-sprite';
import { Gun, GunToTake } from './gun';
import Bullet from './bullet';
import HealthBar from './health-bar';

export default class Human extends BaseSprite{

    hand!: Hand;
    gun!: Gun;
    bullets!: Phaser.GameObjects.Group;
    hp: number;
    healthBar: HealthBar;

    constructor(scene: BattleScene, spriteKey: string){
        super(scene, 400, 300, spriteKey);

        this.scene.physics.world.enable(this);

        this.initBulletGroup();
        this.hp = 100;
        this.healthBar = new HealthBar(scene, this);
    }

    initBulletGroup(){
        this.bullets = this.scene.add.group();
    }

    fire(bullet: Bullet){
        this.bullets.add(bullet,true);
        bullet.fire(this.gun, this.hand.angle);    
    }

    takeGun(gun: GunToTake){
        if(this.gun){
            this.hand.remove(this.gun);
        }   
        this.gun = new Gun(this.scene,45,0,gun.texture.key)
        this.hand.addGun(this.gun);
    }

    findBulletById(id: string){
        return (this.bullets.getChildren().find(bullet => (bullet as Bullet).id === id)) as Bullet
    }

    removeBullet(bulletId: string){
        let bullet = this.findBulletById(bulletId);
        bullet.disableBody(true, true);
    }

    preRender(){
        this.hand.stickToHuman(this);
        this.healthBar.stickToHuman(this);
    }

    reduceHealth(){
        this.hp -= 10;
        this.healthBar.updateHealth(this.hp);
    }

    removeFromGame(){
        this.destroy();
        this.hand.destroy();
        this.healthBar.destroy();
        if(this.gun){
            this.gun.destroy();
        }
    }

    isDead = () => this.hp <= 0;

    isAlive = () => !this.isDead()
}