import AudioManager from "../manager/audio_manager";
import PoolManager from "../manager/pool_manager";
import { Emitter } from "../utils/emmiter";
import BoxItem from "./box_item";
import JsonManager from "../manager/json_manager";


const {ccclass, property} = cc._decorator;

@ccclass
export default class HeadItem extends cc.Component {

    blockCount: number = 0
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    onCollisionEnter(other, self) {
        if (other.node.name == "boxItem") {
            // 给Timeout的缓冲时间再开始咬箱子
            setTimeout( () => {
                this.blockCount += 1;
            }, 1000)
        }
    }
    atkTimer: any = null
    onCollisionStay(other, self) {
        if (this.blockCount != 0) {
            if (this.atkTimer) return
            this.atkTimer = setTimeout( () => {
                this.atkTimer = null
            }, JsonManager.instance.getConfig("antAtkSpd") * 1000)
            AudioManager.instance.playAudio('蚂蚁咬箱子')
            other.node.getComponent(BoxItem).onAttacked();
        }
    }
    onCollisionExit(other, self) {
        if (other.node.name == "boxItem") {
            setTimeout( () => {
                this.blockCount -= 1;
            }, 250)
        }
    }
}
