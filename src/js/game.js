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
            gravity: { y: 500 }
        }
    },
    scene: FightingScene
};

var game;

export function startGame(){
    console.log('Game is starting!');
    game = new Phaser.Game(config);
}

function preload(){
    this.load.image('background','assets/tlo1.png');
    this.load.image('player','assets/player0.png');
    this.load.image('cegla','assets/cegla.png');
}

function create(){
    const backgroundImage = this.add.image(200, 200, 'background');
    backgroundImage.scaleX = 2;
    backgroundImage.scaleY = 2;
}

