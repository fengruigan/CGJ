let resConfig = {
    altasArr: ['main'],
    jsonArr: [],
    prefabArr: ['antItem', 'boxItem', 'turrentItem', 'gapItem', 'bulletItem', 'iceItem', 'fireItem', 'grassItem'],
}
let uiName = {
    messageBox: 'messagebox_ui'
}

let aniConfig = {
    'player_silder_run': { sample: 5, speed: 1, wrapMode: cc.WrapMode.Loop },
    'player_idle': { sample: 2, speed: 0.5, wrapMode: cc.WrapMode.Loop }
}
export default { uiName, resConfig, aniConfig }