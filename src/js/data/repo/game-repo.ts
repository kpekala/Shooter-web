import {socket} from './../socket'

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
}

export const gameRepo = new GameRepo();