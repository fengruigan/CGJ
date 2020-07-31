import ResourceManager from "../manager/resouce_manager";
import config from "../../config";
import PoolManager from "../manager/pool_manager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {


    speed: number = 1500;

    // onLoad () {}

    update (dt) {
        // destory on edge
        if (this.node.x >= 600 || this.node.x <= -600) {
            this.putInPool();
        }
        this.node.x += this.speed * dt;
    }

    init(playerFacing: number, playerPos: number, playerStatus: number) {
        if (playerStatus === 2 || playerStatus === 3 ) {
            this.node.y = 10;
        } else {
            this.node.y = 0;
        }
        this.speed = playerFacing * 1500
        this.node.scaleX = -playerFacing
        this.node.x = playerPos + playerFacing * 30;
    }

    putInPool() {
        PoolManager.instance.removeObjectByName("bullet", this.node)
    }
}
