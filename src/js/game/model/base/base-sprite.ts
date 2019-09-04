import Phaser from 'phaser';
import BattleScene from '../../scene/battle-scene';

export default class BaseSprite extends Phaser.Physics.Arcade.Sprite{

    keyA!: Phaser.Input.Keyboard.Key;
    keyS!: Phaser.Input.Keyboard.Key;
    keyW!: Phaser.Input.Keyboard.Key;
    keyD!: Phaser.Input.Keyboard.Key;
    keySpace!: Phaser.Input.Keyboard.Key;
    battleScene = this.scene as BattleScene

    constructor(scene: Phaser.Scene, x: integer, y: integer, key: string){
        super(scene,x,y,key);
        scene.add.existing(this);
        this.initKeys();
    }

    initKeys(){
        const keyboard = this.scene.input.keyboard;
        this.keyW = keyboard.addKey('W'); 
        this.keyA = keyboard.addKey('A'); 
        this.keyS = keyboard.addKey('S'); 
        this.keyD = keyboard.addKey('D');
        this.keySpace = keyboard.addKey('SPACE');
    }

    getMouserPointer =  () => this.scene.input.activePointer

}