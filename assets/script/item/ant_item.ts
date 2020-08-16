import WayPointItem from "./way_point_item";
import { Emitter } from "../utils/emmiter";
import PlayerItem from "./player_item";
import { WayPoint } from "../interface/way_point";
import WayPointManager from "../manager/way_point_manager";
import MainManager from "../manager/main_manager";
import { GameStatus } from "../utils/enum";
import PoolManager from "../manager/pool_manager";
import BulletItem from "./bullet_item";
import JsonManager from "../manager/json_manager";
import { Utils } from "../utils/utils";
import config from "../../config";
import AudioManager from "../manager/audio_manager";
import HeadItem from "./head_item"

const { ccclass, property } = cc._decorator;

@ccclass
export default class AntItem extends cc.Component {

    // testing
    speed: number = -50;
    heading: cc.Vec2 = cc.Vec2.ZERO;
    // player: PlayerItem = null;

    lastWayPoint: WayPoint = null
    isDie: boolean = false
    _hp: number = null
    _freeze: boolean = false
    @property(HeadItem)
    head: HeadItem = null
    @property(cc.Sprite)
    sp: cc.Sprite = null
    get freeze() {
        return this._freeze
    }
    set freeze(val: boolean) {
        this._freeze = val
        this.sp.node.color = val ? new cc.Color(0, 224, 255) : cc.Color.WHITE
    }
    @property(cc.Node)
    spNode: cc.Node = null
    @property(cc.ProgressBar)
    hpProgress: cc.ProgressBar = null
    set hp(val: number) {
        this._hp = val
        this.hpProgress.progress = val / JsonManager.instance.getConfig('antHp')
        if (val <= 0) {
            this.isDie = true
            let ani = cc.tween(this.node).to(1, { scaleY: 0 }, null).call(() => {
                PoolManager.instance.removeObjectByName('antItem', this.node)
            }).start()
        }
    }
    get hp() {
        return this._hp
    }
    onLoad() {
        // WayPointManager.instance.findWay(this.node.position, this.getFindWay.bind(this))
        // setTimeout(() => {
        //     this.heading = this.node.position.sub(WayPointManager.instance.player.node.getPosition()).normalize()
        // });
        setInterval(() => {

        }, 3000)
    }
    init(pos: cc.Vec2) {
        this.sp.node.color = cc.Color.WHITE
        this.hp = JsonManager.instance.getConfig('antHp')
        this.node.scaleY = 1
        this.node.setPosition(pos.x, pos.y - 50)
        this.isDie = false
        this.freeze = false
        let configSpd = JsonManager.instance.getConfig('antSpeed')
        this.speed = -configSpd[0] + Utils.getRandomNumber(configSpd[1]) - 10
        //   WayPointManager.instance.findWay(this.node.position, this.getFindWay.bind(this))
    }
    freezeTimer: any = null
    antFreeze() {
        clearInterval(this.freezeTimer)
        this.freeze = true
        this.freezeTimer = setTimeout(() => {
            this.freeze = false
        }, 3000);
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
    // change to wayPoint method
    // constant running towards player
    update(dt) {
        if (MainManager.instance.gameStatus == GameStatus.start && !this.isDie) {
            this.heading = this.node.position.sub(WayPointManager.instance.player.node.getPosition())
            // let distToPlayer = Math.sqrt(this.heading.x * this.heading.x + this.heading.y * this.heading.y)
            let distToPlayer = this.heading.mag()
            this.heading = this.heading.normalize()
            this.node.x += this.heading.x * this.speed * dt * (this.freeze ? 0.75 : 1)
            this.node.y += this.heading.y * this.speed * dt * (this.freeze ? 0.75 : 1)
            this.spNode.angle = (this.heading.y > 0 ? 1 : -1) * this.heading.angle(cc.v2(1, 0)) * 180 / Math.PI + 90
            this.head.node.angle = this.spNode.angle
            let headOffsetY = -30 * (this.heading.y > 0 ? 1 : -1) * Math.sin(this.heading.angle(cc.v2(1,0)))
            let headOffsetX = -30 * Math.cos(this.heading.angle(cc.v2(1,0)))
            this.head.node.x = headOffsetX
            this.head.node.y = headOffsetY
            // warning if distance is lower than 150
            if (distToPlayer <= 150) {
                Emitter.fire('warning');
            }
        }
    }

    onCollisionEnter(other, self) {
        if (this.isDie) return
        if (other.node.name == "bulletItem") {
            //被子弹射中
            other.node.getComponent(BulletItem).onRemove()
            //       PoolManager.instance.removeObjectByName('bulletItem', other.node)
            this.hp -= JsonManager.instance.getDataByName('tower')[1]['damage']
        } else if (other.node.name == 'player') {
            AudioManager.instance.playAudio('蚂蚁咬人')
            PoolManager.instance.removeObjectByName('antItem', this.node)
        }
    }
    onCollisionStay(other, self) {
        if (other.node.name == "boxItem") {
            //判断角度往哪个方向阻挡 
            let angle = other.node.getPosition().sub(self.node.getPosition()).angle(cc.v2(1, 0)) * 180 / Math.PI
            if (angle > 45 && angle < 135) {
                if (this.node.y - other.node.y < other.node.height / 2 + this.node.height / 2) {
                    if (this.node.y < other.node.y) {
                        this.node.y = other.node.y - other.node.height / 2 - this.node.height / 2
                    } else {
                        this.node.y = other.node.y + other.node.height / 2 + this.node.height / 2
                    }
                }
            } else {
                if (this.node.x - other.node.x < other.node.width / 2 + this.node.width / 2) {
                    if (this.node.x < other.node.x) {
                        this.node.x = other.node.x - other.node.width / 2 - this.node.width / 2
                    } else {
                        this.node.x = other.node.x + other.node.width / 2 + this.node.width / 2
                    }
                }
            }
        }
    }
}