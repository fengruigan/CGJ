import AudioManager from "../manager/audio_manager"
import { Emitter } from "../utils/emmiter"
import { Utils } from "../utils/utils";
import ResourceManager from "../manager/resouce_manager";
import { ResType } from "../utils/enum";
import config from "../../config";
import MainUIManager from "../ui/main_ui_manager";

const { ccclass, property } = cc._decorator;
enum PlayerStatus {
    stay = 1,
    moveLeft = 2,
    moveRight = 3,
    reload = 4
}
@ccclass
export default class Player extends cc.Component {

    @property(cc.Integer)
    movementSpeed: number = 200;
    @property(cc.Sprite)
    playerSprite: cc.Sprite = null
    @property(cc.Animation)
    playerAnima: cc.Animation = null
    @property(cc.Integer)
    magazineSize: number = 15;
    atkSpd: number = 10; // shots per sec

    playerStatus: PlayerStatus = null
    ammunition: number = this.magazineSize
    onLoad() {
        Emitter.register("moveRight", this.moveRight, this);
        Emitter.register("moveLeft", this.moveLeft, this);
        Emitter.register("standStill", this.onStay, this);
        Emitter.register("fireBullet", this.onAtk, this);
        Emitter.register("reload", this.onReload, this);
        Emitter.register('win', () => {
            this.playerStatus = PlayerStatus.stay;
            this.playAnima('player_win');
        }, this)
        Emitter.register('fail', () => {
            this.playerStatus = PlayerStatus.stay;
            this.playerAnima.stop();
            this.playerSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.common, 'die');
        }, this)
        Emitter.register('restart', () => {
            this.playerStatus = PlayerStatus.stay;
            this.playerAnima.stop();
            this.playerSprite.spriteFrame = ResourceManager.instance.getSprite(ResType.common, 'player');
            this.ammunition = this.magazineSize
        }, this)

        this.playerStatus = PlayerStatus.stay;
        this.ammunition = this.magazineSize;
    }
    update(dt) {
        switch (this.playerStatus) {
            case PlayerStatus.stay:
                break
            case PlayerStatus.moveLeft:
                if (this.node.x >= -550) {
                    this.node.x -= dt * this.movementSpeed
                }
                break
            case PlayerStatus.moveRight:
                if (this.node.x <= 550) {
                    this.node.x += dt * this.movementSpeed
                }
                break
            case PlayerStatus.reload:
                break;
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
            case PlayerStatus.reload:
                break;
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
            case PlayerStatus.reload:
                break;
        }
    }

    attTimer: any = null
    onAtk() {
        //防止用户按键太快
        if (this.attTimer) return
        this.attTimer = setTimeout(() => {
            this.attTimer = null
        }, 1000 / this.atkSpd);
        if (this.ammunition > 0 && this.playerStatus != PlayerStatus.reload) {
            this.ammunition -= 1;
            MainUIManager.instance.createBullet();
            MainUIManager.instance.createMuzzleFlash();
            AudioManager.instance.playAudio("fire");
        } else if (this.ammunition <= 0 && this.playerStatus != PlayerStatus.reload) {
            this.onReload();
        } 
    }

    reloadTimer: any = null
    onReload() {
        if (this.reloadTimer) return
        this.reloadTimer = setTimeout(() => {
            this.reloadTimer = null
        }, 500)
        if (this.playerStatus != PlayerStatus.reload) {
            this.playerStatus = PlayerStatus.reload;
            this.ammunition = this.magazineSize;
            this.playAnima('player_reload')
            AudioManager.instance.playAudio('reload');
        }
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
