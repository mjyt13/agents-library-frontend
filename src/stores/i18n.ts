import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {messages} from '@/i18n/messages'

export const useI18nStore = defineStore( 'i18n',()=>{
  const locale = ref<'en' | 'ru'>('en')
  const setLocale = (newLocale: 'en' | 'ru') => {
    locale.value = newLocale
  }
  const getMessage = computed(() => messages[locale.value])

  return {locale, setLocale, getMessage}
})
