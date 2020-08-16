import MainUIManager from "./main_ui_manager";
import MainManager from "../manager/main_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FailUIManager extends cc.Component {

    static instance: FailUIManager = null;

    // LIFE-CYCLE CALLBACKS:
    @property(cc.Button)
    restartBtn: cc.Button = null

    @property(cc.Node)
    successNode: cc.Node = null
    @property(cc.Label)
    successLabel: cc.Label = null
    @property(cc.Node)
    failNode: cc.Node = null
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
        this.failNode.active = true
        this.successNode.active = false
    }
    onSuccess(isReal) {
        this.node.active = true;
        this.failNode.active = false
        this.successNode.active = true
        this.successLabel.string = isReal ? '莉莉丝用箱子堵上了最后一个裂缝，长长地舒了一口气，坐在了椅子上。逃过一劫了呢，莉莉丝如是想到，难得的空闲让莉莉丝居然出现了一丝迷茫，希望一切安好吧。莉莉丝呆呆地看着被箱子堵上的裂缝，看着裂缝中慢慢渗入的绿色气体，眼中的世界渐渐失去色彩。。。' : '莉莉丝推开门，城市已是满目疮痍，到处都是蚂蚁的撕咬声和人们的惨叫声。突然，莉莉丝听到了电流声，不远处有一个士兵的尸体，电流声从对讲机中传了出来，莉莉丝将对讲机捡起，里面传出了一个中年男子的声音：“各单位注意，各单位注意，穿上防化服，M城清理计划即将开始，再重复一遍。。。”，莉莉丝抬头，数架飞机正朝M城飞来。。。'
    }
    // update (dt) {}
}
