import { Emitter } from "../utils/emmiter"
import PoolManager from "../manager/pool_manager";
import MainUIManager from "../ui/main_ui_manager";
import AntItem from "./ant_item";
import MainManager from "../manager/main_manager";
import { Utils } from "../utils/utils";
import { GameStatus } from "../utils/enum";
import JsonManager from "../manager/json_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GapItem extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    }
    antGrowTimer: any = null
    isOn: boolean = false
    init() {
        let range = JsonManager.instance.getConfig('gapGenerateRange')
        let anchor = JsonManager.instance.getConfig('playerPosition')
        this.node.x = Utils.getRandomNumber(range[0]) - range[0] / 2 + anchor[0]
        this.node.y = Utils.getRandomNumber(range[1]) - range[1] / 2 + anchor[1]
        this.isOn = true
        clearInterval(this.antGrowTimer)
        this.antGrowTimer = setInterval(() => {
            if (MainManager.instance.gameStatus == GameStatus.start && this.isOn) {
                let ant = PoolManager.instance.createObjectByName('antItem', MainUIManager.instance.antParent)
                ant.getComponent(AntItem).init(this.node.position)
            }
        }, JsonManager.instance.getConfig('antGrowTime') * 1000)
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'boxItem') {
            this.isOn = false
            PoolManager.instance.removeObjectByName('gapItem', this.node)
            PoolManager.instance.removeObjectByName('boxItem', other.node)
        }
    }
    // update (dt) {}
}
