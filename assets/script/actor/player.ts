import AudioManager from "../manager/audio_manager"
import { Emitter } from "../utils/emmiter"
import { Utils } from "../utils/utils";
import ResourceManager from "../manager/resouce_manager";
import { ResType } from "../utils/enum";
import config from "../../config";

const { ccclass, property } = cc._decorator;
enum PlayerStatus {
    stay = 1,
    moveLeft = 2,
    moveRight = 3
}
@ccclass
export default class Player extends cc.Component {

    @property(cc.Integer)
    movementSpeed: number = 1;
    @property(cc.Sprite)
    playerSprite: cc.Sprite = null
    @property(cc.Animation)
    playerAnima: cc.Animation = null

    // accelLeft: boolean = false;
    // accelRight: boolean = false;

    // LIFE-CYCLE CALLBACKS:
    playerStatus: PlayerStatus = null
    onLoad() {
        Emitter.register("moveRight", this.moveRight, this);
        Emitter.register("moveLeft", this.moveLeft, this);
        Emitter.register("standStill", this.onStay, this);
        // Emitter.register("leftArrowUp", this.onStay, this);
        this.playerStatus = PlayerStatus.stay
    }
    update(dt) {
        switch (this.playerStatus) {
            case PlayerStatus.stay:
                break
            case PlayerStatus.moveLeft:
                if (this.node.x >= -550){
                    this.node.x -= dt * this.movementSpeed
                }
                break
            case PlayerStatus.moveRight:
                if (this.node.x <= 550) {
                    this.node.x += dt * this.movementSpeed
                }
                break
        }
    }

    onStay() {
        this.playerAnima.stop();
        this.playerSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.common, 'player');
        this.playerStatus = PlayerStatus.stay;
    }
    moveRight() {
        switch (this.playerStatus) {
            case PlayerStatus.stay:
                this.node.scaleX = 1;
                this.playerStatus = PlayerStatus.moveRight;
                this.playAnima('player_run')
                break
            case PlayerStatus.moveLeft:
                this.node.scaleX = 1
                this.playerStatus = PlayerStatus.moveRight;
                break
            case PlayerStatus.moveRight:
                break
        }
    }
    moveLeft() {
        switch (this.playerStatus) {
            case PlayerStatus.stay:
                this.node.scaleX = -1
                this.playerStatus = PlayerStatus.moveLeft;
                this.playAnima('player_run')
                break
            case PlayerStatus.moveLeft:
                break
            case PlayerStatus.moveRight:
                this.playerStatus = PlayerStatus.moveLeft;
                this.node.scaleX = -1;
                break
        }
    }
    onAtk() {
        Utils.throttle(() => {
            //防止用户按键太快

        }, 100)
    }

    playAnima(aniName: string) {
        let clips = this.playerAnima.getClips()
        if (clips.some((item: cc.AnimationClip) => { return aniName == item.name })) {
            this.playerAnima.play(aniName)
        } else {
            ResourceManager.instance.getAnimation(aniName, config.animaParams[aniName]).then((clip: cc.AnimationClip) => {
                this.playerAnima.addClip(clip)
                this.playerAnima.play(aniName)
            })
        }
    }

}
