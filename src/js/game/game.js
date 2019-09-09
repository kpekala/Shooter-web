import Phaser from 'phaser';
import BattleScene from './scene/battle-scene'
import gameSession from '../data/game-session';

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'canvasWrapper',
        width: 1400,
        height: 800
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: BattleScene
};

var game;

export function startGame(playerData, handleGameEnd){
    gameSession.playerName = playerData.playerName;
    game = new Phaser.Game(config);

    gameSession.handleGameEnd = handleGameEnd;
}
