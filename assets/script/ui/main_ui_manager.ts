import PoolManager from "../manager/pool_manager";
import { Emitter } from "../utils/emmiter";
import GapItem from "../item/gap_item";
import PlayerItem from "../item/player_item";
import BoxItem from "../item/box_item";


const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUIManager extends cc.Component {
    static instance: MainUIManager = null;

    @property(cc.Node)
    gapParent: cc.Node = null
    @property(cc.Node)
    antParent: cc.Node = null
    @property(cc.Node)
    boxParent: cc.Node = null
    @property(cc.Node)
    bulletParent: cc.Node = null
    @property(cc.Label)
    hpLabel: cc.Label = null
    @property(PlayerItem)
    player: PlayerItem = null
    onLoad() {
        MainUIManager.instance = this;
        this.player = cc.find("Canvas/gamePage/player").getComponent(PlayerItem)
    }

    growGapTimer: any = null
    itemGapTimer: any = null
    init() {
        //所有位置重置
        this.player.init()
        clearInterval(this.growGapTimer)
        this.growGapTimer = setInterval(() => {
            let gap = PoolManager.instance.createObjectByName('gapItem', this.gapParent)
            gap.getComponent(GapItem).init()
        }, 10000)

        clearInterval(this.itemGapTimer)
        //每秒生成箱子和炮塔
        // this.itemGapTimer = setInterval(() => {
        //     let item = PoolManager.instance.createObjectByName('boxItem', this.boxParent)
        //     item.getComponent(BoxItem).init()
        // }, 1000)
    }
    showHp(num) {

        this.hpLabel.string = '当前血量:' + num
    }
    endGame() {
        //将物品回收 
        let gapChild = this.gapParent.children
        for (let i = gapChild.length - 1; i >= 0; i--) {
            PoolManager.instance.removeObjectByName('gapItem', gapChild[i])
        }

        let antChild = this.antParent.children
        for (let i = antChild.length - 1; i >= 0; i--) {
            PoolManager.instance.removeObjectByName('antItem', antChild[i])
        }
        clearInterval(this.growGapTimer)
    }


    // update (dt) {}
}
