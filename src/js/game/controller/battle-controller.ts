import BattleScene from '../scene/battle-scene';
import {gameRepo} from './../../data/repo/game-repo';
import PlayerModel from '../../data/player-model';
import gameSession from '../../data/game-session';

const updatesFreeze = 40;
export default class BattleController{
    scene: BattleScene;
    intervalIdOfPlayerUpdates!: number;

    constructor(scene: BattleScene){
        this.scene = scene;
        this.sendPlayerUpdates = this.sendPlayerUpdates.bind(this);
        this.onEnemyUpdate = this.onEnemyUpdate.bind(this);
        this.onRemovedBlock = this.onRemovedBlock.bind(this);
    }

    onGameStart(){
        this.intervalIdOfPlayerUpdates = setInterval(this.sendPlayerUpdates,updatesFreeze);
        gameRepo.observeEnemyUpdate(this.onEnemyUpdate);
        gameRepo.observeRemovingBlocks(this.onRemovedBlock);
        
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
    onRemovedBlock(block: any){
        if(block.playerName !== gameSession.playerName){
            this.scene.removeBlockAt(block.x, block.y);
        }
    }
    sendPlayerUpdates(){
        let player = this.scene.player!;
        gameRepo.emitPlayerUpdate(player);
    }

    emitRemovedBlock(block: any){
        let data = {
            x: block.x,
            y: block.y,
            playerName: gameSession.playerName
        };
        gameRepo.emitRemovedBlock(data);
    }
}