import MainUIManager from "../ui/main_ui_manager"
import { Emitter } from "../utils/emmiter"

const { ccclass, property } = cc._decorator;
declare global {
    interface Window {
        winSize: any
    }
}
/**
 * 全局控制
 */

@ccclass
export default class MainManager extends cc.Component {

    static instance: MainManager = null

    onLoad() {
        MainManager.instance = this
        this.setDesignResolution()

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

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

    startGame() {
        MainUIManager.instance.init();
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                // console.log("right arrow pressed");
                Emitter.fire("rightArrowDown");
                break;
            case cc.macro.KEY.left:
                // console.log("left arrow pressed");
                Emitter.fire("leftArrowDown");
                break;
            case cc.macro.KEY.up:
                // console.log("up arrow pressed");
                Emitter.fire("upArrowDown");
                break;
            case cc.macro.KEY.down:
                // console.log("down arrow pressed");
                Emitter.fire("downArrowDown");
                break;
            // case cc.macro.KEY.a:
            //     // Emitter.fire("standStill");
            //     Emitter.fire("fireBullet");
            //     break;
            // case cc.macro.KEY.r:
            //     Emitter.fire("reload");
            //     break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                // console.log("right arrow pressed");
                Emitter.fire("rightArrowUp");
                break;
            case cc.macro.KEY.left:
                // console.log("left arrow pressed");
                Emitter.fire("leftArrowUp");
                break;
            case cc.macro.KEY.up:
                // console.log("up arrow pressed");
                Emitter.fire("upArrowUp");
                break;
            case cc.macro.KEY.down:
                // console.log("down arrow pressed");
                Emitter.fire("downArrowUp");
                break;
    }

}