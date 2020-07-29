/**
 * @description 音频管理
 */

const { ccclass, property } = cc._decorator;

@ccclass
export default class AudioManager extends cc.Component {

    static instance: AudioManager = null

    sourceMaps: {} = {}

    isOpenBGM: boolean = false

    onLoad() {
        AudioManager.instance = this
        this.loadBGMClip("bgm_1")

    }
    DEFAULT_VOLUME: number = 1
    BGM_VOLUME: number = 0.8
    /**
     * 加载音频
     * @param {string} name 音频文件名
     * @param {number} volume 音频声音大小
     */
    loadAudioClip(name: string, volume: number = this.DEFAULT_VOLUME) {
        cc.loader.loadRes("sound/" + name, (err, audioClip) => {
            this.sourceMaps[name] = audioClip
            cc.audioEngine.setEffectsVolume(volume)
            cc.audioEngine.playEffect(audioClip, false)
        })
    }

    loadBGMClip(name: string, volume: number = this.DEFAULT_VOLUME) {
        cc.loader.loadRes("bgm/" + name, (err, audioClip) => {
            // console.log('bgm', name, err)
            this.sourceMaps[name] = audioClip
            cc.audioEngine.setMusicVolume(volume)
            // cc.audioEngine.playMusic(audioClip, true)
        })
    }

    /**
     * 播放音频
     * @param {string} name 音频文件名
     * @param {number} volume 音频声音大小
     */
    playAudio(name: string, volume: number = this.DEFAULT_VOLUME) {
        //if (!DD.instance.soundSwitch) return
        if (this.sourceMaps[name]) {
            let audioClip = this.sourceMaps[name]
            cc.audioEngine.setEffectsVolume(volume)
            cc.audioEngine.playEffect(audioClip, false)
        } else {
            this.loadAudioClip(name)
        }
    }
    playBGMByID(id: number, volume: number = this.BGM_VOLUME) {
        if (this.isOpenBGM) {
            cc.audioEngine.stopMusic()
        }
        this.isOpenBGM = true
        let name = 'bgm_' + (id + 1)
        if (this.sourceMaps[name]) {
            let music = this.sourceMaps[name]
            cc.audioEngine.setMusicVolume(volume)
            cc.audioEngine.playMusic(music, true)
        } else {
            this.loadBGMClip(name)
        }
    }
    stopBGM() {
        if (this.isOpenBGM) {
            cc.audioEngine.stopMusic()
            this.isOpenBGM = false
        }
    }
}
