import config from "../../config"
import { ResType } from "../utils/enum"
import JsonManager from "./json_manager"
import PoolManager from "./pool_manager"
import { Emitter } from "../utils/emmiter"
import { MessageType } from "../utils/message"

const { ccclass, property } = cc._decorator


@ccclass
export default class ResourceManager extends cc.Component {
    static instance: ResourceManager = null

    _Atlas: cc.SpriteAtlas[] = []
    _Json: cc.JsonAsset[] = []
    _Prefab: cc.Prefab[] = []
    _Animation: { [key: string]: cc.AnimationClip } = {}
    loading: number = 0
    onLoad() {
        ResourceManager.instance = this
        console.log("ResourceManager loading ...");
        this.bindEvent()
        //加载全部图集
        let altasArr = config.resConfig.altasArr.map((item) => { return 'atlas/' + item })
        let self = this
        cc.loader.loadResArray(altasArr, cc.SpriteAtlas, (err, atlas) => {
            if (err) {
                console.error(err);
                return;
            }
            self._Atlas = atlas
            Emitter.fire('message_' + MessageType.atlasLoaded)
        })

        let jsonArr = config.resConfig.jsonArr.map((item) => { return 'json/' + item })
        cc.loader.loadResArray(jsonArr, cc.JsonAsset, (err, jsons) => {
            if (err) {
                console.error(err);
                return;
            }
            self._Json = jsons
            JsonManager.instance.init()
        })
        let prefabArr = config.resConfig.prefabArr.map((item) => { return 'prefab/' + item })
        cc.loader.loadResArray(prefabArr, cc.Prefab, (err, prefabs) => {
            if (err) {
                console.error(err);
                return;
            }
            self._Prefab = prefabs
            PoolManager.instance.init()
        })
    }
    bindEvent() {
        Emitter.register('message_' + MessageType.atlasLoaded, (name, data) => {
            ResourceManager.instance.loadedRes()
            Emitter.remove('message_' + MessageType.atlasLoaded, '')
        }, '')
        Emitter.register('message_' + MessageType.poolLoaded, (name, data) => {
            ResourceManager.instance.loadedRes()
            Emitter.remove('message_' + MessageType.poolLoaded, '')
        }, '')
        Emitter.register('message_' + MessageType.jsonLoaded, (name, data) => {
            ResourceManager.instance.loadedRes()
            Emitter.remove('message_' + MessageType.jsonLoaded, '')
        }, '')
    }
    loadedRes() {
        this.loading++
        if (this.loading == 3) {
            console.log('资源加载完毕')
        }
    }
    getSprite(type: ResType, name: string): cc.SpriteFrame {
        if (this._Atlas[type]) {
            return this._Atlas[type].getSpriteFrame(name)
        }
        return null
    }
    /**
     * 得到动画
     * @param name 
     * @param param smaple funcs
     */
    getAnimation(name: string, param: { sample: number, speed: number, funcs?, wrapMode: cc.WrapMode }) {
        return new Promise((resolve, reject) => {
            if (this._Animation[name]) {
                resolve(this._Animation[name])
            } else {
                cc.loader.loadRes('animation/' + name, cc.SpriteAtlas, (err, atlas) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    let frames: [cc.SpriteFrame] = atlas.getSpriteFrames()
                    let clip: cc.AnimationClip = cc.AnimationClip.createWithSpriteFrames(frames, frames.length)
                    clip.name = name
                    clip.sample = param.sample
                    clip.speed = param.speed
                    clip.wrapMode = param.wrapMode
                    if (param.funcs) {
                        //自定义帧事件
                        clip.events.push(...param.funcs)
                    }
                    this._Animation[name] = clip
                    resolve(clip)
                })
            }
        })
    }

}