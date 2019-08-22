import Phaser from 'phaser';
import Player from './model/player.ts';
import {GunToTake} from './model/gun';


const blockSizeInPx = 30;

export default class FightingScene extends Phaser.Scene{

    constructor(){
        super();
    }

    preload(){
        this.initKeys();

        this.load.image('background','assets/tlo1.png');
        this.load.image('hand','assets/reka.png');
        this.load.image('gun1','assets/gun1.png');
        this.load.image('gun2','assets/gun2.png');
        this.load.image('gun3','assets/gun3.png');
        this.load.image('gun4','assets/gun4.png');
        this.load.image('gun5','assets/gun5.png');
        this.load.image('bullet','assets/pocisk.png');
        this.load.image('cegla','assets/cegla.png');
        this.load.image('kamien0','assets/kamien0.png');
        this.load.spritesheet('player_sprite','assets/player_anim.png',{frameWidth: 21, frameHeight: 80})

        this.eventCursors = this.input.keyboard.createCursorKeys();
    }
    create(){
        const backgroundImage = this.add.image(200, 200, 'background');
        backgroundImage.scaleX = 2;
        backgroundImage.scaleY = 2;

        this.createPlatforms();
        this.createPlayer();
        this.createGuns();
        this.addColliders();
        this.addPhysics();
        this.prepareAnimations();
        
        this.game.events.on('prerender',(renderer, time, delta) => {
            this.player.preRender();
        });
    }

    prepareAnimations(){
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player_sprite', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
    }


    update(time, delta){
        this.player.update(time, delta);
    }

    addPhysics(){
        this.physics.add.overlap(this.player, this.guns, this.takeGun, null, this);
    }

    takeGun(player, gun){
        gun.disableBody(true,true);
        player.takeGun(gun);
    }

    createGuns(){
        this.guns = this.physics.add.staticGroup();
        this.generateGuns(6);
    }

    generateGuns(numberOfGuns){
        let blocks = this.platforms.children;

        let numberOfBlocks = blocks.size;

        for(let i=0;i<numberOfGuns; i++){
            let randomIndex = Math.floor((Math.random() * numberOfBlocks) % numberOfBlocks);
            let blockPosition = blocks.entries[randomIndex];
            let randomKey = 'gun' + ((randomIndex % 5) + 1).toString();
            let gun = new GunToTake(this, blockPosition.x, blockPosition.y  - blockSizeInPx, randomKey);
            this.guns.add(gun);
        }
    }



    createPlatforms(){
        this.platforms = this.physics.add.staticGroup();
        this.createSpecificPlatform({x: 240, y: 785 }, 30);

        this.createSpecificPlatform({x: 120, y: 550 }, 10);
        this.createSpecificPlatform({x: 600, y: 550 }, 10);
        this.createSpecificPlatform({x: 1100, y: 550 }, 6);

        this.createSpecificPlatform({x: 240, y: 350 }, 30);

        this.createSpecificPlatform({x: 120, y: 150 }, 20);
        this.createSpecificPlatform({x: 960, y: 150 }, 10);

    }

    createSpecificPlatform(startPoint, lengthInBlocks){
        //if startX and startY are 0, platform will start in left-top part of screen
        for(let i=0; i<lengthInBlocks; i++){
            const blockX = startPoint.x + i*blockSizeInPx;
            const blockY = startPoint.y;
            this.platforms.create(blockX, blockY, 'kamien0');
        }
    }

    addColliders(){
        this.physics.add.collider(this.player, this.platforms);
    }

    createPlayer(){
        this.player = new Player(this);
    }

    initKeys(){
        const keyboard = this.input.keyboard;
        this.keyW = keyboard.addKey('W'); 
        this.keyA = keyboard.addKey('A'); 
        this.keyS = keyboard.addKey('S'); 
        this.keyD = keyboard.addKey('D');
        this.keySpace = keyboard.addKey('SPACE');
    }
}
