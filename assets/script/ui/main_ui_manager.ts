import { GameStatus } from "../utils/enum"
import Player  from "../actor/player"
import { Emitter } from "../utils/emmiter"
import MainManager from "../manager/main_manager";
import { Utils } from "../utils/utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MainUIManager extends cc.Component {

    static instance: MainUIManager = null;
    emitter: Emitter = null;

    @property(Player)
    player: Player = null;
    @property(cc.Label)
    label: cc.Label = null;

    status = 0;

    onLoad () {
        MainUIManager.instance = this;
        this.player.node.setPosition(0, -135);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    }

    init() {
        // this.label.node.active = true;
        this.label.string = Utils.getTimeFormat(MainManager.instance.time);
        this.status = GameStatus.running;
    }

    onKeyDown(event) {
        switch(event.keyCode){
            case 39: 
                console.log("right arrow pressed");
                Emitter.fire("rightArrowDown");
                break;
            case 37: 
                console.log("left arrow pressed");
                Emitter.fire("leftArrowDown");
                break;
            case cc.macro.KEY.a:
                MainManager.instance.onWin();
            case cc.macro.KEY.s:
                MainManager.instance.onFail();
        }
    }

    // onKeyUp(event) {
    //     switch(event.keyCode) {
    //         case 39 || 37:
    //             // console.log("arrow keys relased")
    //             Emitter.fire("stopMovement");
    //     }
    // }
}
