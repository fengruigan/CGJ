import { GameStatus } from "../utils/enum"
import Player from "../actor/player"
import MainManager from "../manager/main_manager";
import { Utils } from "../utils/utils";
import PoolManager from "../manager/pool_manager";
import Zergling from "../actor/zergling";
import Bullet from "../actor/bullet";

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
    bulletContainer: cc.Node = null
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
    createMonster(side: string="right") {
        let monster = PoolManager.instance.createObjectByName('zergling', this.monsterContainer);
        monster.getComponent(Zergling).init(side);
    }

    createBullet() {
        let bullet = PoolManager.instance.createObjectByName('bullet', this.bulletContainer);
        bullet.getComponent(Bullet).init(this.player.node.scaleX, this.player.node.x);
    }

}
