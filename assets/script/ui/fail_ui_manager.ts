
const {ccclass, property} = cc._decorator;

@ccclass
export default class FailUIManager extends cc.Component {

    static instance: FailUIManager = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        FailUIManager.instance = this;
        this.node.active = false;
    }

    onFail() {
        this.node.active = true;
    }

    // update (dt) {}
}