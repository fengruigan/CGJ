import MainManager from "../manager/main_manager"
import { Emitter } from "../utils/emmiter";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FailUIManager extends cc.Component {

    static instance: FailUIManager = null;

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Button)
    restartBtn: cc.Button = null
    onLoad() {
        FailUIManager.instance = this;
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
