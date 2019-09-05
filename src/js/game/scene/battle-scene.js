import Phaser from 'phaser';
import {GunToTake} from '../model/gun';
import Player from '../model/player';
import BattleController from '../controller/battle-controller';
import Enemy from '../model/enemy';


const blockSizeInPx = 30;

export default class BattleScene extends Phaser.Scene{

    preload(){
        this.battleController = new BattleController(this);

        this.initKeys();

        this.load.image('background','assets/tlo1.png');
        this.load.image('hand','assets/hand.png');
        this.load.image('handEnemy','assets/handEnemy.png');
        this.load.image('gun1','assets/gun1.png');
        this.load.image('gun2','assets/gun2.png');
        this.load.image('gun3','assets/gun3.png');
        this.load.image('gun4','assets/gun4.png');
        this.load.image('gun5','assets/gun5.png');
        this.load.image('bullet','assets/pocisk.png');
        this.load.image('cegla','assets/cegla.png');
        this.load.image('kamien0','assets/kamien0.png');
        this.load.spritesheet('player_sprite','assets/player_anim.png',{frameWidth: 21, frameHeight: 80})
        this.load.spritesheet('enemy_sprite','assets/enemy_anim.png',{frameWidth: 21, frameHeight: 80})

        this.load.audio('gun_shoot','assets/sound/gun_sound.wav');
        this.load.audio('block_hit','assets/sound/stone_hit.mp3');

        this.eventCursors = this.input.keyboard.createCursorKeys();
    }
    create(){
        const backgroundImage = this.add.image(200, 200, 'background');
        backgroundImage.scaleX = 2;
        backgroundImage.scaleY = 2;

        this.createPlatforms();
        this.createPlayer();
        this.createEnemies();
        this.createGuns();
        this.addColliders();
        this.prepareAnimations();

        this.battleController.onGameStart();
        
        this.game.events.on('prerender',(renderer, time, delta) => {
            this.player.preRender();
            this.enemies.children.getArray().forEach(enemy => {
                enemy.preRender();
            });
        });
    }

    prepareAnimations(){
        this.anims.create({
            key: 'playerMove',
            frames: this.anims.generateFrameNumbers('player_sprite', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'enemyMove',
            frames: this.anims.generateFrameNumbers('enemy_sprite', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
    }


    update(time, delta){
        this.player.update(time, delta);
        this.enemies.children.getArray().forEach(enemy => {
            enemy.update(time, delta);
        });
    }


    createGuns(){
        this.guns = this.physics.add.staticGroup();
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

    createEnemies(){
        this.enemies = this.physics.add.group();
    }

    addEnemy(enemyModel){
        let newEnemy = new Enemy(this, enemyModel);
        this.enemies.add(newEnemy);
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
        this.physics.add.overlap(this.player.bullets, this.platforms, this.onBulletHitBlock ,null, this);
        this.physics.add.overlap(this.player, this.guns, this.onPlayerTouchingGun, null, this);
    }

    onPlayerTouchingGun(player, gun){
        if(this.keyE.isDown){
            this.giveGunToPlayer(player, gun);
        }
    }

    giveGunToPlayer(player, gun){
        this.battleController.emitNewPlayerGun(gun)
        gun.disableBody(true,true);
        player.takeGun(gun);
    }

    giveGunToEnemy(enemyName, gunPos){
        let gun = this.findObjectInGroupByPos(this.guns, gunPos)
        let enemy = this.findEnemyByName(enemyName);
        console.log('giveGunToEnemy');
        console.log(enemy, gun);
        enemy.takeGun(gun);
        gun.disableBody(true, true)
    }

    addBulletToEnemy(enemyName, bulletModel){
        let enemy = this.findEnemyByName(enemyName);
        enemy.fireBullet(bulletModel);
    }

    findEnemyByName(name){
        for(let enemy of this.enemies.getChildren()){
            if(enemy.name === name){
                return enemy;
            }
        }
        throw "enemy not found!";
    }
    onBulletHitBlock(bullet, block){
        bullet.disableBody(true,true);
        block.disableBody(true,true);
        this.battleController.emitRemovedBlock(block)
        this.battleController.emitBulletRemoved(bullet.id);
        this.sound.play('block_hit');
    }
    createPlayer(){
        this.player = new Player(this);
    }

    onNewPlayerBullet(bullet){
        this.sound.play('gun_shoot');
        this.battleController.emitNewPlayerBullet(bullet);
    }

    removeEnemyBullet(enemyName, bulletId){
        let enemy = this.findEnemyByName(enemyName);
        enemy.removeBullet(bulletId);
    }

    updateEnemy(enemyModel){
        for(let enemy of this.enemies.getChildren()){
            if(enemy.name === enemyModel.name){
                enemy.updateData(enemyModel);
            }
        }
    }

    addGuns(gunModels){
        console.log(gunModels);
        for(let gunModel of gunModels){
            let gun = new GunToTake(this, gunModel.x, gunModel.y  - blockSizeInPx, gunModel.type);
            this.guns.add(gun);
        }
    }

    removeBlockAt(x, y){
        let block = this.findObjectInGroupByPos(this.platforms, {x,y})
        block.disableBody(true, true);
    }

    findObjectInGroupByPos(group, objectPos){
        for(let object of group.getChildren()){
            if(object.x === objectPos.x && object.y === objectPos.y){
                return object;
            }
        }
    }

    initKeys(){
        const keyboard = this.input.keyboard;
        this.keyW = keyboard.addKey('W'); 
        this.keyA = keyboard.addKey('A'); 
        this.keyS = keyboard.addKey('S'); 
        this.keyD = keyboard.addKey('D');
        this.keyE = keyboard.addKey('E');
        this.keySpace = keyboard.addKey('SPACE');
    }
}
