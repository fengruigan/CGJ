
const {ccclass, property} = cc._decorator;

@ccclass
export default class FailUIManager extends cc.Component {

    static instance: FailUIManager = null;
    @property(cc.Node)
    winPage: cc.Node = null
    @property(cc.Node)
    failPage: cc.Node = null

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        FailUIManager.instance = this;
        this.winPage.active = false;
        this.failPage.active = false;
    }

}
