import React, { MouseEventHandler } from 'react'

import { Button } from 'lib/Button/'
import { ButtonFamily } from 'enums/'

interface CancelUploadButtonProps {
    handleFormCancel: MouseEventHandler<HTMLElement>
}

function CancelUploadButton({ handleFormCancel }: CancelUploadButtonProps) {
    return (
        <Button family={ButtonFamily.OUTLINE} onClick={handleFormCancel}>
            cancel
        </Button>
    )
}

export default CancelUploadButton
