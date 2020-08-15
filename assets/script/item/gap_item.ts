import { Emitter } from "../utils/emmiter"
import PoolManager from "../manager/pool_manager";
import MainUIManager from "../ui/main_ui_manager";
import AntItem from "./ant_item";
import MainManager from "../manager/main_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GapItem extends cc.Component {


    // LIFE-CYCLE CALLBACKS:

    onLoad() {
    }
    antGrowTimer: any = null
    init() {
        this.node.setPosition(cc.v2(0, 0))
        this.antGrowTimer = setInterval(() => {
            let ant = PoolManager.instance.createObjectByName('antItem', MainUIManager.instance.antParent)
            ant.getComponent(AntItem).init(this.node.position)
        }, 10000)
    }

    // update (dt) {}
}
