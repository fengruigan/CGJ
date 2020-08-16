let resConfig = {
    altasArr: ['main'],
    jsonArr: ['config', 'tower'],
    prefabArr: ['antItem', 'boxItem', 'turrentItem', 'gapItem', 'bulletItem', 'iceItem', 'fireItem', 'grassItem', 'effectItem', 'propItem'],
}
let uiName = {
    messageBox: 'messagebox_ui'
}

let aniConfig = {
    'player_silder_run': { sample: 5, speed: 1, wrapMode: cc.WrapMode.Loop },
    'player_idle': { sample: 2, speed: 0.5, wrapMode: cc.WrapMode.Loop },
    'player_success_run': { sample: 6, speed: 1, wrapMode: cc.WrapMode.Loop },
    'player_success_idle': { sample: 2, speed: 0.5, wrapMode: cc.WrapMode.Loop },
}
export default { uiName, resConfig, aniConfig }