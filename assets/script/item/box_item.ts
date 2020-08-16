import { Emitter } from "../utils/emmiter"
import MainUIManager from "../ui/main_ui_manager";
import { Utils } from "../utils/utils";
import JsonManager from "../manager/json_manager";
import PoolManager from "../manager/pool_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxItem extends cc.Component {

    // isBroken = false;
    @property(cc.ProgressBar)
    hpProgress: cc.ProgressBar = null
    _hp: number = 3
    set hp(val: number) {
        this._hp = val
        this.hpProgress.progress = val / 3
        if (val == 3) {
            this.hpProgress.node.opacity = 0;
        } else{
            this.hpProgress.node.opacity = 150;
        }
        if (val <= 0) {
            // this.isBroken = true
            // let ani = cc.tween(this.node).to(1, { scaleY: 0 }, null).call(() => {
            //     PoolManager.instance.removeObjectByName('antItem', this.node)
            // }).start()
            PoolManager.instance.removeObjectByName('boxItem', this.node);
            // 需要做破坏动画吗
        }
    }
    get hp() {
        return this._hp
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.register("pickUpBox", this.onPickUp, this);
        Emitter.register("atkBox", this.onAttacked, this);
        this.hp = 3
    }
    init() {
        this.hp = 3
        let range = JsonManager.instance.getConfig('itemGenerateRange')
        let anchor = JsonManager.instance.getConfig('playerPosition')
        this.node.x = Utils.getRandomNumber(range[0]) - range[0] / 2 + anchor[0]
        this.node.y = Utils.getRandomNumber(range[1]) - range[1] / 2 + anchor[1]
    }
    onPickUp() {
        // 看看有没有更好的方法
        this.node.setParent(MainUIManager.instance.player.hand);
        this.node.setPosition(0, 0);
    }

    onAttacked() {
        this.hp -= 1;
    }
    // update (dt) {}
}
