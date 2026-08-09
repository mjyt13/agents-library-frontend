import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import bgMusic from '@/interface/data/audio/kris_piano_waitingroom.ogg'

export const useBgMusicStore = defineStore('bgMusic',()=>{
    const audio = ref<HTMLAudioElement>(new Audio(bgMusic))
    const isPlaying = ref(false)
    const quietPlaying = () => {
        audio.value.volume = 0.05
    }
    const normalPlaying = () => {
        audio.value.volume = 0.15
    }
    const play = () => {
        audio.value.play()
        isPlaying.value = true
        audio.value.loop = true
    }
    const pause = () => {
        audio.value.pause()
        isPlaying.value = false
    }
    return {audio, isPlaying, quietPlaying, normalPlaying, play, pause}
})