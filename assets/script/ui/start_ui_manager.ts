import MainManager from "../manager/main_manager"


const {ccclass, property} = cc._decorator;

@ccclass
export default class StartUIManager extends cc.Component {

    static instance: StartUIManager = null;
    @property(cc.Node)
    content: cc.Node = null;
    @property(cc.Node)
    startBtn: cc.Node = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        StartUIManager.instance = this;
        this.content.active = true;
        this.startBtn.on('click', this.onGameStart, this);
        // console.log('start loaded')
    }

    onGameStart () {
        this.content.active = false;
        MainManager.instance.startGame();
    }
}
