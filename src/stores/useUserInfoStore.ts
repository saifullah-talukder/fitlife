import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type UserInfoParams = {
  email: string | undefined
  userId: string | undefined
  username: string | undefined
}

type UserInfoStore = {
  user: UserInfoParams
  setUserInfo: <T extends keyof UserInfoParams>(key: T, value: UserInfoParams[T]) => void
  setEmpty: () => void
}

const emptyUser: UserInfoParams = {
  email: undefined,
  userId: undefined,
  username: undefined,
}

export const useUserInfoStore = create<UserInfoStore>()(
  devtools(
    persist(
      set => ({
        user: emptyUser,
        setUserInfo: (key, value) =>
          set(state => {
            const updatedUser = { ...state.user, [key]: value }
            return { user: updatedUser }
          }),

        setEmpty: () =>
          set(() => {
            return { user: emptyUser }
          }),
      }),
      { name: 'user-info-store' }
    )
  )
)
