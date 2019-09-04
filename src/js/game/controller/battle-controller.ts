import BattleScene from '../scene/battle-scene';
import {gameRepo} from './../../data/repo/game-repo';
import PlayerModel from '../../data/player-model';
import gameSession from '../../data/game-session';
import { Gun, GunToTake } from '../model/gun';
import Bullet from '../model/bullet';

const updatesFreeze = 35;
export default class BattleController{
    scene: BattleScene;
    intervalIdOfPlayerUpdates!: number;

    constructor(scene: BattleScene){
        this.scene = scene;
        this.emitPlayerUpdates = this.emitPlayerUpdates.bind(this);
        this.onEnemyUpdate = this.onEnemyUpdate.bind(this);
        this.onRemovedBlock = this.onRemovedBlock.bind(this);
        this.onNewEnemyGun = this.onNewEnemyGun.bind(this);
        this.onNewEnemyBullet = this.onNewEnemyBullet.bind(this);
    }

    onGameStart(){
        this.intervalIdOfPlayerUpdates = setInterval(this.emitPlayerUpdates,updatesFreeze);
        gameRepo.observeEnemyUpdate(this.onEnemyUpdate);
        gameRepo.observeRemovingBlocks(this.onRemovedBlock);
        gameRepo.observeNewEnemyGun(this.onNewEnemyGun)
        gameRepo.observeNewEnemyBullet(this.onNewEnemyBullet)
        
        this.scene.addGuns(gameSession.guns);
    }

    emitPlayerUpdates(){
        let p = this.scene.player!;
        let playerName = gameSession.playerName;
        let playerModel = new PlayerModel(p.x,p.y,p.hand.angle, playerName, p.flipX);
        gameRepo.emitPlayerUpdate(playerModel);
    }

    onEnemyUpdate(enemyModel: PlayerModel){
        let localPlayerName = gameSession.playerName;
        if (enemyModel.name != localPlayerName){
            if(!gameSession.isEnemyInCache(enemyModel)){
                gameSession.cachedEnemies.push(enemyModel.name);
                this.scene.addEnemy(enemyModel);
            }
            else{
                this.scene.updateEnemy(enemyModel);
            }
        }
    }

    emitRemovedBlock(block: any){
        let data = {
            x: block.x,
            y: block.y,
            playerName: gameSession.playerName
        };
        gameRepo.emitRemovedBlock(data);
    }

    onRemovedBlock(block: any){
        if(block.playerName !== gameSession.playerName){
            this.scene.removeBlockAt(block.x, block.y);
        }
    }

    emitNewPlayerGun(gun: GunToTake){
        let data = {
            x: gun.x,
            y: gun.y,
            playerName: gameSession.playerName
        }
        gameRepo.emitNewPlayerGun(data);
    }

    onNewEnemyGun(gun: any){
        if(gun.playerName !== gameSession.playerName){
            this.scene.giveGunToEnemy(gun.playerName, gun)
        }
    }

    emitNewPlayerBullet(bullet: Bullet){
        let data = {
            x: bullet.x,
            y: bullet.y,
            playerName: gameSession.playerName,
            bulletId: bullet.id,
        }
        gameRepo.emitNewPlayerBullet(data);
    }

    onNewEnemyBullet(bullet: any){
        if(bullet.playerName !== gameSession.playerName){
            this.scene.addBulletToEnemy(bullet.playerName, bullet)
        }
    }
}