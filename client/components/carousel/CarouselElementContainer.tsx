import React, { ReactNode, useState } from 'react'
import Modal from 'react-modal'

interface CarouselElementContainerProps {
    children: ReactNode
}

function CarouselElementContainer({ children }: CarouselElementContainerProps) {
    const [modalIsOpen, setIsOpen] = useState(false)

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            border: 'none',
            transform: 'translate(-50%, -50%)',
        },
    }

    return (
        <div
            data-testid="carousel-item"
            className="bg-slate-100 shadow-2xl w-40 h-40 rounded relative"
        >
            <button
                onClick={() => setIsOpen(!modalIsOpen)}
                className="bg-sky-300 hover:bg-sky-400  active:bg-sky-500 block active:mt-[0.5px] absolute  p-0.5 text-xs rounded text-white  left-[calc(100%-2rem)]"
            >
                <Modal isOpen={modalIsOpen} style={customStyles}>
                    <div className="flex-col">
                        <div className="relative   ">
                            <button className="absolute left-[calc(100%-3rem)]   mt-3 text-2xl block">
                                X
                            </button>
                        </div>

                        <div className="bg-slate-50 flex justify-center bg-gradient-to-b from-slate-100 to-transparent  w-[85vw]  h-[50vw]  rounded-lg">
                            <span className="self-center">{children}</span>
                        </div>
                    </div>
                </Modal>
                <span className="">view</span>
            </button>
            {children}
        </div>
    )
}

export default CarouselElementContainer
