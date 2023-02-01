import React from 'react'

function PlayCarouselButton() {
    return (
        <button className="bg-sky-400 hover:bg-sky-500 p-2 rounded-full m-auto">
            <svg
                className="hover:text-slate-50 h-12 w-12 text-white"
                viewBox="0 0 20 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {' '}
                <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
        </button>
    )
}

export default PlayCarouselButton
