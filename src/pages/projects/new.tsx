import type { GetServerSideProps } from 'next'

import setTemporaryUserIdCookie from '@utils/setTemporaryUserIdCookie'
import { getServerAuthSession } from '@utils/getServerSession'

import MobileLayout from '@layouts/MobileLayout'

import ProjectForm from '@components/ProjectForm'

const NewProjectPage = () => (
  <MobileLayout>
    <ProjectForm />
  </MobileLayout>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const temporaryUserId = setTemporaryUserIdCookie(context)

  const session = await getServerAuthSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/users/login?callback_url=/projects/new',
        permanent: false,
      },
    }
  }

  return { props: { temporaryUserId } }
}

export default NewProjectPage
