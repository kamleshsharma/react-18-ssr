import React, { useContext } from 'react'
export const StoreContext = React.createContext<{ getState: any, updateStore: (data: any) => void }>({ getState: {}, updateStore: (data) => { } })

export const getStore = () => {
    let state = {}
    return {
        getState: () => state,
        updateStore: (data: any) => {
            console.log('update the actual store')
            state = { ...state, ...data }
        }
    }
}
export const StoreProvider = (props: any) => {
    const { children, store } = props
    return <StoreContext.Provider value={store}>
        {children}
    </StoreContext.Provider>
}
export const useFakeStore = () => {
    const { getState, updateStore } = useContext(StoreContext)
    return [getState(), updateStore]
}