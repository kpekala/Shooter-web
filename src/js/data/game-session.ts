import PlayerModel from "./player-model";

class GameSession{
    playerName!: string;
    cachedEnemies: Array<string>;
    guns: Array<Object>
    handleGameEnd!: any;
    mapId!: integer;
    initialPlayerPos: any;

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

    findPlayerPos(players: Array<any>, playerName: string){
        console.log(players, playerName);
        for(let player of players){
            if (player.name === playerName){
                this.initialPlayerPos = {x: player.x, y: player.y};
            }
        }
    }
    
}

export default new GameSession();