import React from 'react'

import { Button } from 'lib/Button/'
import { ButtonFamily } from 'enums/'

interface UploadButtonProps {
    handleFormSubmit: React.MouseEventHandler<HTMLElement>
}

function UploadButton({ handleFormSubmit }: UploadButtonProps) {
    return (
        <Button family={ButtonFamily.FILLED} onClick={handleFormSubmit}>
            Submit
        </Button>
    )
}

export default UploadButton
