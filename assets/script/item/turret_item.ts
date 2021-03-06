import { Emitter } from "../utils/emmiter";
import MainUIManager from "../ui/main_ui_manager";
import PoolManager from "../manager/pool_manager";
import BulletItem from "./bullet_item";
import MainManager from "../manager/main_manager";
import { GameStatus, ResType } from "../utils/enum";
import { Utils } from "../utils/utils";
import AntItem from "./ant_item";
import JsonManager from "../manager/json_manager";
import ResourceManager from "../manager/resouce_manager"
import AudioManager from "../manager/audio_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TurretItem extends cc.Component {

    @property(cc.Sprite)
    turretSprite: cc.Sprite = null

    // LIFE-CYCLE CALLBACKS:
    range: number = 200
    onLoad() {
        Emitter.register("pickUpTurret", this.onPickUp, this)
    }
    attTimer: any = null
    init(pos) {
        this.turretSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "turrent1")
        this.node.scaleX = 1;
        clearInterval(this.attTimer)
        this.node.setPosition(pos)

        this.range = JsonManager.instance.getDataByName('tower')[1]['range1']
        this.attTimer = setInterval(() => {
            if (MainManager.instance.gameStatus == GameStatus.start && this.node.getComponent(cc.BoxCollider).enabled && this.node.parent == MainUIManager.instance.towerParent) {
                let target = this.findAnt()
                if (target) {
                    let bullet = PoolManager.instance.createObjectByName('bulletItem', MainUIManager.instance.bulletParent)
                    let arr = target.position.sub(this.node.position)
                    bullet.getComponent(BulletItem).init(this.node.position, arr)
                    arr = arr.normalize()
                    let ang = (arr.y > 0 ? 1 : -1) * arr.angle(cc.v2(1, 0)) * 180 / Math.PI
                    if (ang <= 45 && ang >= -45) {
                        // facing right, the angle is rotated 90 degs
                        this.turretSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "turrent2")
                        this.node.scaleX = -1;
                    } else if (ang <= 135 && ang >= 45) {
                        // facing up
                        this.turretSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "turrent3")
                    } else if (ang <= -45 && ang >= -135) {
                        // facing down
                        this.turretSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "turrent1")
                    } else {
                        // facing left
                        this.turretSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "turrent2")
                        this.node.scaleX = 1;
                    }
                    AudioManager.instance.playAudio('普通炮塔')
                }
            }
        }, 500)
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
    onPickUp() {
        this.node.setParent(MainUIManager.instance.player.hand);
        this.node.setPosition(0, 0);
    }

    // update (dt) {}
}
