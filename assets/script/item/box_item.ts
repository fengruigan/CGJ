import { Emitter } from "../utils/emmiter"
import MainUIManager from "../ui/main_ui_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxItem extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.register("pickUpBox", this.onPickUp, this);
    }
    init() {

    }
    onPickUp() {
        // 看看有没有更好的方法
        this.node.setParent(MainUIManager.instance.player.hand);
        this.node.setPosition(0, 0);
    }

    // update (dt) {}
}
