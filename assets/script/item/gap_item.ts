import { Emitter } from "../utils/emmiter"
import PoolManager from "../manager/pool_manager";
import MainUIManager from "../ui/main_ui_manager";
import AntItem from "./ant_item";
import MainManager from "../manager/main_manager";
import { Utils } from "../utils/utils";
import { GameStatus, ResType } from "../utils/enum";
import JsonManager from "../manager/json_manager";
import ResourceManager from "../manager/resouce_manager"
import AudioManager from "../manager/audio_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class GapItem extends cc.Component {

    @property(cc.Sprite)
    gapSprite: cc.Sprite = null;
    // LIFE-CYCLE CALLBACKS:
    spriteNumber: number = 1;

    onLoad() {
    }
    antGrowTimer: any = null
    isOn: boolean = false
    init() {
        let rand = Utils.getRandomNumber(1)
        if (rand == 0) {
            this.gapSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "gap1")
            this.spriteNumber = 1;
        } else {
            this.gapSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "gap2")
            this.spriteNumber = 2;
        }
        let range = JsonManager.instance.getConfig('gapGenerateRange')
        let anchor = JsonManager.instance.getConfig('playerPosition')
        this.node.x = Utils.getRandomNumber(range[0]) - range[0] / 2 + anchor[0]
        this.node.y = Utils.getRandomNumber(range[1]) - range[1] / 2 + anchor[1]
        this.node.scale = 0
        cc.tween(this.node).to(1.5, { scale: 0.5 }, cc.easeCubicActionInOut()).start()
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
        if (this.isOn == true) {
            if (other.node.name == 'boxItem') {
                this.isOn = false;
                // PoolManager.instance.removeObjectByName('gapItem', this.node)
                AudioManager.instance.playAudio('填补裂缝')
                if (this.spriteNumber == 1) {
                    this.gapSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "gapfull1");
                } else {
                    this.gapSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.main, "gapfull2")
                }
                PoolManager.instance.removeObjectByName('boxItem', other.node)
            }
        }
    }
    // update (dt) {}
}
