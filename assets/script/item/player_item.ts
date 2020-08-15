import { Emitter } from "../utils/emmiter"
import MainManager from "../manager/main_manager"
import MainUIManager from "../ui/main_ui_manager";
import ResourceManager from "../manager/resouce_manager";
import { ResType, GameStatus } from "../utils/enum";
import config from "../../config";
import JsonManager from "../manager/json_manager";

const { ccclass, property } = cc._decorator;

enum arrEnum {
    none = 0,
    up = 1,
    down = 2,
    left = 3,
    right = 4,
    upLeft = 5,
    upRight = 6,
    downRight = 8,
    downLeft = 7,
}
@ccclass
export default class PlayerItem extends cc.Component {

    xSpeed: number = 0;
    ySpeed: number = 0;
    normalSpd: number = 100
    surrounding: cc.Node = null;
    holding: cc.Node = null;
    @property(cc.Animation)
    playerAnima: cc.Animation = null
    _hp: number = 3
    @property(cc.Node)
    camara: cc.Node = null
    set hp(val: number) {
        this._hp = val
        MainUIManager.instance.showHp(val)
        this.checkDie()
    }
    get hp() {
        return this._hp
    }

    @property(cc.Node)
    hand: cc.Node = null
    // LIFE-CYCLE CALLBACKS:
    react: number[] = []
    onLoad() {
        // Movement control
        Emitter.register("rightArrowDown", this.moveRight, this)
        Emitter.register("leftArrowDown", this.moveLeft, this)
        Emitter.register("upArrowDown", this.moveUp, this)
        Emitter.register("downArrowDown", this.moveDown, this)
        Emitter.register("rightArrowUp", this.xOnStay, this)
        Emitter.register("leftArrowUp", this.xOnStay, this)
        Emitter.register("upArrowUp", this.yOnStay, this)
        Emitter.register("downArrowUp", this.yOnStay, this)

        setTimeout(() => {
            ResourceManager.instance.getAnimation('player_silder_run', config.aniConfig['player_silder_run']).then((res: cc.AnimationClip) => {
                this.playerAnima.addClip(res)
            })
            ResourceManager.instance.getAnimation('player_idle', config.aniConfig['player_idle']).then((res: cc.AnimationClip) => {
                this.playerAnima.addClip(res)
            })

        });

    }
    init() {
        this.node.setPosition(JsonManager.instance.getConfig('playerPosition')[0], JsonManager.instance.getConfig('playerPosition')[1])
        // this.node.setPosition(0, -100)
        this.hp = 3// JsonManager.instance.getConfig('playerHp')
        this.normalSpd = JsonManager.instance.getConfig('playerSpd')
        let playerPos = JsonManager.instance.getConfig('playerPosition')
        let range = JsonManager.instance.getConfig('canMoveRange')
        this.react = [//上下左右
            range[1] / 2 + playerPos[1] / 2 - 93,
            -range[1] / 2 + playerPos[1] / 2 + 62,
            range[0] / 2 + playerPos[0] / 2 - 120,
            -range[0] / 2 + playerPos[0] / 2 + 120
        ]
        console.log(this.react)
    }
    update(dt) {
        if (MainManager.instance.gameStatus != GameStatus.start) return
        this.node.x += this.xSpeed * dt;
        this.node.y += this.ySpeed * dt;

        if (this.node.x < this.react[3]) this.node.x = this.react[3]
        if (this.node.y > this.react[0]) this.node.y = this.react[0]
        if (this.node.x > this.react[2]) this.node.x = this.react[2]
        if (this.node.y < this.react[1]) this.node.y = this.react[1]
        if (this.xSpeed != 0 || this.ySpeed != 0) {
            if (!this.playerAnima.getAnimationState('player_silder_run').isPlaying) {
                this.playerAnima.play('player_silder_run')
            }
        }
        if (this.xSpeed == 0 && this.ySpeed == 0) {
            if (!this.playerAnima.getAnimationState('player_idle').isPlaying) {
                this.playerAnima.play('player_idle')
            }
        }
        this.camara.setPosition(this.node.position)
    }

    moveRight() {
        this.xSpeed = this.normalSpd;
        this.node.scaleX = -1

    }
    moveLeft() {
        this.xSpeed = -this.normalSpd;
        this.node.scaleX = 1

    }
    moveUp() {
        this.ySpeed = this.normalSpd;

    }
    moveDown() {
        this.ySpeed = -this.normalSpd;

    }
    xOnStay() {
        this.xSpeed = 0;
        // this.playerAnima.stop('player_silder_run')
        //  this.node.getComponent(cc.Sprite).spriteFrame = ResourceManager.instance.getSprite(ResType.main, 'player')
    }
    yOnStay() {
        this.ySpeed = 0;
        //  this.playerAnima.stop('player_silder_run')
        // this.node.getComponent(cc.Sprite).spriteFrame = ResourceManager.instance.getSprite(ResType.main, 'player')

    }

    pickUp() {
        // if (this.surrounding != null) {
        //     switch (this.surrounding.name) {
        //         case "box":
        //             Emitter.fire("pickUpBox");
        //             this.holding = this.surrounding;
        //             // console.log("picking up box");
        //             break;
        //         case "turret":
        //             Emitter.fire("pickUpTurret");
        //             this.holding = this.surrounding;
        //             break;
        //     }
        // }
    }


    onCollisionEnter(other, self) {
        // this.surrounding = other.node;
        if (other.node.name == "ant") {
            // this.surroundings = "ant";
            this.hp--
        } else if (other.node.name == "boxItem") {
            //  console.log('碰到箱子')
        }
        //  else if (other.node.name == "box") {
        //     this.surrounding.opacity = 200;
        //     // console.log("box detected");
        //     // this.surroundings = "box";
        // } else if (other.node.name == "turret") {
        //     this.surrounding.opacity = 200;
        //     // console.log("turret detected");
        //     // this.surroundings = "turret";
        // }
    }
    onCollisionStay(other, self) {
        if (other.node.name == "boxItem") {
            //判断角度往哪个方向阻挡 
            let angle = other.node.getPosition().sub(self.node.getPosition()).angle(cc.v2(1, 0)) * 180 / Math.PI
            //     console.log('角度', angle)
            if (angle > 45 && angle < 135) {
                if (this.node.y - other.node.y < other.node.height / 2 + this.node.height / 2) {
                    if (this.node.y < other.node.y) {
                        this.node.y = other.node.y - other.node.height / 2
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
    onCollisionExit(self, other) {
        // this.surrounding.opacity = 255;
        // this.surrounding = null;
    }
    checkDie() {
        if (this.hp <= 0) {
            MainManager.instance.onFail()
        }
    }
}
