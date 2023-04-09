import App from './app'
import { hydrateRoot } from "react-dom/client";
import { StoreProvider } from './fakeStore';

if (typeof document != 'undefined' && typeof window != 'undefined') {
    // @ts-ignore
    window.BOOT = function () {
        const rootElement = document?.getElementById("app") ?? document.body
        hydrateRoot(rootElement, <StoreProvider value={{}}>
            <App />
        </StoreProvider>
        )
    }
} else {
    // eslint-disable-next-line no-console
    console.error('Nor document nor window object found')
}
