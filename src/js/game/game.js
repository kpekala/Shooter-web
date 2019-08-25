import Phaser from 'phaser';
import FightingScene from './fighting-scene'

var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        parent: 'gamePageContainer',
        width: 1400,
        height: 800
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: FightingScene
};

var game;

export function startGame(){
    console.log('Game is starting!');
    game = new Phaser.Game(config);
}
