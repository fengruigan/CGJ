import { Emitter } from "../utils/emmiter";
import MainUIManager from "../ui/main_ui_manager";
import PoolManager from "../manager/pool_manager";
import BulletItem from "./bullet_item";
import MainManager from "../manager/main_manager";
import { GameStatus } from "../utils/enum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurretItem extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    range: number = 300
    onLoad() {
        Emitter.register("pickUpTurret", this.onPickUp, this)
        this.init()
    }
    attTimer: any = null
    init() {
        clearInterval(this.attTimer)
        this.attTimer = setInterval(() => {
            if (MainManager.instance.gameStatus == GameStatus.start) {
                let target = this.findAnt()
                if (target) {
                    let bullet = PoolManager.instance.createObjectByName('bulletItem', MainUIManager.instance.bulletParent)
                    bullet.getComponent(BulletItem).init(this.node.position, target.position.sub(this.node.position))
                }
            }
        }, 1000)
    }
    findAnt() {
        let nearst: cc.Node = null
        for (let i = 0; i < MainUIManager.instance.antParent.children.length; i++) {
            let antNode = MainUIManager.instance.antParent.children[i]
            let mag = antNode.position.sub(this.node.position).mag()
            if (mag < this.range) {
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
    onPickUp() {
        this.node.setParent(MainUIManager.instance.player.hand);
        this.node.setPosition(0, 0);
    }

    // update (dt) {}
}
