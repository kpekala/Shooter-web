import Phaser from 'phaser';

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gamePageContainer',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: {
        preload: preload,
        create: create
    }
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
    this.add.image(200, 200, 'background');
    this.add.image(500, 100, 'player');
    this.add.image(200, 100, 'cegla');
}

