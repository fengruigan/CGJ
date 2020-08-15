import PoolManager from "../manager/pool_manager";
import { Emitter } from "../utils/emmiter";
import GapItem from "../item/gap_item";
import PlayerItem from "../item/player_item";
import BoxItem from "../item/box_item";
import { Utils } from "../utils/utils";
import TurretItem from "../item/turret_item";
import FailUIManager from "./fail_ui_manager";
import IceItem from "../item/ice_item";
import FireItem from "../item/fire_item";
import GrassItem from "../item/grass_item";


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
    @property(cc.Node)
    towerParent: cc.Node = null
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
        this.removeAllItem()
        this.player.init()
        clearInterval(this.growGapTimer)
        this.growGapTimer = setInterval(() => {
            let gap = PoolManager.instance.createObjectByName('gapItem', this.gapParent)
            gap.getComponent(GapItem).init()
        }, 10000)

        clearInterval(this.itemGapTimer)
        //每秒生成箱子和炮塔
        this.itemGapTimer = setInterval(() => {
            let random = Utils.getRandomNumber(1)
            if (random == 0) {
                let item = PoolManager.instance.createObjectByName('boxItem', this.boxParent)
                item.getComponent(BoxItem).init()
            } else {
                let towerRandom = Utils.getRandomNumber(3)
                if (towerRandom == 0) {
                    let item = PoolManager.instance.createObjectByName('turrentItem', this.towerParent)
                    item.getComponent(TurretItem).init()
                } else if (towerRandom == 1) {
                    let item = PoolManager.instance.createObjectByName('iceItem', this.towerParent)
                    item.getComponent(IceItem).init()
                } else if (towerRandom == 2) {
                    let item = PoolManager.instance.createObjectByName('fireItem', this.towerParent)
                    item.getComponent(FireItem).init()
                } else if (towerRandom == 3) {
                    let item = PoolManager.instance.createObjectByName('grassItem', this.towerParent)
                    item.getComponent(GrassItem).init()
                }

            }
        }, 1000)
    }
    showHp(num) {

        this.hpLabel.string = '当前血量:' + num
    }
    endGame() {
        //将物品回收 

        this.removeAllItem()
        clearInterval(this.growGapTimer)
        clearInterval(this.itemGapTimer)
        FailUIManager.instance.onFail()
    }
    removeAllItem() {
        let gapChild = this.gapParent.children
        for (let i = gapChild.length - 1; i >= 0; i--) {
            gapChild[i].getComponent(GapItem).isOn = false
            PoolManager.instance.removeObjectByName('gapItem', gapChild[i])
        }

        let antChild = this.antParent.children
        for (let i = antChild.length - 1; i >= 0; i--) {
            PoolManager.instance.removeObjectByName('antItem', antChild[i])
        }

        let bulletChild = this.bulletParent.children
        for (let i = bulletChild.length - 1; i >= 0; i--) {
            PoolManager.instance.removeObjectByName('bulletItem', bulletChild[i])
        }

        let boxChild = this.boxParent.children
        for (let i = boxChild.length - 1; i >= 0; i--) {
            PoolManager.instance.removeObjectByName('boxItem', boxChild[i])
        }
        let tullentChild = this.towerParent.children
        for (let i = tullentChild.length - 1; i >= 0; i--) {
            PoolManager.instance.removeObjectByName(tullentChild[i].name, tullentChild[i])
        }
    }


    // update (dt) {}
}
