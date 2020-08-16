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
export default class PropItem extends cc.Component {
    // LIFE-CYCLE CALLBACKS:
    @property(cc.Sprite)
    propSp: cc.Sprite = null
    type: number = 0//0是加血 1是防化服
    onLoad() {
    }
    init(type: number, pos: cc.Vec2) {
        this.type = type
        let spName = type == 0 ? 'love' : 'successItem'
        this.propSp.spriteFrame = ResourceManager.instance.getSprite(ResType.main, spName)
        this.node.setPosition(pos)
    }

    onCollisionEnter(other, self) {
        if (other.node.name == 'player') {
            switch (this.type) {
                case 0:
                    MainUIManager.instance.player.hp++
                    PoolManager.instance.removeObjectByName('propItem', this.node)
                    break
                case 1:
                    MainUIManager.instance.player.onProtect()
                    PoolManager.instance.removeObjectByName('propItem', this.node)

                    break
            }
        }
    }

    // update (dt) {}
}
