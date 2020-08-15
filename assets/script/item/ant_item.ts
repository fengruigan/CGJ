import WayPointItem from "./way_point_item";
import { Emitter } from "../utils/emmiter";
import PlayerItem from "./player_item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AntItem extends cc.Component {

    // testing
    // speed: number = -50;
    // heading: cc.Vec2 = cc.Vec2.ZERO;
    // player: PlayerItem = null;

    @property(WayPointItem)
    lastWayPoint: WayPointItem = null
    onLoad() {
        // testing
        // this.player = cc.find("Canvas/gamePage/player").getComponent(PlayerItem)
    }
    // init() {

    // }

    // change to wayPoint method
    // constant running towards player
    // update(dt) {
    //     this.heading = this.node.position.sub(this.player.node.getPosition()).normalize()
    //     this.node.x += this.heading.x * this.speed * dt
    //     this.node.y += this.heading.y * this.speed * dt
    // }
}