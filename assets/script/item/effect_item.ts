import { Emitter } from "../utils/emmiter";
import MainUIManager from "../ui/main_ui_manager";
import PoolManager from "../manager/pool_manager";
import BulletItem from "./bullet_item";
import MainManager from "../manager/main_manager";
import { GameStatus, ResType } from "../utils/enum";
import { Utils } from "../utils/utils";
import AntItem from "./ant_item";
import JsonManager from "../manager/json_manager";
import AudioManager from "../manager/audio_manager"
import ResourceManager from "../manager/resouce_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EffectItem extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Sprite)
    bagSp: cc.Sprite = null
    @property(cc.ParticleSystem)
    particle: cc.ParticleSystem = null
    onLoad() {
    }
    init(pos, cb, name) {
        this.node.setPosition(pos)
        this.bagSp.node.y = 700 - pos.y
        this.bagSp.spriteFrame = ResourceManager.instance.getSprite(ResType.main, name)
        cc.tween(this.bagSp.node).to(1.5, { y: 0 }, cc.easeBounceOut()).call(() => {
            this.particle.resetSystem()
            cb()
        }).delay(0.4).call(() => {
            PoolManager.instance.removeObjectByName('effectItem', this.node)
        }).start()
    }


    // update (dt) {}
}
