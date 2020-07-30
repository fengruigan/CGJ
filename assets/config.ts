let resConfig = {//填写Resrouce下需要自动加载的资源
    altasArr: ['main'],//自动图集加载 altas/下的图集名字 然后在ResType的enum下新增一个枚举，使用的时候使用ResouceManager.instance.getSprite(新的枚举,图集中图片的名字字符串)
    jsonArr: [],//自动加载json配表 填写文件名 使用时使用JsonManager.instance.getDataByName(名字)
    prefabArr: ['bullet', 'zergling', 'flash'],//自动图集加载预制体 使用时用PoolManager.instance.create/removeObjectByName(预制体名字，父节点/当前节点)
}
let uiName = {//填写Resrouce/ui下需要自动加载的ui 动态打开实例代码:UIManager.instance.openUI(WinUIManager, { name: config.uiName.winPage })
    messageBox: 'messagebox_ui',
    winPage: 'winPage',
    failPage: 'failPage'
}
let animaParams = {//填写Resrouce/anima下需要自动加载的动画配置
    'player_run': {
        sample: 3,//一秒有几帧  
        speed: 3,//速度
        wrapMode: cc.WrapMode.Loop//循环模式
    },
    'player_reload': {
        sample: 2,
        speed: 2,
        wrapMode: cc.WrapMode.Loop,
        funcs:[
            {
                frame: 2,
                func: 'onStay',
                param: []
            }
        ]
    },
    'monster_run': {
        sample: 2,
        speed: 3,
        wrapMode: cc.WrapMode.Loop
    },
    'monster_die': {
        sample: 3,
        speed: 3,
        wrapMode: cc.WrapMode.Loop,
        funcs: [//动画回调函数
            {
                frame: 3,//第几帧的时候调用
                func: 'putInPool',//调用的函数名称 （动画组件和自定义组件必须在同一个node上才能正常调用
                param: []//调用函数时的参数
            }
        ]
    }
}
export default { animaParams, uiName, resConfig }