import UIManager from "./ui_manager";
// import BagUIManager from "../UI/bag_ui_manager";
import DD from "./dynamic_data_manager";
// import { BagItemType } from "../common/enum";
// import { Emitter } from "../common/emmiter";
// import { MessageType } from "../common/message";
// import BagMenuUIManager from "../UI/menuUI/bag_menu_ui_manager";
// import CommonPlaceUIManager from "../UI/commonUI/common_place_ui_manager";
// import GroupMenuUIManager from "../UI/menuUI/group_menu_ui_manager";
// import PeopleInfoUIManager from "../UI/people_info_ui_manager";
// import BattleManager from "../battle/battle_manager";
import JsonManager from "./json_manager";
// import AdvMenuUIManager from "../UI/menuUI/adv_menu_ui_manager";
// import AreaMapUIManager from "../UI/area_map_ui_manager";
import GuideUIManager from "../ui/guide_ui_manager";
// import BagItem from "../item/bag_item";

const { ccclass, property } = cc._decorator;
/**
 * 教程
 */

@ccclass
export default class GuideManager extends cc.Component {

    static _instance: GuideManager = null

    static get instance() {
        if (this._instance == null) {
            this._instance = new GuideManager()
        }
        return this._instance
    }
    config: object = null
    // config: object = {
    //     1: {
    //         pos: cc.v2(-34, -130), type: 0,
    //         str: '点击打开物品菜单',
    //         func: () => {
    //             UIManager.instance.openBagMenuUI()
    //         }
    //     }, 2: {
    //         pos: cc.v2(-54, -60), type: 0,
    //         str: '点击打开道具背包',
    //         func: () => {
    //             UIManager.instance.openBagUI()
    //             BagMenuUIManager.instance.hideUI()
    //         }
    //     }, 3: {
    //         pos: cc.v2(-29, -93), type: 0,
    //         str: '选择书籍类别',
    //         func: () => {
    //             BagUIManager.instance.chooseSecondType(1)
    //         }
    //     }, 4: {
    //         pos: cc.v2(-50, 85), type: 0,
    //         str: '点击查看技能书',
    //         func: () => {
    //             BagUIManager.instance.onChooseItem({
    //                 id: Object.keys(DD.instance.bagItemMap)[0],
    //                 type: BagItemType.itemProp
    //             })
    //         }
    //     }, 5: {
    //         pos: cc.v2(0, 0),
    //         type: 1,
    //         str: '关闭背包页面之后继续教程',
    //         func: () => {
    //             Emitter.register('message_' + MessageType.closeBagUI, (typeName, data) => {
    //                 UIManager.instance.showPlotUI(5)
    //                 Emitter.remove('message_' + MessageType.closeBagUI, this)
    //                 GuideUIManager.instance.hideUI()
    //             }, this)
    //         }
    //     }, 6: {
    //         pos: cc.v2(0, 112),
    //         type: 0,
    //         str: '打开自宅',
    //         func: () => {
    //             UIManager.instance.showCommonPlaceUI(0)
    //         }
    //     }, 7: {
    //         pos: cc.v2(0, -100),
    //         type: 0,
    //         str: '点击训练',
    //         func: () => {
    //             UIManager.instance.openTrainingCampUI()
    //             CommonPlaceUIManager.instance.hideUI()
    //         }
    //     }, 8: {
    //         pos: cc.v2(0, 0),
    //         type: 1,
    //         str: '成功学习技能之后继续教程',
    //         func: () => {
    //             Emitter.register('message_' + MessageType.getSkill, (typeName, data) => {
    //                 UIManager.instance.showPlotUI(6)
    //                 Emitter.remove('message_' + MessageType.getSkill, this)
    //                 GuideUIManager.instance.hideUI()

    //             }, this)
    //         }
    //     }, 9: {
    //         pos: cc.v2(-70, -130),
    //         type: 0,
    //         str: '打开队伍菜单',
    //         func: () => {
    //             UIManager.instance.openGroupMenuUI()
    //         }
    //     }, 10: {
    //         pos: cc.v2(-54, -37),
    //         type: 0,
    //         str: '打开主角信息',
    //         func: () => {
    //             UIManager.instance.showPeopleInfoUI(DD.instance.getPeopleByID(0))
    //             GroupMenuUIManager.instance.hideUI()
    //         }
    //     }, 11: {
    //         pos: cc.v2(-45, -70),
    //         type: 0,
    //         str: '选择切换技能',
    //         func: () => {
    //             PeopleInfoUIManager.instance.skillContainer.children[0].getComponent(BagItem).callback()
    //         }
    //     }, 12: {
    //         pos: cc.v2(0, 0),
    //         type: 1,
    //         str: '装备技能之后继续教程',
    //         func: () => {
    //             Emitter.register('message_' + MessageType.equipSkill, (typeName, data) => {
    //                 setTimeout(() => {
    //                     PeopleInfoUIManager.instance.hideUI()
    //                 });
    //                 UIManager.instance.showPlotUI(7)
    //                 Emitter.remove('message_' + MessageType.equipSkill, this)
    //                 GuideUIManager.instance.hideUI()

    //             }, this)
    //         }
    //     }, 13: {
    //         pos: cc.v2(0, 0),
    //         type: 2,
    //         str: '',
    //         func: () => {
    //             BattleManager.instance.initBattle([], () => { UIManager.instance.showPlotUI(8) }, JsonManager.instance.preBattleData[1])
    //         }
    //     }, 14: {
    //         pos: cc.v2(0, -130),
    //         type: 0,
    //         str: '打开冒险菜单',
    //         func: () => {
    //             UIManager.instance.openAdvMenuUI()
    //         }
    //     }, 15: {
    //         pos: cc.v2(0, 58),
    //         type: 0,
    //         str: '开始旅行',
    //         func: () => {
    //             UIManager.instance.showAreaMapUI('开始旅行')
    //             AdvMenuUIManager.instance.hideUI()
    //             // UIManager.instance.showPlotUI(10)
    //             setTimeout(() => {
    //                 AreaMapUIManager.instance.scroll.scrollTo(cc.v2(0.25, 0.25))
    //             }, 1000);
    //         }
    //     }, 16: {
    //         pos: cc.v2(0, 0),
    //         type: 2,
    //         str: '',
    //         func: () => {
    //             UIManager.instance.showPlotUI(10)
    //         }
    //     }, 17: {
    //         pos: cc.v2(15, -93),
    //         type: 0,
    //         str: '点击目的地',
    //         func: () => {
    //             AreaMapUIManager.instance.onChoose(DD.instance.world[0].settles[2], true)
    //         }
    //     }, 18: {
    //         pos: cc.v2(0, 0),
    //         type: 1,
    //         str: '到达目的地之后继续教程',
    //         func: () => {
    //             Emitter.register('message_' + MessageType.changeCurArea, (typeName, data) => {
    //                 UIManager.instance.showPlotUI(12)
    //                 Emitter.remove('message_' + MessageType.changeCurArea, this)
    //                 GuideUIManager.instance.hideUI()

    //             }, this)
    //         }
    //     }, 19: {
    //         pos: cc.v2(0, 112),
    //         type: 0,
    //         str: '点击酒馆',
    //         func: () => {
    //             UIManager.instance.showCommonPlaceUI(0)
    //         }
    //     }, 20: {
    //         pos: cc.v2(0, 0),
    //         type: 1,
    //         str: '成功招募队友之后继续教程',
    //         func: () => {
    //             Emitter.register('message_' + MessageType.getFriend, (typeName, data) => {
    //                 UIManager.instance.showPlotUI(14)
    //                 CommonPlaceUIManager.instance.hideUI()
    //                 Emitter.remove('message_' + MessageType.getFriend, this)
    //                 GuideUIManager.instance.hideUI()

    //             }, this)
    //         }
    //     }, 21: {
    //         pos: cc.v2(-70, -130),
    //         type: 0,
    //         str: '打开组队信息',
    //         func: () => {
    //             UIManager.instance.openGroupMenuUI()
    //         }
    //     }, 22: {
    //         pos: cc.v2(-18, -37),
    //         type: 0,
    //         str: '打开队员页面',
    //         func: () => {
    //             UIManager.instance.openGroupUI()
    //             GroupMenuUIManager.instance.hideUI()
    //         }
    //     }, 23: {
    //         pos: cc.v2(0, 0),
    //         type: 1,
    //         str: '关闭组队页面之后继续教程',
    //         func: () => {
    //             Emitter.register('message_' + MessageType.closeGroupUI, (typeName, data) => {
    //                 UIManager.instance.showPlotUI(15)
    //                 Emitter.remove('message_' + MessageType.closeGroupUI, this)
    //                 GuideUIManager.instance.hideUI()
    //             }, this)
    //         }
    //     },
    // }
    curStep: number = 0
    openGuide(step: number) {
        this.curStep = step
        GuideUIManager.instance.initUI(this.config[this.curStep])
        switch (this.config[this.curStep].type) {
            case 0:
                //展示按钮
                GuideUIManager.instance.cb = this.config[this.curStep].func
                break
            case 1:
                this.config[this.curStep].func()
                break
            case 2:
                this.config[this.curStep].func()
                break
        }
    }
    nextGuide() {
        this.curStep += 1
        this.openGuide(this.curStep)
    }
}
