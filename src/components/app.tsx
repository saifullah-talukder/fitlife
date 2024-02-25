import { useWindowSize } from '@/hooks/useWindowSize'
import { AxiosClient } from '@/network/AxiosClient'
import { useUserInfoStore } from '@/stores/useUserInfoStore'
import { UseAuthenticator } from '@aws-amplify/ui-react-core'
import { AuthUser } from 'aws-amplify/auth'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { SecondaryActionButton } from './button'
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
  const [isHistoryLoading, setIsHistoryLoading] = useState(false)
  const [historyError, setHistoryError] = useState('')
  const [plans, setPlans] = useState([])
  const [fetchFlag, setFetchFlag] = useState(0)
  const { width } = useWindowSize()

  useEffect(() => {
    fetchPlans()
  }, [fetchFlag])

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

  const fetchPlans = async () => {
    setIsHistoryLoading(true)
    AxiosClient.get(`${process.env.PLAN_API_URL}/list?userId=${user.userId}`)
      .then((res: any) => setPlans(res.data.plans.reverse()))
      .catch((err: any) => setHistoryError(String(err)))
      .finally(() => setIsHistoryLoading(false))
  }

  return (
    <div className="relative pt-6">
      <SecondaryActionButton
        iconLeft={<FiLogOut size={16} />}
        className={classNames('absolute right-4 bg-zinc-50', { 'top-4': width >= 768, 'bottom-4': width < 768 })}
        label="Sign Out"
        onClick={() => {
          if (props.signOut) {
            props.signOut()
          }
        }}
      />
      <div className="flex gap-x-4 items-center justify-center">
        <img src="./images/fitness.png" className="size-10" alt="" />
        <h1 className="text-center text-xl md:text-3xl font-semibold text-slate-700">
          Welcome to <span className="text-fuchsia-600">FitLife</span>
          <br className="lg:hidden" />
          <span className="text-slate-500 text-base md:text-2xl px-2">{user.email}</span>
        </h1>
      </div>

      <p className="text-center text-sm md:text-base text-slate-700 mt-2 mx-2 md:mx-10">
        We are here to help with amazing nutrition and workout plans so than you can live a healthy and fullfilling
        life!
      </p>

      <div className="mt-4 mx-4 md:mx-20 lg:mx-40 xl:mx-60 rounded-xl bg-white p-4">
        <TabMenu activeTabId={activeTabId} items={tabItems} onTabClick={tabId => setActiveTabId(tabId)} />
        {activeTabId === 'create-new-plan' ? (
          <CreateNewPlan setFetchFlag={setFetchFlag} />
        ) : (
          <History setFetchFlag={setFetchFlag} plans={plans} isLoading={isHistoryLoading} error={historyError} />
        )}
      </div>
      <div className="h-16"></div>
    </div>
  )
}
