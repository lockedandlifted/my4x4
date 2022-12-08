import type { GetServerSideProps } from 'next'

import setTemporaryUserIdCookie from '@utils/setTemporaryUserIdCookie'

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
  return { props: { temporaryUserId } }
}

export default NewProjectPage
