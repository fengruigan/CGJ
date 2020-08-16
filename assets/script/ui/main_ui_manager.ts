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
import config from "../../config";
import JsonManager from "../manager/json_manager";
import EffectItem from "../item/effect_item";
import PropItem from "../item/prop_item";
import UIManager from "../manager/ui_manager";
import MainManager from "../manager/main_manager";


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
    @property(PlayerItem)
    player: PlayerItem = null
    @property(cc.Node)
    hpNode: cc.Node = null
    @property(cc.Button)
    useBtn: cc.Button = null
    @property(cc.Node)
    effectParent: cc.Node = null
    @property(cc.Node)
    propParent: cc.Node = null
    @property(cc.Label)
    tipLabel: cc.Label = null
    onLoad() {
        MainUIManager.instance = this;
        this.player = cc.find("Canvas/gamePage/player").getComponent(PlayerItem)
        this.useBtn.node.on('click', () => {
            Emitter.fire("pickUp")
        }, this)
    }

    growGapTimer: any = null
    itemGapTimer: any = null
    init() {
        //所有位置重置
        this.tipLabel.string = ''
        this.removeAllItem()
        this.player.init()
        clearInterval(this.growGapTimer)

        this.growGapTimer = setInterval(() => {
            if (this.gapParent.children.length < 20) {
                let gap = PoolManager.instance.createObjectByName('gapItem', this.gapParent)
                gap.getComponent(GapItem).init()
            } else {
                clearInterval(this.growGapTimer)
                this.onProtectiveCloth()
            }
        }, JsonManager.instance.getConfig('gapGrowTime') * 1000)
        clearInterval(this.itemGapTimer)
        //每秒生成箱子和炮塔
        this.itemGapTimer = setInterval(() => {
            let random = Utils.getRandomNumber(1)
            if (random == 0) {
                let item = PoolManager.instance.createObjectByName('boxItem', this.boxParent)
                item.getComponent(BoxItem).init()
            } else {
                let towerRandom = Utils.getRandomNumber(3)
                let range = JsonManager.instance.getConfig('itemGenerateRange')
                let anchor = JsonManager.instance.getConfig('playerPosition')
                let pos: cc.Vec2 = cc.v2(0, 0)
                pos.x = Utils.getRandomNumber(range[0]) - range[0] / 2 + anchor[0]
                pos.y = Utils.getRandomNumber(range[1]) - range[1] / 2 + anchor[1]
                let effect = PoolManager.instance.createObjectByName('effectItem', this.effectParent)
                if (towerRandom == 0) {
                    effect.getComponent(EffectItem).init(pos, () => {
                        let item = PoolManager.instance.createObjectByName('turrentItem', this.towerParent)
                        item.getComponent(TurretItem).init(pos)
                        console.log('turrentItem')
                    }, 'bag_turrentItem')
                } else if (towerRandom == 1) {
                    effect.getComponent(EffectItem).init(pos, () => {
                        let item = PoolManager.instance.createObjectByName('iceItem', this.towerParent)
                        item.getComponent(IceItem).init(pos)
                        console.log('iceItem')

                    }, 'bag_iceItem')
                } else if (towerRandom == 2) {
                    effect.getComponent(EffectItem).init(pos, () => {
                        let item = PoolManager.instance.createObjectByName('fireItem', this.towerParent)
                        item.getComponent(FireItem).init(pos)
                        console.log('fireItem')

                    }, 'bag_fireItem')
                } else if (towerRandom == 3) {
                    effect.getComponent(EffectItem).init(pos, () => {
                        let item = PoolManager.instance.createObjectByName('grassItem', this.towerParent)
                        item.getComponent(GrassItem).init(pos)
                        console.log('grassItem')

                    }, 'bag_grassItem')

                }

            }
        }, JsonManager.instance.getConfig('gapGrowTime') * 1000)
    }
    showHp(num) {
        this.hpNode.children.map((item, index) => {
            item.active = false
            if (index < num) {
                item.active = true
            }
        })
        // this.hpLabel.string = '当前血量:' + num
    }
    endGame() {
        //将物品回收 
        // this.removeAllItem()
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
        let effectChild = this.effectParent.children
        for (let i = effectChild.length - 1; i >= 0; i--) {
            PoolManager.instance.removeObjectByName('effectItem', effectChild[i])
        }
        let propChild = this.propParent.children
        for (let i = propChild.length - 1; i >= 0; i--) {
            PoolManager.instance.removeObjectByName('propItem', propChild[i])
        }
        let tullentChild = this.towerParent.children
        for (let i = tullentChild.length - 1; i >= 0; i--) {
            PoolManager.instance.removeObjectByName(tullentChild[i].name, tullentChild[i])
        }
    }
    onProtectiveCloth() {
        let effeft = PoolManager.instance.createObjectByName('effectItem', this.effectParent)
        this.onTip('防护服出现了！穿上它逃出去')
        effeft.getComponent(EffectItem).init(cc.v2(0, 0), () => {
            let prop = PoolManager.instance.createObjectByName('propItem', this.propParent)
            prop.getComponent(PropItem).init(1, cc.v2(0, 0))
        }, 'bag_success')
    }
    tipTimer: any = null
    onTip(str: string) {
        this.tipLabel.string = str
        clearTimeout(this.tipTimer)
        this.tipTimer = setTimeout(() => {
            this.tipLabel.string = ''
        }, 3000);
    }

    checkRealSuccess() {
        if (this.gapParent.children.every((item) => {
            let script = item.getComponent(GapItem)
            return !script.isOn
        })) {
            MainManager.instance.onSuccess(1)
        }
    }
}
