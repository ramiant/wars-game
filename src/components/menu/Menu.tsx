import React, { FC, memo, useCallback } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../app/hooks";
import { useRemaining } from "../../features/deck/deckHooks";
import { drawCardsThunk, newDeckThunk } from "../../features/deck/deckSlice";
import { MenuItem } from "./MenuItem";

const StyledMenu = styled.div`
    display: flex;
    order: 1;
    justify-content: center;
    margin: 20px;
`;

export const Menu: FC = memo(() => {
    const remaining = useRemaining();
    const dispatch = useAppDispatch();

    const onHandleNewGame = useCallback(() => {
        dispatch(newDeckThunk());
    }, [dispatch]);

    const onHandleDrawCards = useCallback(() => {
        dispatch(drawCardsThunk());
    }, [dispatch]);

    return (
        <StyledMenu>
            <MenuItem value="New Game" onHandleClick={onHandleNewGame} />
            <MenuItem value="Draw Cards" onHandleClick={onHandleDrawCards} disabled={!remaining} />
        </StyledMenu>
    );
})