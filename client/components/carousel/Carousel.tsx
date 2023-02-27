import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

import PlaySVGIcon from 'lib/Button/PlaySVGIcon'
import PauseSVGIcon from 'lib/Button/PauseSVGIcon'
import {
    CarouselMotionContainer,
    NextElementButton,
    NoCarouselContent,
} from 'components/carousel/'
import { Button } from 'lib/Button/'
import { ButtonFamily } from 'enums/'
import { FileDocument } from 'types/'

interface CarouselProps {
    currentFile: FileDocument | null
}

function Carousel({ currentFile }: CarouselProps) {
    const [isCarouselPaused, setIsCarouselPaused] = useState(true)
    const [carouselImages, setCarouselImages] = useState<ReactNode[]>([])

    const displayNextElement = () => {
        if (Array.isArray(carouselImages) && carouselImages.length > 0) {
            setCarouselImages(state => {
                const arr = state.slice()
                const first = arr.shift()
                // @ts-ignore
                arr.push(first)
                return arr
            })
        }
    }

    const handleNextElementClick = useCallback(() => {
        displayNextElement()
    }, [])

    useEffect(() => {
        const images = currentFile
            ? Array.from({ length: currentFile.pageNo }).map((_, i) => {
                  const imgIndex = i + 1
                  const imgUrl = `${String(
                      process.env.NEXT_PUBLIC_SERVER_HOST_URL,
                  )}/static/${currentFile.originalName}.${imgIndex}.png`

                  return (
                      <Image
                          width={700}
                          height={350}
                          alt={currentFile.originalName}
                          key={`${currentFile.id}_${i}`}
                          src={imgUrl}
                      />
                  )
              })
            : []

        setCarouselImages(images)
    }, [currentFile])

    useEffect(() => {
        let interval: any

        if (!isCarouselPaused) {
            interval = setInterval(() => {
                displayNextElement()
            }, 2000)
        }

        return function removeInterval() {
            clearInterval(interval)
        }
    }, [isCarouselPaused])

    return (
        <div className="overflow-x">
            <div
                data-testid="carousel"
                className="border-slate-100  border-solid  pl-10 pr-10 last:pl-0 mt-2 place-content-end flex gap-10 "
            >
                {/* TODO: change to factory button  */}
                <NextElementButton
                    handleNextElementClick={handleNextElementClick}
                />

                {carouselImages.length > 0 ? (
                    <CarouselMotionContainer>
                        {carouselImages}
                    </CarouselMotionContainer>
                ) : (
                    <NoCarouselContent />
                )}

                <div
                    onClick={() => setIsCarouselPaused(!isCarouselPaused)}
                    className={classNames('w-40 h-40 flex rounded', {
                        hidden: !currentFile,
                    })}
                >
                    {isCarouselPaused && carouselImages.length > 0 ? (
                        <Button family={ButtonFamily.PLAY}>
                            <PlaySVGIcon />
                        </Button>
                    ) : (
                        <Button family={ButtonFamily.PAUSE}>
                            <PauseSVGIcon />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Carousel
