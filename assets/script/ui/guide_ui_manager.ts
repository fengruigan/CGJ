import GuideManager from "../manager/guide_manager";

/**
 * 
 * @dec template文件 需要则复制
 */
const { ccclass, property } = cc._decorator;

@ccclass
export default class GuideUIManager extends cc.Component {

    static instance: GuideUIManager = null
    @property(cc.Node)
    content: cc.Node = null
    @property(cc.Node)
    targetNode: cc.Node = null
    @property(cc.Node)
    tipNode: cc.Node = null
    @property(cc.Button)
    target: cc.Button = null

    @property(cc.Label)
    btnLabel: cc.Label = null
    @property(cc.Label)
    tipLabel: cc.Label = null
    onLoad() {
        GuideUIManager.instance = this
        this.bindEvent()
        this.targetNode.active = false
        this.tipNode.active = false

    }
    bindEvent() {
        this.target.node.on('click', this.onNext, this)
    }
    cb: Function = null
    initUI(data) {
        this.content.active = true
        this.targetNode.active = false
        this.tipNode.active = false
        if (data.type == 0) {
            this.targetNode.active = true
            this.btnLabel.string = data.str
            this.targetNode.setPosition(data.pos)
        } else if (data.type == 1) {
            this.tipNode.active = true
            this.tipLabel.string = data.str
        }
    }
    onNext() {
        this.cb()
        this.hideUI()
        GuideManager.instance.nextGuide()
    }
    showUI() {
        this.content.active = true
    }
    hideUI() {
        this.content.active = false
    }
}

