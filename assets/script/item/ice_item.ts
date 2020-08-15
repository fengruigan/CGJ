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
export default class IceItem extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    range: number = 150
    onLoad() {
        this.init()
    }
    attTimer: any = null
    init() {
        clearInterval(this.attTimer)
        this.node.setPosition(Utils.getRandomNumber(2000) - 1000, Utils.getRandomNumber(1400) - 700)
        this.attTimer = setInterval(() => {
            if (MainManager.instance.gameStatus == GameStatus.start && this.node.getComponent(cc.BoxCollider).enabled && this.node.parent == MainUIManager.instance.towerParent) {
                let target = this.findAnt()
                if (target) {
                    //TODO喷会爆炸的冰
                }
            }
        }, 1000)
    }
    findAnt() {
        let nearst: cc.Node = null
        for (let i = 0; i < MainUIManager.instance.antParent.children.length; i++) {
            let antNode = MainUIManager.instance.antParent.children[i]
            let mag = antNode.position.sub(this.node.position).mag()
            if (mag < this.range && !antNode.getComponent(AntItem).isDie) {
                if (!nearst) {
                    nearst = antNode
                } else {
                    if (nearst.position.sub(this.node.position).mag() > mag) {
                        nearst = antNode
                    }
                }
            }
        }
        return nearst
    }

    // update (dt) {}
}
