export const useDataSuspense = (getPromise: () => Promise<any>, loaded: boolean = false) => {
    const result = loaded ? true : getPromise()
    console.log('useDataSuspense', loaded, result)
    if (!loaded) {
        throw result
    }
    return result
}