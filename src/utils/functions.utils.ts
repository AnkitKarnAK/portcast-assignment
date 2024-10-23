// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function Throttle(func: Function, delay: number) {
    let wait = false

    return (...args: unknown[]) => {
        if (wait) {
            return
        }

        func(...args)
        wait = true
        setTimeout(() => {
            wait = false
        }, delay)
    }
}