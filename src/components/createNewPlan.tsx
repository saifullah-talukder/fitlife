import { UseAuthenticator } from '@aws-amplify/ui-react-core'
import { AuthUser } from 'aws-amplify/auth'
export type SignOut = UseAuthenticator['signOut']

type CreateNewPlanProps = {
  signOut?: UseAuthenticator['signOut']
  user?: AuthUser
}

export default function CreateNewPlan(props: CreateNewPlanProps) {
  console.log(props.user)
  return <div className="mt-10">createNewPlan</div>
}
