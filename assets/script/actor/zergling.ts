import { Emitter } from "../utils/emmiter"
// import MainUIManager from "../ui/main_ui_manager"
import MainManager from "../manager/main_manager"
import ResourceManager from "../manager/resouce_manager";
import config from "../../config";
import PoolManager from "../manager/pool_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Zergling extends cc.Component {


    @property(cc.Animation)
    monsterAnima: cc.Animation = null
    onLoad() {
        // Emitter.register("collision", this.checkCollision, this);
    }
    speed: number = 200
    edge: number = 580
    update(dt) {
        this.node.x += this.speed * dt
    }
    init(arr: boolean = false) {
        this.playAnima('monster_run')
        if (arr) {
            this.node.x = this.edge
            this.node.scaleX = -1
            this.speed = -this.speed
        } else {
            this.node.x = -this.edge
            this.node.scaleX = 1
            this.speed = this.speed
        }
    }
    onDie() {
        this.playAnima('monster_die')
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
    // checkCollision(obj: cc.Node) {
    //     if (obj) {
    //         switch (obj.name) {
    //             case "player":
    //                 this.endGame();
    //                 break
    //         }
    //     }
    // }
    putInPool() {
        PoolManager.instance.removeObjectByName('zergling', this.node)
    }
    // endGame() {
    //     //MainManager.instance.onFail();
    // }
}
