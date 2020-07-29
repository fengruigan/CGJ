import { GameStatus } from "../utils/enum"
import Player from "../actor/player"
import MainManager from "../manager/main_manager";
import { Utils } from "../utils/utils";
import PoolManager from "../manager/pool_manager";
import Zergling from "../actor/zergling";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUIManager extends cc.Component {

    static instance: MainUIManager = null;
    // emitter: Emitter = null;

    @property(Player)
    player: Player = null;
    // @property(cc.Label)
    // label: cc.Label = null;

    @property(cc.Node)
    monsterContainer: cc.Node = null
    @property(cc.Node)
    bulContainer: cc.Node = null
    status = 0;

    onLoad() {
        MainUIManager.instance = this;
        this.player.node.setPosition(0, -135);
    }

    init() {
        // this.label.node.active = true;
        // this.label.string = Utils.getTimeFormat(MainManager.instance.time);
        this.status = GameStatus.running;
    }
    createMonster(arr: boolean = true) {
        let mosnter = PoolManager.instance.createObjectByName('zergling', this.monsterContainer)
        mosnter.getComponent(Zergling).init(arr)
    }

    // createBullet() {

    // }

}
