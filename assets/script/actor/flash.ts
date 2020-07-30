import PoolManager from "../manager/pool_manager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Flash extends cc.Component {

    // @property(cc.Integer)
    lifetime = 100; // number of milliseconds
    xOffset = 50;
    // onLoad () {}

    update (dt) {
        this.node.opacity -= 20;
        // change opacity
    }

    init(playerFacing: number, playerPos: number, playerStatus: number) {
        if (playerStatus === 2 || playerStatus === 3 ) {
            this.node.y = 5;
            this.xOffset = 60;
        } else {
            this.node.y = 0;
            this.xOffset = 50;
        }
        this.node.scaleX = -playerFacing
        this.node.x = playerPos + playerFacing * this.xOffset;
        this.node.opacity = 255;
        // putInPool after lifetime
        setTimeout( ()=> {
            this.putInPool();
        }, this.lifetime)
    }

    putInPool() {
        PoolManager.instance.removeObjectByName('flash', this.node);
    }

}
