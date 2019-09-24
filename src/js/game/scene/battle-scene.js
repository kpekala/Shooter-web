import Phaser from 'phaser';
import {GunToTake} from '../model/gun';
import Player from '../model/player';
import BattleController from '../controller/battle-controller';
import Enemy from '../model/enemy';
import { GAME_WIDTH, GAME_HEIGHT } from '../game-utils';
import gameSession from '../../data/game-session';
import { loadImages, loadSpriteSheets, loadAudio } from './media-loader';
import { generateBlocks } from './scene-loader';

const blockSizeInPx = 30;

export default class BattleScene extends Phaser.Scene{

    preload(){
        this.battleController = new BattleController(this);

        this.initKeys();

        loadImages(this);
        loadSpriteSheets(this);
        loadAudio(this);
        this.eventCursors = this.input.keyboard.createCursorKeys();
    }
    create(){
        const backgroundImage = this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, 'background');
        backgroundImage.scaleX = 2;
        backgroundImage.scaleY = 2;

        generateBlocks(1).then();

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
        if(this.player.isAlive()){
            this.player.update(time, delta);
        }
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
        this.createSpecificPlatform({x: 1100, y: 550 }, 10);

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
        this.physics.add.overlap(this.player.bullets,this.enemies, this.onBulletHitEnemy, null, this);
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
        enemy.takeGun(gun);
        gun.disableBody(true, true)
    }

    addBulletToEnemy(enemyName, bulletModel){
        let enemy = this.findEnemyByName(enemyName);
        enemy.fireBullet(bulletModel);
        this.sound.play('gun_shoot');
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
        block.disableBody(true,true);
        this.battleController.emitRemovedBlock(block)
        this.battleController.emitBulletRemoved(bullet.id);
        this.removeBlock(block);
    }

    removeBlockAt(x, y){
        let block = this.findObjectInGroupByPos(this.platforms, {x,y})
        this.removeBlock(block);
    }

    removeBlock(block){
        block.disableBody(true,true);
        this.sound.play('block_hit');
    }

    onBulletHitEnemy(bullet, enemy){
        bullet.disableBody(true,true);
        this.battleController.emitBulletRemoved(bullet.id);
        this.battleController.emitEnemyIsHit(enemy.name);
    }

    reduceHealthOfEnemy(enemyName){
        let enemy = this.findEnemyByName(enemyName);
        enemy.reduceHealth();
    }

    reduceHealthOfPlayer(){
        this.player.reduceHealth();
        if(this.player.isDead()){
            this.onPlayerDead()
        }
    }

    onPlayerDead(){
        this.player.removeFromGame();

        this.battleController.emitPlayerIsDead();
        this.battleController.disablePlayerUpdates();

        if(this.getNumberOfEnemies() === 1){
            this.moveGameToEnd()
        }
    }

    onEnemyDead(enemyName){
        let enemy = this.findEnemyByName(enemyName);
        this.enemies.remove(enemy);
        enemy.removeFromGame();
        if(this.getNumberOfEnemies() === 0){
            this.moveGameToEnd()
        }
    }

    moveGameToEnd(){
        console.log('end of game!');
        this.battleController.makeEnd();
        this.scene.pause();
    }

    getWinnerName(){
        if(this.player.isAlive()){
            return this.player.name;
        }else{
            let winner = this.enemies.getChildren()[0];
            return winner.name;
        }
    }

    createPlayer(){
        this.player = new Player(this, gameSession.playerName);
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

    getNumberOfEnemies = () => this.enemies.getChildren().length
}
