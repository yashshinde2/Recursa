export const INTRO_STORAGE_KEY = 'recursa:intro-seen'

// sessionStorage throws in some privacy modes and sandboxed frames; in that
// case the intro simply plays on every load.
export function hasSeenIntro() {
  try {
    return window.sessionStorage.getItem(INTRO_STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function markIntroSeen() {
  try {
    window.sessionStorage.setItem(INTRO_STORAGE_KEY, '1')
  } catch {}
}
