import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import ImageKit from 'imagekit-javascript'

import LogoWithTracks from '@components/LogoWithTracks'

const imageKit = new ImageKit({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL || '',
})

const font = fetch(new URL('../../fonts/Questrial-Regular.ttf', import.meta.url)).then(
  res => res.arrayBuffer(),
)

export const config = {
  runtime: 'edge',
}

// /api/ogImage?projectImageKey=images/3026414d-28ac-4d16-86ec-a8c684f23c3c.jpg&userImageKey=images/3026414d-28ac-4d16-86ec-a8c684f23c3c.jpg&title=2019%20Ford%20Ranger%20PX3&projectSlug=locked-and-lifted&username=lockedandlifted&userFullName=Twin%20Lockington

async function OGImage(req: NextRequest) {
  const { nextUrl: { searchParams } } = req

  const fontData = await font

  const projectImageKey = searchParams.get('projectImageKey')
  const projectSlug = searchParams.get('projectSlug')
  const title = searchParams.get('title')
  const userFullName = searchParams.get('userFullName')
  const userImageKey = searchParams.get('userImageKey')
  const username = searchParams.get('username')

  const imageUrl = projectImageKey ? imageKit.url({
    path: projectImageKey,
    transformation: [{
      focus: 'auto',
      height: '710',
      width: '568',
    }],
  }) : undefined

  const userImageUrl = userImageKey !== 'undefined' ? imageKit.url({
    path: userImageKey,
    transformation: [{
      focus: 'auto',
      height: '100',
      width: '100',
    }],
  }) : undefined

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          display: 'flex',
          fontFamily: 'Questrial',
          height: '100%',
          padding: '32px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <img
          width="440px"
          height="566px"
          src={imageUrl}
          style={{
            borderRadius: 50,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            marginLeft: '32px',
            width: '664px',
            height: '566px',
          }}
        >
          <LogoWithTracks height={100} width={231} />

          <span
            style={{
              fontSize: 48,
              fontStyle: 'normal',
              fontWeight: 'bold',
              lineHeight: 1,
              marginTop: 48,
            }}
          >
            {title}
          </span>

          <div
            style={{
              color: '#909090',
              fontSize: 36,
              fontWeight: 'bold',
              lineHeight: 1.3,
              marginTop: 16,
              maxWidth: '100%',
              overflow: 'hidden',
              textAlign: 'left',
              whiteSpace: 'pre-wrap',
            }}
          >
            {projectSlug}
          </div>

          {username !== 'undefined' && (
            <div
              style={{
                alignItems: 'center',
                borderTop: '3px solid #D1D1D1',
                display: 'flex',
                marginTop: 'auto',
                paddingTop: 32,
                width: '100%',
              }}
            >
              {!!userImageUrl && (
                <img
                  width="100px"
                  height="100px"
                  src={userImageUrl}
                  style={{
                    borderRadius: 100,
                    marginRight: 32,
                  }}
                />
              )}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 36,
                  }}
                >
                  {userFullName}
                </span>

                <span
                  style={{
                    color: '#909090',
                    fontSize: 32,
                  }}
                >
                  {username}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Questrial',
          data: fontData,
          style: 'normal',
        },
      ],
    },
  )
}

export default OGImage
