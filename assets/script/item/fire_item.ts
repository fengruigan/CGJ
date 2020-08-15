import { Emitter } from "../utils/emmiter";
import MainUIManager from "../ui/main_ui_manager";
import PoolManager from "../manager/pool_manager";
import BulletItem from "./bullet_item";
import MainManager from "../manager/main_manager";
import { GameStatus } from "../utils/enum";
import { Utils } from "../utils/utils";
import AntItem from "./ant_item";
import JsonManager from "../manager/json_manager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class FireItem extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.ParticleSystem)
    firePartic: cc.ParticleSystem = null
    range: number = 150
    onLoad() {
        this.init()
    }
    attTimer: any = null
    init() {
        clearInterval(this.attTimer)
        let range = JsonManager.instance.getConfig('itemGenerateRange')
        let anchor = JsonManager.instance.getConfig('playerPosition')
        this.node.x = Utils.getRandomNumber(range[0]) - range[0] / 2 + anchor[0]
        this.node.y = Utils.getRandomNumber(range[1]) - range[1] / 2 + anchor[1]
        this.range = JsonManager.instance.getDataByName('tower')[2]['range1']

        this.attTimer = setInterval(() => {
            if (MainManager.instance.gameStatus == GameStatus.start && this.node.getComponent(cc.BoxCollider).enabled && this.node.parent == MainUIManager.instance.towerParent) {
                let group = this.findAllAnt()
                if (group.length > 0) {
                    // this.firePartic.resetSystem()
                    //TODO喷火
                    group.map(item => {
                        item.getComponent(AntItem).hp -= JsonManager.instance.getDataByName('tower')[2].damage
                    })
                }
            }
        }, 1000)
    }
    findAllAnt() {
        let group: cc.Node[] = []
        for (let i = 0; i < MainUIManager.instance.antParent.children.length; i++) {
            let antNode = MainUIManager.instance.antParent.children[i]
            let mag = antNode.position.sub(this.node.position).mag()
            if (mag < this.range && !antNode.getComponent(AntItem).isDie) {
                group.push(antNode)
            }
        }
        return group
    }

    // update (dt) {}
}
