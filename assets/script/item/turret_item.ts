import { Emitter } from "../utils/emmiter";

const {ccclass, property} = cc._decorator;

@ccclass
export default class TurretItem extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.register("pickUpTurret", this.onPickUp, this)
    }
    init() {

    }

    onPickUp() {
        this.node.setParent(cc.find("Canvas/gamePage/player/hand"));
        this.node.setPosition(0,0);
    }   

    // update (dt) {}
}
