import { GameStatus } from "../utils/enum"
import MainUIManager from "../ui/main_ui_manager";
import FailUIManager from "../ui/fail_ui_manager";
import AudioManager from "./audio_manager"
import WinUIManager from "../ui/win_ui_manager";
import UIManager from "./ui_manager";
import config from "../../config";
import PoolManager from "./pool_manager";
import { Emitter } from "../utils/emmiter"
import { Utils } from "../utils/utils";

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
    @property(cc.Integer)
    monsterSpawnRate: number = 1  // number of monsters per second

    onLoad() {
        MainManager.instance = this;
        this.setDesignResolution();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.director.getCollisionManager().enabled = true;
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
        var interval = 200;  // trigger interval for spawning monsters (unit: millisecond)
        setInterval( () =>{
            var spawnChance = Utils.getRandomNumber(100);
            if (spawnChance < Math.round(this.monsterSpawnRate * 100 * interval / 1000)) {
                var side = Utils.getRandomNumber(1);
                if (side === 1) {
                    MainUIManager.instance.createMonster("right");
                } else if (side === 0) {
                    MainUIManager.instance.createMonster("left");
                }
            }
        }, interval)

    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                // console.log("right arrow pressed");
                Emitter.fire("moveRight");
                // this.player.moveRight();
                break;
            case cc.macro.KEY.left: 
                // console.log("left arrow pressed");
                Emitter.fire("moveLeft");
                // this.player.moveLeft();
                break;
            case cc.macro.KEY.a:
                // Emitter.fire("standStill");
                Emitter.fire("fireBullet");
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case cc.macro.KEY.right:
                Emitter.fire("standStill");
                // this.player.onStay();
            case cc.macro.KEY.left:
                // this.player.onStay();
                Emitter.fire("standStill");
        }
    }

    onWin() {
        // FailUIManager.instance.node.active = true;
        UIManager.instance.openUI(WinUIManager, { name: config.uiName.winPage })
    }

    onFail() {
        // FailUIManager.instance.node.active = true;
        UIManager.instance.openUI(FailUIManager, { name: config.uiName.failPage })
    }
}