import { useDataSuspense } from "./useDataSuspense"
import { Suspense, useCallback } from 'react'
import { useFakeStore } from "./fakeStore"
const HomePage = () => {
    const [state, setDataToStore] = useFakeStore()
    // Call to the function which loads the initial data has to happen befor 
    // useDataSuspense hooks
    const getData = useCallback(() => {
        return new Promise((res) => {
            console.log('HomePage > Promise start ', state)
            if (state.loaded) {
                res(true)
            }
            setTimeout(() => {
                console.log('HomePage > Promise resolved ', state)
                setDataToStore({ loaded: true })
                res(true)
            }, 5000)
        })
    }, [])
    useDataSuspense(getData, state.loaded)
    // below jsx uses the data that is fetched 
    return <div>
        <div>HOME LOADED SUSSCESSFULLY</div>
        <div>{JSON.stringify(state)}</div>
    </div>
}
export const App = () => {
    return <div>
        <div>MAIN APP LOADED</div>
        <Suspense fallback={"Home is loading"}>
            <HomePage />
        </Suspense>
    </div>


}
export default App