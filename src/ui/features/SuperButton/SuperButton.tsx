import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './SuperButton.module.css'
import {ButtonStyledProps, StyledButton} from "./SuperButton.style";

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & ButtonStyledProps & {
    red?: boolean
    name: string
}

const SuperButton: React.FC<SuperButtonPropsType> = (
    {
        red, className, name,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${red ? s.red : s.default} ${className} ${s.button}`


    return (
        // @ts-ignore
        <StyledButton
            // className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        >{name}</StyledButton>
    )
}

export default SuperButton;
