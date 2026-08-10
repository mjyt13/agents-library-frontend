import {ref} from 'vue'
import {defineStore} from 'pinia'
import bgMusic from '@/interface/data/audio/kris_piano_waitingroom.ogg'

const NORMAL_VOLUME = 0.15
const QUIET_VOLUME = 0.08

export const useBgMusicStore = defineStore('bgMusic',()=>{
    const audio = ref<HTMLAudioElement>(new Audio(bgMusic))
    const isPlaying = ref(false)
    const quietPlaying = () => {
        audio.value.volume = QUIET_VOLUME
    }
    const normalPlaying = () => {
        audio.value.volume = NORMAL_VOLUME
    }
    const play = () => {
        audio.value.play()
        audio.value.volume = NORMAL_VOLUME
        isPlaying.value = true
        audio.value.loop = true
    }
    const pause = () => {
        audio.value.pause()
        isPlaying.value = false
    }

    return {audio, isPlaying, quietPlaying, normalPlaying, play, pause}
})
