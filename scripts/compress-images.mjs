// Конвертирует png/jpg/jpeg в src/interface/data в webp (resize + quality), удаляет оригинал.
// Превью фракций берутся через import.meta.glob (webp уже в паттерне) — обновлять не нужно.
// Строковые ссылки (photos агентов) правит отдельный шаг — см. README запуска.
// Запуск:  node scripts/compress-images.mjs        (реально конвертирует)
//          DRY=1 node scripts/compress-images.mjs  (только отчёт, ничего не меняет)
import { readdir, readFile, unlink, rename, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join, extname } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import sharp from 'sharp'

// Windows иногда держит лок сразу после записи — повторяем удаление.
const unlinkWithRetry = async (path, attempts = 5) => {
  for (let i = 0; i < attempts; i++) {
    try {
      await unlink(path)
      return
    } catch (error) {
      if (error.code !== 'EBUSY' && error.code !== 'EPERM') throw error
      await sleep(150)
    }
  }
  await unlink(path)
}

const ROOT = 'src/interface/data'
const MAX_SIDE = 1600
const QUALITY = 80
const RECOMPRESS_WEBP_OVER = 400 * 1024 // крупные «родные» webp тоже ужимаем (для dev/репозитория)
const DRY = process.env.DRY === '1'
const SRC_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp'])

const toWebp = (buffer) =>
  sharp(buffer)
    .resize({ width: MAX_SIDE, height: MAX_SIDE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) yield* walk(path)
    else if (SRC_EXTS.has(extname(entry.name).toLowerCase())) yield path
  }
}

let before = 0
let after = 0
let converted = 0
const collisions = []

for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase()
  const inputSize = (await stat(file)).size

  // .webp пере-сжимаем на месте только если он крупный — мелкие уже оптимальны.
  if (ext === '.webp') {
    if (inputSize <= RECOMPRESS_WEBP_OVER) continue
    before += inputSize
    if (DRY) {
      converted += 1
      continue
    }
    const tmp = file + '.tmp'
    await toWebp(await readFile(file)).toFile(tmp)
    after += (await stat(tmp)).size
    await unlinkWithRetry(file)
    await rename(tmp, file)
    converted += 1
    console.log('↻', file)
    continue
  }

  const target = file.slice(0, -ext.length) + '.webp'
  before += inputSize

  if (existsSync(target)) {
    collisions.push(file)
    continue
  }

  if (DRY) {
    converted += 1
    continue
  }

  await toWebp(await readFile(file)).toFile(target)
  after += (await stat(target)).size
  await unlinkWithRetry(file)
  converted += 1
  console.log('→', target)
}

const mb = (n) => `${(n / 1048576).toFixed(1)} MB`
console.log('\n--- summary ---')
console.log(`${DRY ? '[DRY] would convert' : 'converted'}: ${converted} files`)
console.log(`source: ${mb(before)}${DRY ? '' : ` → webp: ${mb(after)}`}`)
if (collisions.length) {
  console.log(`\ncollisions (target .webp already exists — skipped, handle manually):`)
  for (const c of collisions) console.log('  ', c)
}
