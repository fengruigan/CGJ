import { GameStatus } from "../utils/enum"
import Player from "../actor/player"
import MainManager from "../manager/main_manager";
import { Utils } from "../utils/utils";
import PoolManager from "../manager/pool_manager";
import Zergling from "../actor/zergling";
import Bullet from "../actor/bullet";
import Flash from "../actor/flash";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainUIManager extends cc.Component {

    static instance: MainUIManager = null;

    @property(Player)
    player: Player = null;
    @property(cc.Node)
    timer: cc.Node = null;
    @property(cc.Node)
    ammoCount: cc.Node = null;

    @property(cc.Node)
    monsterContainer: cc.Node = null
    @property(cc.Node)
    bulletContainer: cc.Node = null
    status = 0;

    onLoad() {
        MainUIManager.instance = this;
        this.player.node.setPosition(0, -135);
        this.timer.getComponent(cc.Label).string = "Survive for: " + Utils.getTimeFormat(MainManager.instance.time);
        this.ammoCount.getComponent(cc.Label).string = "Ammo left: " + String(this.player.magazineSize);
    }

    init() {
        this.status = GameStatus.running;
        this.player.node.setPosition(0, -135);
    }

    onWin() {
        this.status = GameStatus.pause;
    }

    onFail() {
        this.status = GameStatus.pause;
    }

    createMonster(side: string="right") {
        let monster = PoolManager.instance.createObjectByName('zergling', this.monsterContainer);
        monster.getComponent(Zergling).init(side);
    }

    createBullet() {
        let bullet = PoolManager.instance.createObjectByName('bullet', this.bulletContainer);
        bullet.getComponent(Bullet).init(this.player.node.scaleX, this.player.node.x, this.player.playerStatus);
    }

    createMuzzleFlash() {
        let flash = PoolManager.instance.createObjectByName('flash', this.bulletContainer);
        flash.getComponent(Flash).init(this.player.node.scaleX, this.player.node.x, this.player.playerStatus);
    }

    update(dt) {
        if (this.status == GameStatus.running) {
            this.timer.getComponent(cc.Label).string = "Survive for: " + Utils.getTimeFormat(MainManager.instance.time);
            this.ammoCount.getComponent(cc.Label).string = "Ammo left: " + String(this.player.ammunition);
        }
    }
}
