import BaseSprite from "./base/base-sprite";

export default class Block extends BaseSprite{
    hp: number = 5;
    reduceHealth(){
        this.hp--;
    }
    isAlive(){
        return this.hp > 0;
    }
}