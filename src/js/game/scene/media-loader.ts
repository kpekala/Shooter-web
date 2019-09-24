export function loadImages(scene: Phaser.Scene){
    let load = scene.load;
    load.image('background','assets/tlo1.png');
    load.image('cyberpunk-street','assets/cyberpunk-street.png');
    load.image('hand','assets/hand.png');
    load.image('handEnemy','assets/handEnemy.png');
    load.image('gun1','assets/gun1.png');
    load.image('gun2','assets/gun2.png');
    load.image('gun3','assets/gun3.png');
    load.image('gun4','assets/gun4.png');
    load.image('gun5','assets/gun5.png');
    load.image('bullet','assets/pocisk.png');
    load.image('cegla','assets/brick.png');
    load.image('kamien0','assets/stone0.png');
}

export function loadSpriteSheets(scene: Phaser.Scene){
    let load = scene.load;
    load.spritesheet('player_sprite','assets/player_anim.png',{frameWidth: 21, frameHeight: 80});
    load.spritesheet('enemy_sprite','assets/enemy_anim.png',{frameWidth: 21, frameHeight: 80});
}

export function loadAudio(scene: Phaser.Scene){
    let load = scene.load;
    load.audio('gun_shoot','assets/sound/gun_sound.wav');
    load.audio('block_hit','assets/sound/stone_hit.mp3');
}