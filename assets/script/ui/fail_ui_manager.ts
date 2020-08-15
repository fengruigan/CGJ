import MainUIManager from "./main_ui_manager";
import MainManager from "../manager/main_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FailUIManager extends cc.Component {

    static instance: FailUIManager = null;

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Button)
    restartBtn: cc.Button = null
    onLoad() {
        FailUIManager.instance = this;

        this.restartBtn.node.on('click', () => {
            FailUIManager.instance.restart()
        }, this)
        this.node.active = false;
    }
    restart() {
        this.node.active = false
        MainManager.instance.startGame()
    }
    onFail() {
        this.node.active = true;
    }

    // update (dt) {}
}
