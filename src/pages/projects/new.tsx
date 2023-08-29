import type { GetServerSideProps } from 'next'

import setTemporaryUserIdCookie from '@utils/setTemporaryUserIdCookie'
import { getServerSession } from '@utils/kindeAuth'

import MobileLayout from '@layouts/MobileLayout'

import ProjectForm from '@components/ProjectForm'

const NewProjectPage = () => (
  <MobileLayout>
    <ProjectForm />
  </MobileLayout>
)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const temporaryUserId = setTemporaryUserIdCookie(context)

  const session = await getServerSession(context)

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
