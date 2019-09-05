import Phaser from 'phaser';
import Human from './human';
import BattleScene from '../scene/battle-scene';
import BaseContainer from './base/base-container';

export default class HealthBar extends BaseContainer{
    lifeBar: Phaser.GameObjects.Rectangle;
    rootBar: Phaser.GameObjects.Rectangle;
    offsetX = 0;
    offsetY = -60;
    width = 80;
    height = 8;

    constructor(scene: BattleScene, human: Human){
        super(scene, human.x, human.y);
        
        this.rootBar = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.width, this.height, 0xeb3434);
        this.lifeBar = new Phaser.GameObjects.Rectangle(scene, 0, 0, this.width, this.height, 0x34eb40);

        this.add(this.rootBar);
        this.add(this.lifeBar);
    }

    stickToHuman(human: Human){
        this.setPosition(human.x + this.offsetX, human.y + this.offsetY);
    }

    updateHealth(hp: number){
        let factor = hp/100;
        this.lifeBar.width = this.width * factor;
    }
}