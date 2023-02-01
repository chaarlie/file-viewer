import React, { ButtonHTMLAttributes, ReactElement, ReactNode } from 'react'
import classNames from 'classnames'

import { ButtonFamily } from 'enums/'

interface ButtonProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    children: ReactNode
    family: ButtonFamily
    className?: string | object
}

function Button({
    children,
    family,
    className,
    ...props
}: ButtonProps): ReactElement {
    const defaultClasses = classNames('rounded-lg capitalize', family)

    if (typeof className === 'string') {
        props = {
            ...props,
            ...{ className: classNames(className, defaultClasses) },
        }
    } else {
        props = {
            ...props,
            ...{
                className: classNames({ ...className }, defaultClasses),
            },
        }
    }

    return <button {...props}>{children}</button>
}

export default Button
