import React, { memo, MouseEventHandler } from 'react'

interface NextElementButtonProps {
    handleNextElementClick: MouseEventHandler<HTMLButtonElement>
}

function NextElementButton({ handleNextElementClick }: NextElementButtonProps) {
    return (
        <button
            onClick={handleNextElementClick}
            className="text-9xl -mt-6 font-bold cursor-pointer text-sky-400 hover:text-sky-600"
        >
            &#8249;
        </button>
    )
}

export default memo(NextElementButton)
