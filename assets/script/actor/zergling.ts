import { Emitter } from "../utils/emmiter"
// import MainUIManager from "../ui/main_ui_manager"
import MainManager from "../manager/main_manager"
import ResourceManager from "../manager/resouce_manager";
import config from "../../config";
import PoolManager from "../manager/pool_manager";
import Bullet from "./bullet"
import AudioManager from "../manager/audio_manager";
import UIManager from "../manager/ui_manager"
import FailUIManager from "../ui/fail_ui_manager"

const { ccclass, property } = cc._decorator;
enum MonsterStatus {
    alive = 1,
    dead = 0
}

@ccclass
export default class Zergling extends cc.Component {


    @property(cc.Animation)
    monsterAnima: cc.Animation = null

    speedBoost: number = 1
    speed: number = 300
    edge: number = 580
    MonsterStatus: MonsterStatus = null

    onLoad() {
        Emitter.register('win', () => {
            this.MonsterStatus = MonsterStatus.dead
            this.playAnima('monster_die')
        }, this)
        Emitter.register('restart', () => {
            this.putInPool();
            this.speedBoost = 1;
        }, this)
        Emitter.register('speedUp', () => {
            this.speedBoost *= 1.5 ;
        }, this)
    }
    update(dt) {
        // destory on edge (mostly unnecessary)
        if (this.MonsterStatus == MonsterStatus.alive) {
            if (this.node.x >= 650 || this.node.x <= -650) {
                this.putInPool();
            }
            this.node.x += this.speed * this.speedBoost * dt
        }
    }

    init(side: string = "right") {
        this.MonsterStatus = MonsterStatus.alive
        this.playAnima('monster_run')
        switch (side) {
            case "right":
                this.node.x = this.edge
                this.node.scaleX = -1
                this.speed = -300
                break;
            case "left":
                this.node.x = -this.edge
                this.node.scaleX = 1
                this.speed = 300
                break;
        }

    }
    onDie() {
        this.speed = 0;
        this.MonsterStatus = MonsterStatus.dead;
        AudioManager.instance.playAudio('zergling-death')
        this.playAnima('monster_die');
    }
    playAnima(aniName: string) {
        let clips = this.monsterAnima.getClips()
        if (clips.some((item: cc.AnimationClip) => { return aniName == item.name })) {
            this.monsterAnima.play(aniName)
        } else {
            ResourceManager.instance.getAnimation(aniName, config.animaParams[aniName]).then((clip: cc.AnimationClip) => {
                this.monsterAnima.addClip(clip)
                this.monsterAnima.play(aniName)
            })
        }
    }

    onCollisionEnter(other, self) {
        if (this.MonsterStatus == MonsterStatus.alive) {
            if (other.node.name === "bullet") {
                this.onDie();
                other.node.getComponent(Bullet).putInPool();
            } else if (other.node.name === "player") {
                this.playAnima('monster_fail')
                this.MonsterStatus = MonsterStatus.dead
                MainManager.instance.onFail();
            }
        }
    }

    putInPool() {
        PoolManager.instance.removeObjectByName('zergling', this.node)
    }
}
