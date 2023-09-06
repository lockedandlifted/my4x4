import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import ImageKit from 'imagekit-javascript'

import CommentIcon from '@components/Icons/CommentIcon'
import LicensePlateLogo from '@components/LicensePlateLogo'
import LikeIcon from '@components/Icons/LikeIcon'

import BackgroundImage from '@assets/post-og-background.jpg'

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

// /api/ogImages/post?categoryTitle=General&postImageKey=images/3026414d-28ac-4d16-86ec-a8c684f23c3c.jpg&commentCount=1&likeCount=1&title=2019%20Ford%20Ranger%20PX3

async function post(req: NextRequest) {
  const { nextUrl: { searchParams } } = req

  const rubikBoldFontData = await rubikBoldFont
  const rubikRegularFontData = await rubikRegularFont

  const categoryTitle = searchParams.get('categoryTitle')
  const commentCount = searchParams.get('commentCount')
  const likeCount = searchParams.get('likeCount')
  const postImageKey = searchParams.get('postImageKey')
  const title = searchParams.get('title')

  const imageUrl = postImageKey !== 'undefined' ? imageKit.url({
    path: postImageKey,
    transformation: [{
      focus: 'auto',
      height: '630',
      width: '1200',
    }],
  }) : undefined

  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url(${imageUrl})`,
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
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: 25,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              padding: 50,
              width: 845,
              maxHeight: '100%',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                backgroundColor: '#fff500',
                borderRadius: 5,
                display: 'flex',
                justifyContent: 'center',
                marginRight: 'auto',
                padding: 10,
                width: 'auto',
              }}
            >
              <span
                style={{
                  alignItems: 'center',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                }}
              >
                {categoryTitle}
              </span>
            </div>

            <span
              style={{
                fontSize: 48,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 1.3,
                marginTop: 32,
              }}
            >
              {title}
            </span>

            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'row',
                fontSize: 20,
                fontWeight: 400,
                lineHeight: 1.3,
                marginTop: 32,
                maxWidth: '100%',
                textAlign: 'left',
                whiteSpace: 'pre-wrap',
              }}
            >
              <LikeIcon height={20} width={20} />

              <span style={{ marginLeft: 4, marginRight: 15 }}>{likeCount} Likes</span>

              <CommentIcon height={20} width={20} />

              <span style={{ marginLeft: 4 }}>{commentCount} Comments</span>

            </div>

            <div style={{
              display: 'flex',
              marginLeft: 'auto',
              marginBottom: -95,
            }}
            >
              <LicensePlateLogo height={100} width={231} />
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

export default post
