import PlayerModel from "./player-model";

class GameSession{
    playerName!: string;
    cachedEnemies: Array<string>;
    guns: Array<Object>
    handleGameEnd!: any;
    mapId!: integer;

    constructor(){
        this.cachedEnemies = [];
        this.guns = [];
    }

    isEnemyInCache(enemyModel: PlayerModel){
        return this.cachedEnemies.find(enemy => enemy == enemyModel.name) != undefined; 
    }

    isEnemiesCacheEmpty(){
        return this.cachedEnemies.length === 0
    }

    makeEnd(winnerName: string){
        this.handleGameEnd(winnerName);
    }
}

export default new GameSession();