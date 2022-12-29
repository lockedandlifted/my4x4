import {
  TbBrandFacebook,
  TbBrandInstagram,
  TbBrandPatreon,
  TbBrandTiktok,
  TbBrandYoutube,
  TbWorld,
} from 'react-icons/tb'

const Icons = {
  facebook: TbBrandFacebook,
  instagram: TbBrandInstagram,
  patreon: TbBrandPatreon,
  tiktok: TbBrandTiktok,
  website: TbWorld,
  youtube: TbBrandYoutube,
} as const

type ExternalLinkIconProps = {
  externalLinkType: string,
}

const ExternalLinkIcon = (props: ExternalLinkIconProps) => {
  const { externalLinkType } = props

  if (!externalLinkType) {
    return <TbWorld />
  }

  const IconComponent = Icons[externalLinkType]

  return <IconComponent />
}

export default ExternalLinkIcon
