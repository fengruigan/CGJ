import WayPointItem from "./way_point_item";
import { Emitter } from "../utils/emmiter";
import PlayerItem from "./player_item";
import { WayPoint } from "../interface/way_point";
import WayPointManager from "../manager/way_point_manager";
import MainManager from "../manager/main_manager";
import { GameStatus } from "../utils/enum";
import PoolManager from "../manager/pool_manager";
import MainUIManager from "../ui/main_ui_manager";

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
        Emitter.register("pickUp", this.pickUp.bind(this), this)
    }
    canTouchGroup: cc.Node[] = []
    targetItem: cc.Node = null
    showTouchTarget() {
        this.targetItem = null
        this.canTouchGroup.map(item => { item.opacity = 255 })
        if (this.canTouchGroup.length > 0) {
            //寻找最近的
            for (let i = 0; i < this.canTouchGroup.length; i++) {
                if (i == 0) {
                    this.targetItem = this.canTouchGroup[i]
                } else {
                    if (this.targetItem.position.sub(MainUIManager.instance.player.node.position).mag() > this.canTouchGroup[i].position.sub(MainUIManager.instance.player.node.position).mag()) {
                        this.targetItem = this.canTouchGroup[i]
                    }
                }
            }
        }
        if (this.targetItem) {
            this.targetItem.opacity = 200
        }
    }
    pickUp() {
        if (this.node.children.length == 0) {
            if (this.targetItem) {
                this.targetItem.parent = this.node
                this.targetItem.setPosition(0, 0)
                this.targetItem.getComponent(cc.BoxCollider).enabled = false

            }
        } else if (this.node.children.length == 1) {
            this.node.children[0].setPosition(MainUIManager.instance.player.node.x - 50 * MainUIManager.instance.player.node.scaleX, MainUIManager.instance.player.node.y - 30)
            this.node.children[0].getComponent(cc.BoxCollider).enabled = true
            this.node.children[0].parent = this.node.children[0].name == 'boxItem' ? MainUIManager.instance.boxParent : MainUIManager.instance.bulletParent
        }
    }

    onCollisionEnter(other, self) {
        if (other.node.name == "boxItem") {
            this.canTouchGroup.push(other.node)
        } else if (other.node.name == 'turrentItem') {
            this.canTouchGroup.push(other.node)
        }
        this.showTouchTarget()
    }
    onCollisionStay(other, self) {
        this.showTouchTarget()
    }
    onCollisionExit(other, self) {
        other.node.opacity = 255
        if (other.node.name == "boxItem") {
            //判断角度往哪个方向阻挡 
            this.canTouchGroup.splice(this.canTouchGroup.indexOf(other.node), 1)
        } else if (other.node.name == 'turrentItem') {
            this.canTouchGroup.splice(this.canTouchGroup.indexOf(other.node), 1)
        }
        this.showTouchTarget()
    }
}