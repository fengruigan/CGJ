import AudioManager from "../manager/audio_manager";
import PoolManager from "../manager/pool_manager";


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
            }, 2000)
            AudioManager.instance.playAudio('蚂蚁咬箱子', 0.5)
            // 如箱子有血量再做修改
            PoolManager.instance.removeObjectByName('boxItem', other.node)
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
