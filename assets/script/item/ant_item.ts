import WayPointItem from "./way_point_item";
import { Emitter } from "../utils/emmiter";
import PlayerItem from "./player_item";
import { WayPoint } from "../interface/way_point";
import WayPointManager from "../manager/way_point_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AntItem extends cc.Component {

    // testing
    speed: number = -50;
    heading: cc.Vec2 = cc.Vec2.ZERO;
    // player: PlayerItem = null;

    lastWayPoint: WayPoint = null

    onLoad() {
        // WayPointManager.instance.findWay(this.node.position, this.getFindWay.bind(this))
        // setTimeout(() => {
        //     this.heading = this.node.position.sub(WayPointManager.instance.player.node.getPosition()).normalize()
        // });
    }
    init() {
        //   WayPointManager.instance.findWay(this.node.position, this.getFindWay.bind(this))
    }
    // findWayTimer: any = null
    // findWayCB: Function = null
    // ways: any[] = []
    // getFindWay(way: any[]) {
    //     if (way != null) this.ways.push(way)
    //     clearTimeout(this.findWayTimer)
    //     this.findWayTimer = setTimeout(() => {
    //         console.log('找到路径', this.ways)
    //         if (this.ways.length == 0) {

    //         }
    //     }, 500);
    // }
    /**
     * 获取方向
     */
    getArr() {
        //WayPointManager.instance.getArr()
    }
    setArr(arr: cc.Vec2) {
        this.heading = this.node.position.sub(arr).normalize()
    }
    // change to wayPoint method
    // constant running towards player
    update(dt) {
        this.heading = this.node.position.sub(WayPointManager.instance.player.node.getPosition()).normalize()
        this.node.x += this.heading.x * this.speed * dt
        this.node.y += this.heading.y * this.speed * dt
    }

    onCollisionEnter(other, self) {
        if (other.node.name == "bullet") {
            //被子弹射中
        }
    }
    onCollisionStay(other, self) {
        if (other.node.name == "box") {
            //判断角度往哪个方向阻挡 
            let angle = other.node.getPosition().sub(self.node.getPosition()).angle(cc.v2(1, 0)) * 180 / Math.PI
            console.log('角度', angle)
            if (angle > 45 && angle < 135) {
                if (this.node.y - other.node.y < other.node.height / 2 + this.node.height / 2) {
                    if (this.node.y < other.node.y) {
                        this.node.y = other.node.y - other.node.height / 2 - this.node.height / 2 - 1
                    } else {
                        this.node.y = other.node.y + other.node.height / 2 + this.node.height / 2 + 1

                    }
                }
            } else {
                if (this.node.x - other.node.x < other.node.width / 2 + this.node.width / 2) {
                    if (this.node.x < other.node.x) {
                        this.node.x = other.node.x - other.node.width / 2 - this.node.width / 2 - 1
                    } else {
                        this.node.x = other.node.x + other.node.width / 2 + this.node.width / 2 + 1
                    }
                }

            }

        }
    }
}