import PlayerModel from "./player-model";

class GameSession{
    playerName!: string;
    cachedEnemies: Array<string>

    constructor(){
        this.cachedEnemies = [];
    }

    isEnemyInCache(enemyModel: PlayerModel){
        return this.cachedEnemies.find(enemy => enemy == enemyModel.name) != undefined; 
    }

    isEnemiesCacheEmpty(){
        return this.cachedEnemies.length === 0
    }
}

export default new GameSession();