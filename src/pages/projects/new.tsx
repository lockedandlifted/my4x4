import cuid from 'cuid'
import { getCookie, setCookie } from 'cookies-next'

import type { GetServerSideProps } from 'next'

import MobileLayout from '@layouts/MobileLayout'

import ProjectForm from '@components/ProjectForm'

const NewProjectPage = (props: { temporaryUserId: string }) => {
  const { temporaryUserId } = props

  return (
    <MobileLayout>
      <ProjectForm temporaryUserId={temporaryUserId} />
    </MobileLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context

  const cookieKey = 'my4x4-temporary-user-id'
  const temporaryUserId = getCookie(cookieKey, { req, res }) ?? cuid()

  setCookie(cookieKey, temporaryUserId, { req, res, maxAge: 86400 * 31 }) // Expires in 31 days

  return { props: { temporaryUserId } }
}

export default NewProjectPage
