import { Emitter } from "../utils/emmiter";
import MainManager from "../manager/main_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WinUIManager extends cc.Component {

    static instance: WinUIManager = null;

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Button)
    restartBtn: cc.Button = null
    onLoad() {
        WinUIManager.instance = this;
        this.node.active = false
        this.bindEvent()
        Emitter.register('restart', ()=> {
            this.node.active = false;
        }, this)
    }
    bindEvent() {
        this.restartBtn.node.on('click', () => { 
            MainManager.instance.onRestart();
         }, this)
    }

    showUI() {
        this.node.active = true
    }
}
