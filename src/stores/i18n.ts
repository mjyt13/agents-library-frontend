import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useI18nStore = defineStore( 'i18n',()=>{
  const locale = ref('en')
  const setLocale = (newLocale: string) => {
    locale.value = newLocale
  }

  return {locale, setLocale}
})
