'use client'

import App from '@/components/app'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { Amplify } from 'aws-amplify'
import awsExports from '../aws-exports'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
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
      {({ user, signOut }) => <App user={user} signOut={signOut} />}
    </Authenticator>
  )
}
