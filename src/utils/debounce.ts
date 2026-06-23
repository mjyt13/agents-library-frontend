// leading: true — вызвать сразу на первом нажатии, затем игнорировать до паузы в delayMs.
// leading: false (по умолчанию) — вызвать один раз через delayMs после последнего нажатия.
export const debounce = <A extends unknown[]>(
  fn: (...args: A) => void,
  delayMs: number,
  options: { leading?: boolean } = {},
): ((...args: A) => void) => {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: A) => {
    const callNow = options.leading && timer === null
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      timer = null
      if (!options.leading) fn(...args)
    }, delayMs)

    if (callNow) fn(...args)
  }
}
