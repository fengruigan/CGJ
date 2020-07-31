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
    // @property(cc.Integer)
    time: number = 60;
    // @property(cc.Integer)
    monsterSpawnRate: number = 2  // monsterSpawnRate * 10% = % chance of spawning a monster per second
    spawnTimer: any = null
    speedBoostTimer: any = null 
    survivalTimer: any = null

    status: GameStatus = GameStatus.pause;
    onLoad() {
        MainManager.instance = this;
        this.setDesignResolution();

        // give cushion time for AudioManager to load
        setTimeout(() => {
            AudioManager.instance.playBGMByID(0)
        }, 100)

        // Keyboard event listener
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // turn on collision manager
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
        // init
        MainUIManager.instance.init();
        this.time = 60
        if (Utils.getRandomNumber(1) === 1){
            AudioManager.instance.playAudio("TMaPss01")
        } else {
            AudioManager.instance.playAudio("marine-start")
        }
        this.status = GameStatus.running;
        var interval = 100;
        
        // spawnTimer for spawning monsters
        this.spawnTimer = setInterval(() => {
            if (this.status == GameStatus.running) {
                var spawnChance = Utils.getRandomNumber(100);
                if (spawnChance < Math.round(this.monsterSpawnRate * 100 * interval / 1000)) {
                    var side = Utils.getRandomNumber(1);
                    if (side === 1) {
                        MainUIManager.instance.createMonster("right");
                    } else if (side === 0) {
                        MainUIManager.instance.createMonster("left");
                    }
                }
            }
        }, interval)

        // set zergling speed boost
        this.speedBoostTimer = setInterval( ()=>{
            if (this.status === GameStatus.running){
                Emitter.fire('speedUp');
                AudioManager.instance.playAudio('gogogo')
            }
        }, 30000)

        // survival timer
        this.survivalTimer = setInterval(() => {
            if (this.status === GameStatus.running){
                if (this.time > 0) {
                    this.time -= 1;
                } else {
                    this.onWin();
                }
            }
        }, 1000)
    }

    onKeyDown(event) {
        if (this.status == GameStatus.running) {
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
                case cc.macro.KEY.r:
                    Emitter.fire("reload");
                    break;
            }
        }
    }

    onKeyUp(event) {
        if (this.status == GameStatus.running) {
            switch (event.keyCode) {
                case cc.macro.KEY.right:
                    Emitter.fire("standStill");
                // this.player.onStay();
                case cc.macro.KEY.left:
                    // this.player.onStay();
                    Emitter.fire("standStill");
            }
        }
    }

    onWin() {
        if (this.status == GameStatus.running) {
            AudioManager.instance.playAudio('yay');
            Emitter.fire('win')
            UIManager.instance.openUI(WinUIManager, { name: config.uiName.winPage });
            this.status = GameStatus.pause
        }
    }

    audioInterval: any = null
    onFail() {
        if (this.status == GameStatus.running) {
            AudioManager.instance.playAudio('marine-death')
            this.audioInterval = setInterval( ()=> {
                AudioManager.instance.playAudio('zergling-growl')
            }, 3000)
            Emitter.fire('fail')
            UIManager.instance.openUI(FailUIManager, { name: config.uiName.failPage })
            this.status = GameStatus.pause
        }
    }

    onRestart() {
        Emitter.fire("restart");
        clearInterval(this.spawnTimer);
        clearInterval(this.survivalTimer);
        clearInterval(this.audioInterval);
        clearInterval(this.speedBoostTimer);
        this.startGame();
    }
}