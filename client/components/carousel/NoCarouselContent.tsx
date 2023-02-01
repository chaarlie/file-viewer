import React from 'react'

function NoCarouselContent() {
    return (
        <div data-testid="no-content" className="flex justify-center items-center  w-full">
            <div className="w-40 h-40 flex">
                <div className="self-center">
                    <h2 className="block text-lg capitalize">no content</h2>
                </div>
            </div>
        </div>
    )
}

export default NoCarouselContent
