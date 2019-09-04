import BattleScene from '../scene/battle-scene';
import {gameRepo} from './../../data/repo/game-repo';
import PlayerModel from '../../data/player-model';
import gameSession from '../../data/game-session';
import { Gun, GunToTake } from '../model/gun';

const updatesFreeze = 40;
export default class BattleController{
    scene: BattleScene;
    intervalIdOfPlayerUpdates!: number;

    constructor(scene: BattleScene){
        this.scene = scene;
        this.sendPlayerUpdates = this.sendPlayerUpdates.bind(this);
        this.onEnemyUpdate = this.onEnemyUpdate.bind(this);
        this.onRemovedBlock = this.onRemovedBlock.bind(this);
        this.onNewEnemyGun = this.onNewEnemyGun.bind(this);
    }

    onGameStart(){
        this.intervalIdOfPlayerUpdates = setInterval(this.sendPlayerUpdates,updatesFreeze);
        gameRepo.observeEnemyUpdate(this.onEnemyUpdate);
        gameRepo.observeRemovingBlocks(this.onRemovedBlock);
        gameRepo.observeNewEnemyGun(this.onNewEnemyGun)
        
        this.scene.addGuns(gameSession.guns);
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
    
    sendPlayerUpdates(){
        let p = this.scene.player!;
        let playerName = gameSession.playerName;
        let playerModel = new PlayerModel(p.x,p.y,p.hand.angle, playerName, p.flipX);
        gameRepo.emitPlayerUpdate(playerModel);
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
}