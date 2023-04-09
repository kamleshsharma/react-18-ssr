import { Suspense } from 'react'
import HomePage from "./HomePage"
export const App = () => {
    return <div>
        <div>MAIN APP LOADED</div>
        <Suspense fallback={"Home is loading"}>
            <HomePage />
        </Suspense>
    </div>


}
export default App