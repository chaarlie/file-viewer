import React, { ReactNode } from 'react'

import { CarouselElementContainer } from 'components/carousel/'

interface CarouselMotionContainerProps {
    children: ReactNode[]
}

function CarouselMotionContainer({ children }: CarouselMotionContainerProps) {
    return (
        <div className="flex w-full overflow-hidden">
            <div className="flex gap-8">
                {children?.map((el, i) => (
                    <CarouselElementContainer key={i}>
                        {el}
                    </CarouselElementContainer>
                ))}
            </div>
        </div>
    )
}

export default CarouselMotionContainer
