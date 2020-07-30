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

    // onLoad() {
        
    // }

    speed: number = 300
    edge: number = 580
    update(dt) {
        // destory on edge (mostly unnecessary)
        if (this.node.x >= 650 || this.node.x <= -650) {
            this.putInPool();
        }
        this.node.x += this.speed * dt
    }
    init(side: string="right") {
        this.playAnima('monster_run')
        switch (side){
            case "right":
                this.node.x = this.edge
                this.node.scaleX = -1
                this.speed = -this.speed
                break;
            case "left":
                this.node.x = -this.edge
                this.node.scaleX = 1
                this.speed = this.speed
                break;
        }
        // cc.director.getCollisionManager().enabled = true; // enable collision manager
        // Emitter.register("collision", this.checkCollision, this);
    }
    onDie() {
        this.speed = 0;
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
        if (other.node.name === "bullet") {
            this.onDie();
        } else if (other.node.name === "player") {
            this.endGame();
        }
    }

    putInPool() {
        PoolManager.instance.removeObjectByName('zergling', this.node)
    }
    endGame() {
        console.log("ending game")
        // MainManager.instance.onFail();
    }
}
