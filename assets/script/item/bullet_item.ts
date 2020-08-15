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
        this.node.angle = (arr.y > 0 ? 1 : -1) * arr.angle(cc.v2(1, 0)) * 180 / Math.PI
    }
    update(dt) {
        if (MainManager.instance.gameStatus == GameStatus.start) {
            this.node.x += this.arr.x * dt * this.speed
            this.node.y += this.arr.y * dt * this.speed
        }
        // if (this.node.x > 2000 || this.node.x < 2000) {
        //     PoolManager.instance.removeObjectByName('bulletItem', this.node)
        // }
        // if (this.node.y > 1500 || this.node.y < 1500) {
        //     PoolManager.instance.removeObjectByName('bulletItem', this.node)
        // }
    }
    // update (dt) {}
}
