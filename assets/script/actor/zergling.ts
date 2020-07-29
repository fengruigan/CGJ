import { Emitter } from "../utils/emmiter"
// import MainUIManager from "../ui/main_ui_manager"
import MainManager from "../manager/main_manager"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Zergling extends cc.Component {

    @property(cc.Integer)
    movementSpeed: number = 10;
    @property(cc.Prefab)
    target: cc.Prefab = null;

    onLoad () {
        Emitter.register("collision", this.checkCollision, this);
    }

    checkCollision(obj: cc.Node) {
        if (obj) {
            switch(obj.name) {
                case "player":
                    this.endGame();
                case "bullet":
                    this.target.destroy();
            }
        }
    }

    endGame() {
        MainManager.instance.onFail();
    }




    // update (dt) {}
}
