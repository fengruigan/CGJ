
const {ccclass, property} = cc._decorator;

@ccclass
export default class WinUIManager extends cc.Component {

    static instance: WinUIManager = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        WinUIManager.instance = this;
        this.node.active = false;
    }

    onFail() {
        this.node.active = true;
    }

    // update (dt) {}
}
