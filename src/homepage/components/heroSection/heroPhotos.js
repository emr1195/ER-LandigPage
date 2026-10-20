// Once saved, the shared list is authoritative, including an intentionally empty list.
export const heroCarouselPhotos = (info = {}) => {
  const ordered = images => Array.isArray(images) ? [...images].sort((a, b) => (a.position || 0) - (b.position || 0)) : []
  const photos = Array.isArray(info.carouselImages) ? ordered(info.carouselImages) : [
    info.imageTopLeft, ...ordered(info.imageTopLeft?.images),
    info.imageBottomLeft, ...ordered(info.imageBottomLeft?.images),
  ]
  const seen = new Set()
  return photos.filter(image => {
    const url = image?.imageURL?.trim()
    if (!url || image.display === false || seen.has(url)) return false
    seen.add(url)
    return true
  })
}
