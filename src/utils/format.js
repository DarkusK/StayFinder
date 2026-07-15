// Shared formatting + date helpers.

export const money = (n) =>
  `$${Number(n).toLocaleString('en-US', { maximumFractionDigits: 0 })}`

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  uk: ['січ.', 'лют.', 'бер.', 'квіт.', 'трав.', 'черв.', 'лип.', 'серп.', 'вер.', 'жовт.', 'лист.', 'груд.'],
}

// "2026-08-12" -> "Aug 12, 2026" (en) / "12 серп. 2026" (uk)
export function formatDate(iso, lang = 'en') {
  if (!iso) return '—'
  const [y, m, d] = iso.split('-').map(Number)
  const months = MONTHS[lang] || MONTHS.en
  return lang === 'uk' ? `${d} ${months[m - 1]} ${y}` : `${months[m - 1]} ${d}, ${y}`
}

// Whole nights between two ISO dates (0 if invalid/negative).
export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const a = new Date(checkIn + 'T00:00:00')
  const b = new Date(checkOut + 'T00:00:00')
  const diff = Math.round((b - a) / (1000 * 60 * 60 * 24))
  return diff > 0 ? diff : 0
}

// Today as YYYY-MM-DD (for min= on date inputs).
export function todayISO() {
  const d = new Date()
  const pad = (x) => String(x).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export const SERVICE_FEE_RATE = 0.1
export const CLEANING_FEE = 45
