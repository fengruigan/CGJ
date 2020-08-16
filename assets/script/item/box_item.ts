import { Emitter } from "../utils/emmiter"
import MainUIManager from "../ui/main_ui_manager";
import { Utils } from "../utils/utils";
import JsonManager from "../manager/json_manager";
import PoolManager from "../manager/pool_manager";
import PropItem from "./prop_item";
import AudioManager from "../manager/audio_manager";
import WayPointManager from "../manager/way_point_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BoxItem extends cc.Component {

    vulnerable: number = 0; 
    distToPlayer: number = 0;
    // isBroken = false;
    @property(cc.ProgressBar)
    hpProgress: cc.ProgressBar = null
    _hp: number = 3
    set hp(val: number) {
        this._hp = val
        this.hpProgress.progress = val / 3
        if (val == 3) {
            this.hpProgress.node.opacity = 0;
        } else {
            this.hpProgress.node.opacity = 150;
        }
        if (val <= 0) {
            // this.isBroken = true
            // let ani = cc.tween(this.node).to(1, { scaleY: 0 }, null).call(() => {
            //     PoolManager.instance.removeObjectByName('antItem', this.node)
            // }).start()
            AudioManager.instance.playAudio('箱子被破坏')
            PoolManager.instance.removeObjectByName('boxItem', this.node);
            let random = Utils.getRandomNumber(49)
            if (random == 0) {
                let prop = PoolManager.instance.createObjectByName('propItem', MainUIManager.instance.propParent)
                prop.getComponent(PropItem).init(0, this.node.position)
            }
        }
    }
    get hp() {
        return this._hp
    }

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        Emitter.register("pickUpBox", this.onPickUp, this);
    }
    init() {
        this.hp = 3
        let range = JsonManager.instance.getConfig('itemGenerateRange')
        let anchor = JsonManager.instance.getConfig('playerPosition')
        let posy = Utils.getRandomNumber(range[1]) - range[1] / 2 + anchor[1]
        this.node.x = Utils.getRandomNumber(range[0]) - range[0] / 2 + anchor[0]
        this.node.y = posy + 700
        this.node.getComponent(cc.BoxCollider).enabled = false
        cc.tween(this.node).to(2, { y: posy }, cc.easeBounceOut()).call(() => {
            this.node.getComponent(cc.BoxCollider).enabled = true
        }).start()

    }
    onPickUp() {
        // 看看有没有更好的方法
        this.node.setParent(MainUIManager.instance.player.hand);
        this.node.setPosition(0, 0);
    }

    onAttacked() {
        if (this.vulnerable == 1) {
            this.hp -= 1;
            AudioManager.instance.playAudio('蚂蚁咬箱子')
        }
    }
    update (dt) {
        // check distance to player
        this.distToPlayer = this.node.position.sub(WayPointManager.instance.player.node.getPosition()).mag()
        // distance currently set to 500
        if (this.distToPlayer >= 500) {
            this.vulnerable = 0;
        } else {
            this.vulnerable = 1;
        }
    }
}
