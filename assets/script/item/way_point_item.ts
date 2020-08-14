const { ccclass, property } = cc._decorator;

@ccclass
export default class WayPointItem extends cc.Component {

    @property(WayPointItem)
    aroundPointNode: WayPointItem[] = []

    index: number
    onLoad() {

    }
}