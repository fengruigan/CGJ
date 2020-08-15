import { Emitter } from "../utils/emmiter"
import PoolManager from "../manager/pool_manager";
import MainUIManager from "../ui/main_ui_manager";
import AntItem from "./ant_item";
import MainManager from "../manager/main_manager";
import { Utils } from "../utils/utils";
import { GameStatus } from "../utils/enum";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GapItem extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    }
    antGrowTimer: any = null
    init() {
        this.node.setPosition(Utils.getRandomNumber(1000) - 500, Utils.getRandomNumber(600) - 300)
        clearInterval(this.antGrowTimer)
        this.antGrowTimer = setInterval(() => {
            if (MainManager.instance.gameStatus == GameStatus.start) {
                let ant = PoolManager.instance.createObjectByName('antItem', MainUIManager.instance.antParent)
                ant.getComponent(AntItem).init(this.node.position)
            }

        }, 10000)
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'boxItem') {
            PoolManager.instance.removeObjectByName('gapItem', this.node)
            PoolManager.instance.removeObjectByName('boxItem', other.node)
        }
    }
    // update (dt) {}
}
