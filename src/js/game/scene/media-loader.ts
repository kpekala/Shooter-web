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
    load.image('brick','assets/brick.png');
    load.image('stone0','assets/stone0.png');
    load.image('trunk','assets/trunk.png');
    load.image('dirt','assets/dirt.png');
    load.image('stone_top','assets/stone_top.png');
    load.image('stone_left','assets/stone_left.png');
    load.image('stone_right','assets/stone_right.png');
    load.image('floor1','assets/floor1.png');
    load.image('floor2','assets/floor2.png');
    load.image('grass1','assets/grass2.png');
    load.image('grass2','assets/grass2.png');
    load.image('leafs','assets/leafs.png');
    load.image('stone1','assets/stone1.png');
    load.image('stone2','assets/stone2.png');
    load.image('door1','assets/door1.png');
    load.image('door2','assets/door2.png');
    load.image('door3','assets/door3.png');
    load.image('sand0','assets/sand0.png');
    load.image('sand1','assets/sand1.png');
    load.image('sand2','assets/sand2.png');
    load.image('sand3','assets/sand3.png');
    load.image('sand4','assets/sand4.png');
    load.image('ground-grass0','assets/ground-grass0.png');
    load.image('ground-grass1','assets/ground-grass1.png');
    load.image('ground-grass2','assets/ground-grass2.png');
    load.image('ground-grass3','assets/ground-grass3.png');
    load.image('chest1','assets/chest1.png');
    load.image('chest2','assets/chest2.png');
    load.image('bed0','assets/bed0.png');
    load.image('bed1','assets/bed1.png');
    load.image('wall0','assets/wall0.png');
    load.image('wall1','assets/wall1.png');
    load.image('wall2','assets/wall2.png');
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