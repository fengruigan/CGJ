import { Emitter } from "../utils/emmiter"
import MainUIManager from "../ui/main_ui_manager";
import { Utils } from "../utils/utils";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxItem extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.register("pickUpBox", this.onPickUp, this);
    }
    init() {
        this.node.setPosition(Utils.getRandomNumber(2000) - 1000, Utils.getRandomNumber(1400) - 700)
    }
    onPickUp() {
        // 看看有没有更好的方法
        this.node.setParent(MainUIManager.instance.player.hand);
        this.node.setPosition(0, 0);
    }

    // update (dt) {}
}
