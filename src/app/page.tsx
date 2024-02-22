'use client'

import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../aws-exports'
import { Amplify } from 'aws-amplify'
import CreateNewPlan from '@/components/createNewPlan'
Amplify.configure(awsExports)

const formFields = {
  signIn: {
    username: {
      placeholder: 'Enter Your Email Here',
      isRequired: true,
      label: 'Email',
    },
  },
}

const components = {
  Header() {
    return <div className="mt-20"></div>
  },
}

export default function Home() {
  return (
    <Authenticator components={components} formFields={formFields}>
      {({ user, signOut }) => <CreateNewPlan user={user} signOut={signOut} />}
    </Authenticator>
  )
}
