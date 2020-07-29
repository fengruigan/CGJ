let resConfig = {
    altasArr: ['main'],
    jsonArr: [],
    prefabArr: ['bullet', 'zergling'],
}
let uiName = {
    messageBox: 'messagebox_ui',
    winPage: 'winPage',
    failPage: 'failPage'
}
let animaParams = {
    'player_run': {
        sample: 3,
        speed: 3,
        wrapMode: cc.WrapMode.Loop
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
        funcs: [
            {
                frame: 3,
                func: 'putInPool',
                param: []
            }
        ]
    }
}
export default { animaParams, uiName, resConfig }