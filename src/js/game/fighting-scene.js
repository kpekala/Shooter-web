import Phaser from 'phaser';
import Player from './model/player.ts';


const blockSizeInPx = 30;

export default class FightingScene extends Phaser.Scene{

    preload(){
        this.initKeys();

        this.load.image('background','assets/tlo1.png');
        this.load.image('hand','assets/reka.png');
        this.load.image('cegla','assets/cegla.png');
        this.load.image('kamien0','assets/kamien0.png');
        this.load.spritesheet('player_sprite','assets/player_anim.png',{frameWidth: 21, frameHeight: 80})

        this.eventCursors = this.input.keyboard.createCursorKeys();
    }
    create(){
        const backgroundImage = this.add.image(200, 200, 'background');
        backgroundImage.scaleX = 2;
        backgroundImage.scaleY = 2;

        this.game.events.on('prerender',(renderer, time, delta) => {
            this.player.preRender();
        });

        this.createPlatforms();
        this.createPlayer();
        this.addColliders();

        this.prepareAnimations()
    }

    prepareAnimations(){
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player_sprite', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
    }

    update(){
        this.onEvents();
    }
    
    onEvents(){
        this.player.onEvents();
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
