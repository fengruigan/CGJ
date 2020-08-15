import { Emitter } from "../utils/emmiter"
import PoolManager from "../manager/pool_manager";
import MainUIManager from "../ui/main_ui_manager";
import AntItem from "./ant_item";
import MainManager from "../manager/main_manager";
import { Utils } from "../utils/utils";
import { GameStatus } from "../utils/enum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BulletItem extends cc.Component {


    // LIFE-CYCLE CALLBACKS:
    speed: number = 100
    arr: cc.Vec2 = null
    onLoad() {
    }
    init(pos, arr: cc.Vec2) {
        this.node.position = pos
        this.arr = arr.normalize()
    }
    update(dt) {
        if (MainManager.instance.gameStatus == GameStatus.start) {
            this.node.x += this.arr.x * dt * this.speed
            this.node.y += this.arr.y * dt * this.speed
        }
    }
    // update (dt) {}
}
