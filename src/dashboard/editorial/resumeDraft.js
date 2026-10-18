const key = 'er.dashboard.reauth'
export const saveResumeDraft = (userId, sectionKey, context) => {
  if (!context?.dirty) return
  context.cancelUploads?.()
  sessionStorage.setItem(
    key,
    JSON.stringify({
      userId,
      sectionKey,
      draft: context.draft,
      snapshot: context.snapshot,
      uncertain: context.uncertain,
      time: Date.now(),
    }),
  )
}
export const consumeResumeDraft = (userId, sectionKey) => {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const saved = JSON.parse(raw)
    sessionStorage.removeItem(key)
    return saved.userId === userId && saved.sectionKey === sectionKey
      ? saved
      : null
  } catch {
    return null
  }
}
export const clearResumeDraft = () => {
  try {
    sessionStorage.removeItem(key)
  } catch {
    /* Session-only continuity is unavailable. */
  }
}
