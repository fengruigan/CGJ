import { Emitter } from "../utils/emmiter"

const {ccclass, property} = cc._decorator;

@ccclass
export default class BoxItem extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.register("pickUpBox", this.pickedUp, this);
    }

    pickedUp() {
        this.node.setParent(cc.find("Canvas/gamePage/player/hand"));
        console.log(this.node.parent);
        this.node.setPosition(0,0);
    }   

    // update (dt) {}
}
