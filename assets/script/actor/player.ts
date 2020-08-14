import { Emitter } from "../utils/emmiter"

const {ccclass, property} = cc._decorator;

enum PlayerStatus {

}

@ccclass
export default class Player extends cc.Component {

    xSpeed: number = 0;
    ySpeed: number = 0;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // Movement control
        Emitter.register("rightArrowDown", this.moveRight, this)
        Emitter.register("leftArrowDown", this.moveLeft, this)
        Emitter.register("upArrowDown", this.moveUp, this)
        Emitter.register("downArrowDown", this.moveDown, this)
        Emitter.register("rightArrowUp", this.xOnStay, this)
        Emitter.register("leftArrowUp", this.xOnStay, this)
        Emitter.register("upArrowUp", this.yOnStay, this)
        Emitter.register("downArrowUp", this.yOnStay, this)

        Emitter.register("pickUp", this.pickUp, this)
        Emitter.register("dropDown", this.dropDown, this)

    }

    update (dt) {
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;
    }

    moveRight(){
        this.xSpeed = 100;
    }
    moveLeft(){
        this.xSpeed = -100;
    }
    moveUp(){
        this.ySpeed = 100;
    }
    moveDown(){
        this.ySpeed = -100;
    }
    xOnStay() {
        this.xSpeed = 0;
    }
    yOnStay() {
        this.ySpeed = 0;
    }

    pickUp() {
        console.log("picking up")
    }

    dropDown() {
        console.log("dropping down")
    }

}
