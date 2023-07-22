import { getServerSession } from 'next-auth/next'
import type { GetServerSideProps } from 'next'

import setTemporaryUserIdCookie from '@utils/setTemporaryUserIdCookie'

import { authOptions } from '@pages/api/auth/[...nextauth]'

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
  const temporaryUserId = setTemporaryUserIdCookie(context)

  const session = await getServerSession(
    context.req,
    context.res,
    authOptions(context.req, context.res),
  )

  if (!session) {
    return {
      redirect: {
        destination: '/users/login?redirect=/projects/new',
        permanent: false,
      },
    }
  }

  return { props: { temporaryUserId } }
}

export default NewProjectPage
