import type { AudioContent } from './audioContent'

export interface Agent {
  id: string
  /** Название агента */
  name: string
  /** Фракция агента (например, "Профессионалы", "Чернь") */
  fraction: string
  /**
   * Описание агента
   */
  description: string
  /**
   * Комментарий об агенте
   */
  comment: string
  /**
   * Различное аудио-содержимое, связанное с агентом (например, голосовые реплики).
   */
  voiceLines: AudioContent[]
  /**
   * Картинки агента (пока в простой галерее).
   */
  photos: string[]
}
