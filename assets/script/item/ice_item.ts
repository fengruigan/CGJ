import { Emitter } from "../utils/emmiter";
import MainUIManager from "../ui/main_ui_manager";
import PoolManager from "../manager/pool_manager";
import BulletItem from "./bullet_item";
import MainManager from "../manager/main_manager";
import { GameStatus, ResType } from "../utils/enum";
import { Utils } from "../utils/utils";
import AntItem from "./ant_item";
import JsonManager from "../manager/json_manager";
import ResourceManager from "../manager/resouce_manager";
import AudioManager from "../manager/audio_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IceItem extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    range: number = 150
    @property(cc.ParticleSystem)
    particle: cc.ParticleSystem = null
    @property(cc.Sprite)
    iceSprite: cc.Sprite = null
    @property(cc.Sprite)
    towerSp: cc.Sprite = null
    onLoad() {
    }
    attTimer: any = null
    init(pos) {
        this.iceSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "ice1")
        clearInterval(this.attTimer)
        this.node.setPosition(pos)

        this.range = JsonManager.instance.getDataByName('tower')[3]['range1']

        this.attTimer = setInterval(() => {
            if (MainManager.instance.gameStatus == GameStatus.start && this.node.getComponent(cc.BoxCollider).enabled && this.node.parent == MainUIManager.instance.towerParent) {
                let target = this.findAnt()
                if (target) {
                    this.particle.resetSystem()
                    let arr = this.node.position.sub(target.position)
                    this.particle.node.angle = (arr.y > 0 ? 1 : -1) * arr.angle(cc.v2(1, 0)) * 180 / Math.PI + 90
                    if (this.particle.node.angle <= 315 && this.particle.node.angle >= 225) {
                        // facing right, the angle is rotated 90 degs
                        this.iceSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "ice4")
                    } else if (this.particle.node.angle <= 135 && this.particle.node.angle >= 45) {
                        // facing left
                        this.iceSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "ice3")
                    } else if (this.particle.node.angle <= 225 && this.particle.node.angle >= 135) {
                        // facing down
                        this.iceSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "ice1")
                    } else {
                        // facing up
                        this.iceSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "ice2")
                    }
                    let group = this.findTargetRangeAnt(target.position)
                    group.map((item) => {
                        item.getComponent(AntItem).antFreeze()
                        item.getComponent(AntItem).hp -= JsonManager.instance.getDataByName('tower')[3]['damage']
                    })
                    AudioManager.instance.playAudio('水枪')
                }
            }
        }, JsonManager.instance.getDataByName('tower')[3]['atkSpd'])
    }
    findTargetRangeAnt(pos: cc.Vec2) {
        let group: cc.Node[] = []
        for (let i = 0; i < MainUIManager.instance.antParent.children.length; i++) {
            let antNode = MainUIManager.instance.antParent.children[i]
            let mag = antNode.position.sub(pos).mag()
            if (mag < JsonManager.instance.getDataByName('tower')[3]['range2'] && !antNode.getComponent(AntItem).isDie) {
                group.push(antNode)
            }
        }
        return group
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
