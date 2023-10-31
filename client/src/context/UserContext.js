import { createContext, useContext } from 'react'

const UserContext = createContext({})

const UserProvider = UserContext.Provider

function useUserContext() {
  return useContext(UserContext)
}

export { UserContext, UserProvider, useUserContext }
