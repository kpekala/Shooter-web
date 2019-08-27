import FightingScene from "../../game/fighting-scene";

export default class FightingRepository{

    scene: FightingScene

    constructor(scene: FightingScene){
        this.scene = scene;
    }
}