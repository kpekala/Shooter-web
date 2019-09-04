export default class PlayerModel{
    x: number;
    y: number;
    handAngle: number;
    name: string;
    hasFlip: boolean;
    constructor(x: number, y: number, handAngle: number, name: string, hasFlip: boolean){
        this.x = x;
        this.y = Math.round(y);
        this.handAngle = handAngle;
        this.name = name;
        this.hasFlip = hasFlip;
    }
}