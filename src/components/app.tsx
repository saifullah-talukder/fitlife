import { useUserInfoStore } from '@/stores/useUserInfoStore'
import { UseAuthenticator } from '@aws-amplify/ui-react-core'
import { AuthUser } from 'aws-amplify/auth'
import { useEffect, useState } from 'react'
import CreateNewPlan from './createNewPlan'
import History from './history'
import TabMenu from './tabMenu'

type AppProps = {
  signOut?: UseAuthenticator['signOut']
  user?: AuthUser
}

type TabID = 'create-new-plan' | 'history'

const tabItems = [
  {
    label: 'Create New Plan',
    id: 'create-new-plan',
  },
  {
    label: 'History',
    id: 'history',
  },
] as const

export default function App(props: AppProps) {
  const [activeTabId, setActiveTabId] = useState<TabID>('create-new-plan')
  const { user, setUserInfo } = useUserInfoStore()

  useEffect(() => {
    if (props.user?.signInDetails?.loginId) {
      setUserInfo('email', props.user?.signInDetails?.loginId)
    }
    if (props.user?.userId) {
      setUserInfo('userId', props.user?.userId)
    }
    if (props.user?.username) {
      setUserInfo('username', props.user?.username)
    }
  }, [props.user])

  return (
    <div className="pt-6">
      <div className="flex gap-x-4 items-center justify-center">
        <img src="./images/fitness.png" className="size-10" alt="" />
        <h1 className="text-center text-3xl font-semibold text-slate-700">
          Welcome to fitlife, <span className="text-slate-500 text-2xl px-2">{user.email}</span>
        </h1>
      </div>

      <p className="text-center text-slate-700 mt-2">
        We are here to help with amazing nutrition and workout plans so than you can live a healthy and fullfilling
        life!
      </p>

      <div className="mt-4 mx-20 rounded-xl bg-white p-4">
        <TabMenu activeTabId={activeTabId} items={tabItems} onTabClick={tabId => setActiveTabId(tabId)} />
        {activeTabId === 'create-new-plan' ? <CreateNewPlan /> : <History />}
      </div>
    </div>
  )
}
