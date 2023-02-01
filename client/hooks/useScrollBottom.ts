import { useState } from 'react'

export const useScrollBottom = () => {
    const [elId, setElId] = useState('')

    setTimeout(() => {
        if (typeof document !== 'undefined') {
            const list = document?.getElementById(elId)
            if (list) {
                // @ts-ignore
                list.scrollTop = list.scrollHeight
            } else {
                console.error(`element with id ${elId} not found`)
            }
        }
    }, 100)

    return { setElId }
}
