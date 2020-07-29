
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
    }
    bindEvent() {
        //this.restartBtn.node.on('click', () => { }, this)
    }

    showUI() {
        this.node.active = true
    }
}
