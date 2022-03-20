import React, { ButtonHTMLAttributes, FC, memo } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<any> {
    readonly text: string;
    readonly onClick: () => void;
}

const StyledButton = styled.button`
    padding: 20px;
    width: fit-content;
    cursor: pointer;
`;

export const Button: FC<ButtonProps> = memo(function ButtonComponent({
    text,
    onClick,
    ...restOfProps
}: ButtonProps) {
    return (
        <StyledButton 
            onClick={onClick} 
            {...restOfProps}
        >
            {text}
        </StyledButton>
    )
})