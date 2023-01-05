const facebookRegex = /^(https?:\/\/)?((www\.)?facebook\.com)\/.+$/
const instagramRegex = /^(https?:\/\/)?((www\.)?instagram\.com)\/.+$/
const patreonRegex = /^(https?:\/\/)?((www\.)?patreon\.com)\/.+$/
const tiktokRegex = /^(https?:\/\/)?((www\.)?tiktok\.com)\/.+$/
const youtubeRegex = /^(https?:\/\/)?((www\.)?youtube\.com|youtu\.be)\/.+$/

export const getExternalLinkUrlType = (url: string) => {
  if (url.match(youtubeRegex)) {
    return 'youtube'
  }

  if (url.match(instagramRegex)) {
    return 'instagram'
  }

  if (url.match(facebookRegex)) {
    return 'facebook'
  }

  if (url.match(tiktokRegex)) {
    return 'tiktok'
  }

  if (url.match(patreonRegex)) {
    return 'patreon'
  }

  return 'website'
}

export default getExternalLinkUrlType
