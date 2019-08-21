import Phaser from 'phaser';

export default class BaseSprite extends Phaser.Physics.Arcade.Sprite{

    keyA!: Phaser.Input.Keyboard.Key;
    keyS!: Phaser.Input.Keyboard.Key;
    keyW!: Phaser.Input.Keyboard.Key;
    keyD!: Phaser.Input.Keyboard.Key;
    keySpace!: Phaser.Input.Keyboard.Key;

    constructor(scene: Phaser.Scene, x: integer, y: integer, key: string){
        super(scene,x,y,key);
        this.scene = scene;

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

    mousePointer = this.scene.input.activePointer
}