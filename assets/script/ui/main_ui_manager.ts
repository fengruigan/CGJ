

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainUIManager extends cc.Component {
    static instance: MainUIManager = null; 

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        MainUIManager.instance = this;
    }

    init() {}

    

    // update (dt) {}
}
