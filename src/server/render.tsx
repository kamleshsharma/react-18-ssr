import { Request, Response } from 'express'
import path from 'path'
import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import App from '../app/app'
import { StoreProvider, getFakeStore } from '../app/fakeStore'

export async function renderer(req: Request, res: Response) {
  console.log('Starting renderer for ', req.url)
  let hasError = false
  const store = getFakeStore()
  const stream = renderToPipeableStream(
    <React.StrictMode>
      <StoreProvider store={store}>
        <App />
      </StoreProvider>
    </React.StrictMode>,
    {
      bootstrapScripts: [path.join('build', 'client', 'main.js')],
      onShellReady() {
        console.log('onShellReady')
        /**
         * here you will usually set response header as soon as the shell is ready
         * We wont be passing anything here as there is posiblity that 
         * some suspense might fail and you want to update the header to error
         * to avoid caching error on the CDN ro browser
         */
      },
      onAllReady() {
        /**
         * The content above all Suspense boundaries is ready.
         * If something errored before we started streaming, we set the error code appropriately.
         * Since all the component has been rendered we have opportunity to
         * attach any style tags or meta tag before streaming response to client
         */
        if (hasError) {
          return
        }
        console.log('onAllReady')
        res.statusCode = 200
        const updatedState = store.getState()
        const updatedStateStringify = JSON.stringify(updatedState)
        res.write(`
        <html>
          <head>
            <script>
             window.__INIT_STATE__ = ${updatedStateStringify}
            </script>
          </head>
          <body>
            <div id="app">`)
        stream.pipe(res)
        res.end(`
             </div>
           </body>
        </html>
        `)
      },
      onError(err: any) {
        /**
         * We can still pass the state on error and 
         * fallback to client side rendering
         */
        const updatedState = store.getState()
        const updatedStateStringify = JSON.stringify(updatedState)
        console.log('onError', err)
        hasError = true
        res.statusCode = 200
        res.write(`
        <html>
          <head>
            <script>
               window.__INIT_STATE__ = ${updatedStateStringify}
            </script>
          </head>
          <body>
            <div id="app">
            </div>
          </body>
        </html>`)
      }
    }
  )
  /**
   * Setting timeout for worse case
   */
  setTimeout(() => {
    stream.abort()
    res.end(`<div>Error Timeout</div>`)
  }, 10000)
}