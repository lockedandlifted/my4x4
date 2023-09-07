import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import ImageKit from 'imagekit-javascript'

import LicensePlateLogo from '@components/LicensePlateLogo'

const imageKit = new ImageKit({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL || '',
})

const rubikBoldFont = fetch(new URL('../../../fonts/Rubik-Bold.ttf', import.meta.url)).then(
  res => res.arrayBuffer(),
)

const rubikRegularFont = fetch(new URL('../../../fonts/Rubik-Regular.ttf', import.meta.url)).then(
  res => res.arrayBuffer(),
)

export const config = {
  runtime: 'edge',
}

// /api/ogImages/project?projectImageKey=images/3026414d-28ac-4d16-86ec-a8c684f23c3c.jpg&userImageKey=images/3026414d-28ac-4d16-86ec-a8c684f23c3c.jpg&title=2019%20Ford%20Ranger%20PX3&projectSlug=locked-and-lifted&username=lockedandlifted&userFullName=Twin%20Lockington

async function OGImage(req: NextRequest) {
  const { nextUrl: { searchParams } } = req

  const rubikBoldFontData = await rubikBoldFont
  const rubikRegularFontData = await rubikRegularFont

  const projectImageKey = searchParams.get('projectImageKey')

  const backgroundImageUrl = projectImageKey !== 'undefined' ? imageKit.url({
    path: projectImageKey,
    transformation: [{
      focus: 'auto',
      height: '630',
      width: '1200',
    }],
  }) : undefined

  const imageUrl = projectImageKey !== 'undefined' ? imageKit.url({
    path: projectImageKey,
    transformation: [{
      focus: 'auto',
      height: '560',
      width: '560',
    }],
  }) : undefined

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          display: 'flex',
          fontFamily: 'Rubik',
          height: 630,
          width: 1200,
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            padding: 50,
            width: '100%',
          }}
        >
          <div
            style={{
              backgroundImage: `url(${imageUrl})`,
              borderRadius: 15,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: 50,
              width: 560,
              maxHeight: '100%',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div
                style={{
                  display: 'flex',
                  marginLeft: 'auto',
                }}
              >
                <LicensePlateLogo backgroundColor="black" fillColor="white" height={57} width={126} />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Rubik',
          data: rubikBoldFontData,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Rubik',
          data: rubikRegularFontData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  )
}

export default OGImage
