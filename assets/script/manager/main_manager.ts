import MainUIManager from "../ui/main_ui_manager"
import { Emitter } from "../utils/emmiter"
import { GameStatus } from "../utils/enum";
import AudioManager from "./audio_manager";

const { ccclass, property } = cc._decorator;
declare global {
    interface Window {
        winSize: any
    }
}
/**
 * 全局控制
 */
enum keyStatus {
    up = 0,
    down = 1
}

@ccclass
export default class MainManager extends cc.Component {

    static instance: MainManager = null
    rightArrowState: keyStatus = keyStatus.up;
    leftArrowState: keyStatus = keyStatus.up;
    upArrowState: keyStatus = keyStatus.up;
    downArrowState: keyStatus = keyStatus.up;

    gameStatus: GameStatus = GameStatus.unStart
    onLoad() {
        MainManager.instance = this
        this.setDesignResolution()

        // keyboard event listener
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // turn on collision manager
        cc.director.getCollisionManager().enabled = true;

        setTimeout(() => {
            AudioManager.instance.loadBGMClip("bgm", 0.4)
        }, 100)

        Emitter.register("warning", this.onWarning, this)
    }
    //适配
    setDesignResolution() {
        // var canvas = cc.find("Canvas").getComponent(cc.Canvas)
        // var winSize = cc.winSize
        // window.winSize = winSize
        // if (winSize.width / winSize.height > 9 / 16) {
        //     canvas.fitWidth = false
        //     canvas.fitHeight = true
        // } else {
        //     canvas.fitWidth = true
        //     canvas.fitHeight = false
        // }
    }

    update(dt) {
        if (this.rightArrowState == keyStatus.down && this.leftArrowState == keyStatus.up) {
            Emitter.fire("rightArrowDown");
        }
        if (this.leftArrowState == keyStatus.down && this.rightArrowState == keyStatus.up) {
            Emitter.fire("leftArrowDown");
        }
        if (this.upArrowState == keyStatus.down && this.downArrowState == keyStatus.up) {
            Emitter.fire("upArrowDown");
        }
        if (this.downArrowState == keyStatus.down && this.upArrowState == keyStatus.up) {
            Emitter.fire("downArrowDown");
        }
        if (this.rightArrowState == keyStatus.up && this.leftArrowState != keyStatus.down) {
            Emitter.fire("rightArrowUp");
        }
        if (this.leftArrowState == keyStatus.up && this.rightArrowState != keyStatus.down) {
            Emitter.fire("leftArrowUp");
        }
        if (this.upArrowState == keyStatus.up && this.downArrowState != keyStatus.down) {
            Emitter.fire("upArrowUp");
        }
        if (this.downArrowState == keyStatus.up && this.upArrowState != keyStatus.down) {
            Emitter.fire("downArrowUp");
        }
    }

    startGame() {
        MainUIManager.instance.init();
        this.gameStatus = GameStatus.start
    }

    onFail() {
        console.log("游戏结束")
        this.gameStatus = GameStatus.fail
        MainUIManager.instance.endGame()
        AudioManager.instance.playAudio('游戏失败')
    }

    // Keyboard event listener
    onKeyDown(event) {
        switch (event.keyCode) {
            /*
            * Movement
            */
            case cc.macro.KEY.right:
                // console.log("right arrow pressed");
                // Emitter.fire("rightArrowDown");
                this.rightArrowState = keyStatus.down;
                break;
            case cc.macro.KEY.left:
                // console.log("left arrow pressed");
                // Emitter.fire("leftArrowDown");
                this.leftArrowState = keyStatus.down;
                break;
            case cc.macro.KEY.up:
                // console.log("up arrow pressed");
                // Emitter.fire("upArrowDown");
                this.upArrowState = keyStatus.down;
                break;
            case cc.macro.KEY.down:
                // console.log("down arrow pressed");
                // Emitter.fire("downArrowDown");
                this.downArrowState = keyStatus.down;
                break;
            /*
            * Pick up and drop down
            */
            case cc.macro.KEY.z:
                // Emitter.fire("standStill");
                Emitter.fire("pickUp");
                break;
            /*
            * Item selection
            */
            // case cc.macro.KEY.space:
            //     // Emitter.fire("standStill");
            //     Emitter.fire("pickUp");
            //     break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                // console.log("right arrow pressed");
                // Emitter.fire("rightArrowUp");
                this.rightArrowState = keyStatus.up;
                break;
            case cc.macro.KEY.left:
                // console.log("left arrow pressed");
                // Emitter.fire("leftArrowUp");
                this.leftArrowState = keyStatus.up;
                break;
            case cc.macro.KEY.up:
                // console.log("up arrow pressed");
                // Emitter.fire("upArrowUp");
                this.upArrowState = keyStatus.up;
                break;
            case cc.macro.KEY.down:
                // console.log("down arrow pressed");
                // Emitter.fire("downArrowUp");
                this.downArrowState = keyStatus.up;
                break;
        }
    }

    warnTimer: any = null
    onWarning() {
        if (this.warnTimer) return
        this.warnTimer = setTimeout( () => {
            this.warnTimer = null
        }, 1500)
        AudioManager.instance.playAudio('蚂蚁靠近提示音效')
    }
}