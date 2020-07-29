import { GameStatus } from "../utils/enum"
import MainUIManager from "../ui/main_ui_manager";
import FailUIManager from "../ui/fail_ui_manager";
import AudioManager from "./audio_manager"

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

    static instance: MainManager = null;

    // Game timer duration
    @property(cc.Integer)
    time: number = 120;

    onLoad() {
        MainManager.instance = this;
        this.setDesignResolution();
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
        // AudioManager.instance.playBGMByID(0)
        MainUIManager.instance.init();
        // timer()
    }

    onWin() {
        // FailUIManager.instance.node.active = true;
        FailUIManager.instance.winPage.active = true;
    }

    onFail() {
        // FailUIManager.instance.node.active = true;
        FailUIManager.instance.failPage.active = true;
    }
}