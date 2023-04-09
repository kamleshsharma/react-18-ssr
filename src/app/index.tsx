import App from './app'
import { hydrateRoot } from "react-dom/client";
import { getFakeStore, StoreProvider } from './fakeStore';

const rootElement = document?.getElementById("app") ?? document.body
const store = getFakeStore((window as any).__INIT_STATE__ || {})
hydrateRoot(rootElement, <StoreProvider value={store}>
    <App />
</StoreProvider>
)

