import PoolManager from "../manager/pool_manager";
import { Emitter } from "../utils/emmiter";
import GapItem from "../item/gap_item";
import PlayerItem from "../item/player_item";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUIManager extends cc.Component {
    static instance: MainUIManager = null;

    @property(cc.Node)
    gapParent: cc.Node = null
    @property(cc.Node)
    antParent: cc.Node = null
    @property(cc.Label)
    hpLabel: cc.Label = null
    @property(PlayerItem)
    player: PlayerItem = null
    onLoad() {
        MainUIManager.instance = this;
        this.player = cc.find("Canvas/gamePage/player").getComponent(PlayerItem)
    }

    growGapTimer: any = null
    init() {
        this.player.init()
        clearInterval(this.growGapTimer)
        this.growGapTimer = setInterval(() => {
            let gap = PoolManager.instance.createObjectByName('gapItem', this.gapParent)
            gap.getComponent(GapItem).init()
        }, 10000)
        //将物品回收 所有位置重置

    }
    showHp(num) {
        this.hpLabel.string = '当前血量:' + num
    }
    endGame() {
        clearInterval(this.growGapTimer)
    }


    // update (dt) {}
}
