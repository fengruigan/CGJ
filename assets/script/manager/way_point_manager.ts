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
    }
    init() {
        let nodes: cc.Node[] = []
        for (let i = 0; i < nodes.length; i++) {
            let wayPointScript = nodes[i].getComponent(WayPointItem)
            wayPointScript.index = i
        }
        for (let i = 0; i < nodes.length; i++) {
            let wayPointScript = nodes[i].getComponent(WayPointItem)
            let data: WayPoint = { pos: nodes[i].getPosition(), around: [], index: i }
            for (let j = 0; j < wayPointScript.aroundPointNode.length; j++) {
                let aroundPointScript = nodes[j].getComponent(WayPointItem)
                data.around.push(aroundPointScript.index)
            }
            this.wayPointData.push(data)
        }
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
        let target = this.findPlayerNearPoint()
    }
    findPlayerNearPoint() {
        return {}
    }

}