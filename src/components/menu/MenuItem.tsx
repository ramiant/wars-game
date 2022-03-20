import React, { FC, memo } from "react";
import styled from "styled-components";
import { useLoading } from "../../features/deck/deckHooks";
import { Button } from "../core/Button";

interface MenuItemProps {
    readonly disabled?: boolean;
    readonly value: string;
    readonly onHandleClick: () => void;
}

const StyledMenuItem = styled.div`
    margin-left: 20px;
`;

export const MenuItem: FC<MenuItemProps> = memo(({
    value,
    disabled,
    onHandleClick,
}) => {
    const loading: boolean = useLoading();

    return (
        <StyledMenuItem>
            <Button text={value} type="button" onClick={onHandleClick} disabled={disabled || loading} />
        </StyledMenuItem>
    );
});