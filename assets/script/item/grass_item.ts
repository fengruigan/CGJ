import { Emitter } from "../utils/emmiter";
import MainUIManager from "../ui/main_ui_manager";
import PoolManager from "../manager/pool_manager";
import BulletItem from "./bullet_item";
import MainManager from "../manager/main_manager";
import { GameStatus } from "../utils/enum";
import { Utils } from "../utils/utils";
import AntItem from "./ant_item";
import JsonManager from "../manager/json_manager";
import AudioManager from "../manager/audio_manager"

const { ccclass, property } = cc._decorator;

@ccclass
export default class GrassItem extends cc.Component {
    soundTimer = null
    // LIFE-CYCLE CALLBACKS:
    onLoad() {
        this.init()
    }
    init() {
        let range = JsonManager.instance.getConfig('itemGenerateRange')
        let anchor = JsonManager.instance.getConfig('playerPosition')
        this.node.x = Utils.getRandomNumber(range[0]) - range[0] / 2 + anchor[0]
        this.node.y = Utils.getRandomNumber(range[1]) - range[1] / 2 + anchor[1]
    }

    onCollisionEnter(other, self) {
        if (other.node.name == "ant") {
            other.node.getComponent(AntItem).speed *= JsonManager.instance.getDataByName('tower')[4]['effect']
        }
    }
    onCollisionStay(other, self) {
        if (this.soundTimer) return
        this.soundTimer = setTimeout( () => {
            this.soundTimer = null
        }, 500)
        AudioManager.instance.playAudio('杂草', 0.2)
    }
    onCollisionExit(other, self) {
        if (other.node.name == "ant") {
            other.node.getComponent(AntItem).speed /= JsonManager.instance.getDataByName('tower')[4]['effect']
        }
    }
    // update (dt) {}
}
