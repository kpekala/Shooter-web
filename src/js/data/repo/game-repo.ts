import {socket} from './../socket'
import Player from '../../game/model/player';
import PlayerModel from '../player-model';
import gameSession from './../game-session';

class GameRepo{

    observeGameStarting(onGameStarted: any){
        socket.removeListener('gameStarted',onGameStarted);
        socket.on('gameStarted',onGameStarted);
    }
    emitStartGame(){
        socket.emit('startGame');
    }
    emitPlayerReady(){
        socket.emit('playerReady');
    }
    observeForInitialPositions(onInitialPositions: any){
        socket.removeListener('startPosition',onInitialPositions);
        socket.on('startPosition',onInitialPositions);
    }

    emitPlayerUpdate(p: Player){
        let playerName = gameSession.playerName;
        let playerModel = new PlayerModel(p.x,p.y,p.hand.angle, playerName, p.flipX);
        socket.emit('playerUpdate',playerModel);
    }
    observeEnemyUpdate(onEnemyUpdate: any){
        socket.removeListener('enemyUpdate',onEnemyUpdate);
        socket.on('enemyUpdate',onEnemyUpdate);
    }
    emitRemovedBlock(data: Object){
        socket.emit('removedBlock',data);
    }
    observeRemovingBlocks(onRemovedBlock: any){
        socket.on('removedBlock',onRemovedBlock);
    }

    observeNewGuns(onNewGuns: any){
        socket.removeListener('newGuns',onNewGuns);
        socket.on('newGuns',onNewGuns)
    }

    emitNewPlayerGun(data: Object){
        socket.emit('newPlayerGun', data);
    }

    observeNewEnemyGun(oNewEnemyGun: any){
        socket.removeListener('newEnemyGun',oNewEnemyGun);
        socket.on('newEnemyGun',oNewEnemyGun)
    }
}

export const gameRepo = new GameRepo();