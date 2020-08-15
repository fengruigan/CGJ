import MainManager from "../manager/main_manager"

const {ccclass, property} = cc._decorator;

@ccclass
export default class StartUIManager extends cc.Component {
    static instance: StartUIManager = null;

    @property(cc.Button)
    startBtn: cc.Button = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        StartUIManager.instance = this;
        this.startBtn.node.on('click', this.onGameStart, this)
    }

    onGameStart() {
        this.node.active = false;
        MainManager.instance.startGame();
    }

    // update (dt) {}
}
