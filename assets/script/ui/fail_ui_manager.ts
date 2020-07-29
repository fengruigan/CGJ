
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
    }
    bindEvent() {
        // this.restartBtn.node.on('click', () => { }, this)
    }
    showUI() {
        this.node.active = true
    }

}