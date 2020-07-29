import AudioManager from "../manager/audio_manager"
import { Emitter } from "../utils/emmiter"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    
    @property(cc.Integer)
    movementSpeed: number = 10;

    // accelLeft: boolean = false;
    // accelRight: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.register("rightArrowDown", this.moveRight, this);
        Emitter.register("leftArrowDown", this.moveLeft, this);
    }
    
    moveRight() {
        this.node.setPosition(this.node.position.x + this.movementSpeed, this.node.position.y);
    }
    moveLeft() {
        this.node.setPosition(this.node.position.x - this.movementSpeed, this.node.position.y);
    }

}
