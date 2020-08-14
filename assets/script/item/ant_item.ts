import WayPointItem from "./way_point_item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AntItem extends cc.Component {

    @property(WayPointItem)
    lastWayPoint: WayPointItem = null
    onLoad() {

    }
    init() {

    }
}