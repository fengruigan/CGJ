import { WayPoint } from "../interface/way_point";
import WayPointItem from "../item/way_point_item";

const { ccclass, property } = cc._decorator;
declare global {
    interface Window {
        winSize: any
    }
}
/**
 * 全局控制
 */

@ccclass
export default class WayPointManager extends cc.Component {

    static instance: WayPointManager = null

    wayPointData: WayPoint[] = []

    onLoad() {
        this.wayPointData = []
        WayPointManager.instance = this
        this.init()
    }
    init() {
        // let nodes: cc.Node[] = []
        // for (let i = 0; i < nodes.length; i++) {
        //     let wayPointScript = nodes[i].getComponent(WayPointItem)
        //     wayPointScript.index = i
        // }
        // for (let i = 0; i < nodes.length; i++) {
        //     let wayPointScript = nodes[i].getComponent(WayPointItem)
        //     let data: WayPoint = { pos: nodes[i].getPosition(), around: [], index: i }
        //     for (let j = 0; j < wayPointScript.aroundPointNode.length; j++) {
        //         let aroundPointScript = nodes[j].getComponent(WayPointItem)
        //         data.around.push(aroundPointScript.index)
        //     }
        //     this.wayPointData.push(data)
        // }
        // 测试
        this.wayPointData = [
            { pos: cc.v2(0, 0), around: [2, 1], index: 0 },
            { pos: cc.v2(0, 0), around: [0, 2], index: 1 },
            { pos: cc.v2(0, 0), around: [0, 1], index: 2 }
        ]

        setTimeout(() => {
            this.findWay(0)
        }, 1000);
    }
    //蚂蚁最终要接近玩家
    //蚂蚁会出现在裂缝
    //被箱子堵住的裂缝会慢慢被蚂蚁攻击
    //蚂蚁从裂缝中走出来之后会按照裂缝分配的路径点过去，如果被箱子阻碍会攻击箱子
    //蚂蚁走到路径点之后会搜索离玩家最近的路径点并且寻路过去
    //蚂蚁每经过一个路径点会重新搜索玩家的地点
    //如果蚂蚁已经到达玩家最近的一个路径点 会直接冲向玩家
    //如果移动期间蚂蚁受到任何来自墙或者箱子的阻碍 系统会判断如果回到上一个路径点之后是否有其他路线到达玩家身边 
    //如果无法回到上一个路径点或者没有其他路线到达玩家或者上一个路径点已经是离玩家最近的路径点 蚂蚁会攻击最近的箱子
    //攻击完箱子之后蚂蚁会继续判断能否回到上一个路径点 持续上述步骤
    findWay(curIndex) {
        //找到一条通往玩家最近路径点的路
        let target = this.findPlayerNearPoint() as WayPoint
        let cur = this.wayPointData[curIndex]
        // let ways = [...]
        this.wayPointFind(cur, target.index, [cur.index])
        //  console.log('找到路径', ways)
    }
    findPlayerNearPoint() {
        return { pos: cc.v2(0, 0), around: [0, 1], index: 2 }
    }
    wayPointFind(cur: WayPoint, target: number, way) {
        console.log('当前寻路', cur, target, way)
        if (cur.index == target) {
            console.log('找到路:', way)
            return
        } else {
            let newWay = JSON.parse(JSON.stringify(way))
            for (let i = 0; i < cur.around.length; i++) {
                console.log('当前循环', i)
                if (way.some(item => { return item == cur.around[i] })) {
                    console.log('走了经过的路', way, cur.around[i])
                    continue
                } else {
                    WayPointManager.instance.wayPointFind(this.wayPointData[cur.around[i]], target, [...way, cur.around[i]])
                }
            }
        }
    }

    // wayPointFind(cur: WayPoint, target: WayPoint, way) {
    //     let queue: WayPoint[] = [];
    //     queue.push(cur)
    //     let step: number = 0
    //     while (queue.length != 0) {
    //         // search by level
    //         let size = queue.length;
    //         for (let i = 0; i < size; i++) {
    //             let curPoint = queue.shift();
    //             if (curPoint.index == target.index) {
    //                 console.log('找到路:', way)
    //                 console.log("found in " + String(step) + " steps")
    //             }
    //             step += 1;
    //             for (let j = 0; j < curPoint.around.length; j++) {
    //                 if (way.some(item => {
    //                     return item == curPoint.around[j]
    //                 })) {
    //                     console.log('走了经过的路', way)
    //                 } else {
    //                     this.wayPointFind(this.wayPointData[curPoint.around[j]], target, queue)
    //                     //  queue.push(this.wayPointData[curPoint.around[j]])
    //                 }
    //             }
    //         }
    //     }
    // }
}