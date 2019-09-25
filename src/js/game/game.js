import Phaser from 'phaser';
import BattleScene from './scene/battle-scene'
import gameSession from '../data/game-session';
import { GAME_WIDTH, GAME_HEIGHT } from './game-utils';

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'canvasWrapper',
        width: GAME_WIDTH,
        height: GAME_HEIGHT
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
