import { Emitter } from "../utils/emmiter";
import MainUIManager from "../ui/main_ui_manager";
import PoolManager from "../manager/pool_manager";
import BulletItem from "./bullet_item";
import MainManager from "../manager/main_manager";
import { GameStatus } from "../utils/enum";
import { Utils } from "../utils/utils";
import AntItem from "./ant_item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GrassItem extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    range: number = 300
    onLoad() {
        this.init()
    }
    attTimer: any = null
    init() {
        clearInterval(this.attTimer)
        this.node.setPosition(Utils.getRandomNumber(2000) - 1000, Utils.getRandomNumber(1400) - 700)

    }

    onCollisionEnter(other, self) {
        if (other.node.name == "ant") {
            other.node.getComponent(AntItem).speed = -25
        }
    }
    onCollisionExit(other, self) {
        if (other.node.name == "ant") {
            other.node.getComponent(AntItem).speed = -50
        }
    }
    // update (dt) {}
}
