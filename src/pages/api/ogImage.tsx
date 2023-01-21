import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import ImageKit from 'imagekit-javascript'

import LogoWithTracks from '@components/LogoWithTracks'

const imageKit = new ImageKit({
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT_URL || '',
})

export const config = {
  runtime: 'edge',
}

// /api/ogImage?projectImageKey=images/3026414d-28ac-4d16-86ec-a8c684f23c3c.jpg&userImageKey=images/3026414d-28ac-4d16-86ec-a8c684f23c3c.jpg&title=2019%20Ford%20Ranger%20PX3&projectSlug=locked-and-lifted&username=lockedandlifted&userFullName=Twin%20Lockington

function OGImage(req: NextRequest) {
  const { nextUrl: { searchParams } } = req

  const projectImageKey = searchParams.get('projectImageKey')
  const projectSlug = searchParams.get('projectSlug')
  const title = searchParams.get('title')
  const userFullName = searchParams.get('userFullName')
  const userImageKey = searchParams.get('userImageKey')
  const username = searchParams.get('username')
  console.log(username)

  const imageUrl = imageKit.url({
    path: projectImageKey,
    transformation: [{
      focus: 'auto',
      height: '710',
      width: '568',
    }],
  })

  const userImageUrl = imageKit.url({
    path: userImageKey,
    transformation: [{
      focus: 'auto',
      height: '100',
      width: '100',
    }],
  })

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          display: 'flex',
          fontFamily: 'Helvetica-Bold',
          height: '100%',
          padding: '32px',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <img
          width="440px"
          height="536px"
          src={imageUrl}
          style={{
            borderRadius: 50,
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '32px',
            width: '664px',
            height: '536px',
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

          <span
            style={{
              color: '#909090',
              fontSize: 36,
              fontWeight: 'bold',
              lineHeight: 1,
              marginTop: 16,
            }}
          >
            {projectSlug}
          </span>

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
            <img
              width="100px"
              height="100px"
              src={userImageUrl}
              style={{
                borderRadius: 100,
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                marginLeft: 32,
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
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  )
}

export default OGImage
