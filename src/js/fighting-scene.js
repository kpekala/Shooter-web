import Phaser from 'phaser';

const blockSizeInPx = 30;

export default class FightingScene extends Phaser.Scene{

    preload(){
        this.initKeys();

        this.load.image('background','assets/tlo1.png');
        this.load.image('player','assets/player0.png');
        this.load.image('cegla','assets/cegla.png');
        this.load.image('kamien0','assets/kamien0.png');
        this.load.image('player0','assets/player0.png');
    }
    create(){
        const backgroundImage = this.add.image(200, 200, 'background');
        backgroundImage.scaleX = 2;
        backgroundImage.scaleY = 2;

        this.createPlatforms();
        this.createPlayer();
        this.addColliders();
    }

    update(){
        const keyboard = this.input.keyboard;
        const cursors = keyboard.createCursorKeys();
        
        if(this.keyA.isDown){
            this.player.setVelocityX(-200);
        }
        else if(this.keyD.isDown){
            this.player.setVelocityX(200);
        }else{
            this.player.setVelocityX(0);
        }
        if (this.keyW.isDown && this.player.body.touching.down){
            this.player.setVelocityY(-500);
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
        this.player = this.physics.add.sprite(400, 600, 'player0');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
    }

    initKeys(){
        const keyboard = this.input.keyboard;
        this.keyW = keyboard.addKey('W'); 
        this.keyA = keyboard.addKey('A'); 
        this.keyS = keyboard.addKey('S'); 
        this.keyD = keyboard.addKey('D');
    }
}
