// Скрейпит агентов с cs2skinsdb.com и создаёт недостающих в src/interface/data/agents/.
// Листинг даёт имя/фракцию/редкость/картинку, детальная страница — описание (лор).
// Существующих агентов (по папкам) не трогает; поле comment не заполняет (оно твоё).
// Привязку к подфракции (meta.ts) скрипт НЕ делает — фракция кладётся комментарием для ручной привязки.
//
// Запуск:  DRY=1 node scripts/scrape-agents.mjs   ← только план (что новое / что пропущено), без записи и без скачивания
//          node scripts/scrape-agents.mjs         ← реально создаёт файлы и качает картинки
import { readdir, mkdir, writeFile, readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import * as cheerio from 'cheerio'
import sharp from 'sharp'

const BASE = ''
const LISTING = `${BASE}/agents`
const AGENTS_DIR = 'src/interface/data/agents'
const VARIANTS_DIR = join(AGENTS_DIR, '_variants') // стейджинг для вторых версий — потом переносишь вручную
const CACHE_DIR = 'node_modules/.cache/scrape-agents'
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36'
const DELAY_MS = 800
const DRY = process.env.DRY === '1'

// border-top-color карточки → редкость агента (цвета CS).
const RARITY_BY_HEX = {
  '#4b69ff': 'Distinguished',
  '#8847ff': 'Exceptional',
  '#d32ce6': 'Superior',
  '#eb4b4b': 'Master',
}

// Первая версия персонажа уже лежит в папке агента (slug → папка) — скрейпер пропускает.
const ALIASES = {
  'crasswater-the-forgotten-or-guerrilla-warfare': 'crasswater',
  'sir-bloody-darryl-royale-or-the-professionals': 'darryl',
  'sir-bloody-miami-darryl-or-the-professionals': 'darryl',
  '1st-lieutenant-farlow-or-swat': 'farlow',
  'rezan-the-ready-or-sabre': 'rezan',
  'the-doctor-romanov-or-sabre': 'romanov',
  'chef-descadron-rouchard-or-gendarmerie-nationale': 'rouchard',
  'cmdr-davida-goggles-fernandez-or-seal-frogman': 'davida',
  'cmdr-frank-wet-sox-baroud-or-seal-frogman': 'wetsox',
  'cmdr-mae-dead-cold-jamison-or-swat': 'mae',
  'lt-commander-ricksaw-or-nswc-seal': 'ricksaw',
  'getaway-sally-or-the-professionals': 'sally',
  'special-agent-ava-or-fbi': 'ava',
  'the-elite-mr-muhlik-or-elite-crew': 'muhlik',
  'vypa-sista-of-the-revolution-or-guerrilla-warfare': 'vypa',
  'elite-trapper-solman-or-guerrilla-warfare': 'trapper',
  'lieutenant-rex-krikey-or-seal-frogman': 'rex',
  'col-mangos-dabisi-or-guerrilla-warfare': 'mango_dabisi',
  'markus-delrow-or-fbi-hrt': 'markus',
  'sous-lieutenant-medic-or-gendarmerie-nationale': 'medic',
  'chem-haz-capitaine-or-gendarmerie-nationale': 'chemhaz_captain',
}

// Вторые версии существующих персонажей (slug → целевая папка). Пишутся в _variants,
// путь к картинке и комментарий уже указывают на целевую папку — потом просто переносишь файлы.
const VARIATIONS = {
  'medium-rare-crasswater-or-guerrilla-warfare': 'crasswater',
  'sir-bloody-loudmouth-darryl-or-the-professionals': 'darryl',
  'sir-bloody-silent-darryl-or-the-professionals': 'darryl',
  'sir-bloody-skullhead-darryl-or-the-professionals': 'darryl',
  'bloody-darryl-the-strapped-or-the-professionals': 'darryl',
  'lieutenant-tree-hugger-farlow-or-swat': 'farlow',
  'rezan-the-redshirt-or-sabre': 'rezan',
}

const slugFromHref = (href) => href.replace(/^\/agents\//, '')
const idFromSlug = (slug) => slug.split('-or-')[0].replace(/-/g, '_')
const factionToken = (slug) => (slug.split('-or-')[1] ?? '').replace(/-/g, '_')

const fetchHtml = async (url) => {
  const cacheFile = join(CACHE_DIR, encodeURIComponent(url) + '.html')
  if (existsSync(cacheFile)) return readFile(cacheFile, 'utf8')

  const res = await fetch(url, { headers: { 'user-agent': UA } })
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`)
  const html = await res.text()

  await mkdir(CACHE_DIR, { recursive: true })
  await writeFile(cacheFile, html)
  await sleep(DELAY_MS) // вежливая задержка только при реальном запросе
  return html
}

const parseListing = (html) => {
  const $ = cheerio.load(html)
  return $('a.card')
    .map((_i, el) => {
      const a = $(el)
      const href = a.attr('href') ?? ''
      const h3 = a.find('h3').first()
      const faction = h3.find('span').first().text().trim()
      const name = h3.clone().children().remove().end().text().trim()
      const hex = (a.attr('style') ?? '').match(/#[0-9a-f]{6}/i)?.[0]?.toLowerCase()
      return {
        slug: slugFromHref(href),
        detailUrl: BASE + href,
        name,
        faction,
        rarity: RARITY_BY_HEX[hex] ?? '',
        imageUrl: a.find('img').first().attr('src') ?? '',
      }
    })
    .get()
    .filter((agent) => agent.slug && agent.name)
}

const parseDescription = (html) => {
  const $ = cheerio.load(html)
  const p = $('p')
    .filter((_i, el) => $(el).find('span').first().text().trim().startsWith('Description'))
    .first()
  if (!p.length) return ''
  p.find('span').first().remove()
  return p.text().trim()
}

const downloadWebp = async (url, outDir, fileBase) => {
  const res = await fetch(url, { headers: { 'user-agent': UA } })
  if (!res.ok) throw new Error(`image HTTP ${res.status} for ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  await sharp(buffer)
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(join(outDir, `${fileBase}.webp`))
}

const agentFileSource = (agent, photoPath, note) =>
  `import type { Agent } from '@/core/models/agent'

export const ${agent.id}: Agent = {
  id: ${JSON.stringify(agent.id)},
  name: ${JSON.stringify(agent.name)},
  description: ${JSON.stringify(agent.description)},
  comment: '',
  rarity: ${JSON.stringify(agent.rarity)},
  photos: [${JSON.stringify(photoPath)}],
}
${note}
`

const main = async () => {
  const existing = new Set((await readdir(AGENTS_DIR, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name))

  const listing = parseListing(await fetchHtml(LISTING))
  const created = []
  const variations = []
  const skipped = []

  // если базовый id встречается у нескольких агентов — добавляем фракцию, чтобы не перезаписать
  const baseIdCounts = {}
  for (const agent of listing) {
    const base = idFromSlug(agent.slug)
    baseIdCounts[base] = (baseIdCounts[base] ?? 0) + 1
  }

  for (const agent of listing) {
    const baseId = idFromSlug(agent.slug)
    const id = baseIdCounts[baseId] > 1 ? `${baseId}_${factionToken(agent.slug)}` : baseId
    const aliasTarget = ALIASES[agent.slug]
    const variationTarget = VARIATIONS[agent.slug]

    // первая версия уже лежит в папке агента — пропускаем
    if (aliasTarget && existing.has(aliasTarget)) {
      skipped.push(`${agent.slug} → существует как «${aliasTarget}»`)
      continue
    }
    // вариацию, уже перенесённую в папку агента вручную, повторно не создаём
    if (variationTarget && existsSync(join(AGENTS_DIR, variationTarget, `${id}.ts`))) {
      skipped.push(`${agent.slug} → уже перенесён в «${variationTarget}»`)
      continue
    }
    if (!variationTarget && existing.has(id)) {
      skipped.push(`${agent.slug} → существует как «${id}»`)
      continue
    }

    // вариация физически пишется в _variants, но путь к картинке указывает на целевую папку
    const homeFolder = variationTarget ?? id
    const writeDir = variationTarget ? VARIANTS_DIR : join(AGENTS_DIR, id)
    const photoPath = `agents/${homeFolder}/${id}.webp`

    if (DRY) {
      const line = `${id}  «${agent.name}» [${agent.rarity}] — ${agent.faction}`
      if (variationTarget) variations.push(`${line}  → перенести в agents/${variationTarget}/`)
      else created.push(line)
      continue
    }

    const detailHtml = await fetchHtml(agent.detailUrl)
    const description = parseDescription(detailHtml)
    await mkdir(writeDir, { recursive: true })
    if (agent.imageUrl) await downloadWebp(agent.imageUrl, writeDir, id)

    const note = variationTarget
      ? `// вариация: перенеси ${id}.ts и ${id}.webp в agents/${variationTarget}/`
      : `// team (для привязки к подфракции в meta.ts): ${agent.faction}`
    await writeFile(join(writeDir, `${id}.ts`), agentFileSource({ ...agent, id, description }, photoPath, note))

    ;(variationTarget ? variations : created).push(`${id}${variationTarget ? ` → ${variationTarget}` : ''}`)
    console.log(variationTarget ? '~' : '→', id)
  }

  console.log('\n--- summary ---')
  console.log(`всего на сайте: ${listing.length}`)
  console.log(`${DRY ? '[DRY] новых' : 'создано новых'}: ${created.length}`)
  console.log(`вариаций (в _variants): ${variations.length}`)
  console.log(`пропущено (существуют): ${skipped.length}`)
  if (created.length) {
    console.log('\nновые агенты:')
    for (const c of created) console.log('  +', c)
  }
  if (variations.length) {
    console.log('\nвариации (перенеси в папку агента вручную):')
    for (const v of variations) console.log('  ~', v)
  }
  if (skipped.length) {
    console.log('\nпропущены:')
    for (const s of skipped) console.log('  -', s)
  }
}

main()
