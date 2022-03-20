import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Player } from '../../features/deck/deckConstants';
import { Board } from '../board/Board';
import { Menu } from '../menu/Menu';

interface LayoutProps {
    readonly flexDirection: string;
}

const StyledGameLayout = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    flex-direction: ${(props: LayoutProps) => props.flexDirection}
`;

export const GameLayout: FC<LayoutProps> = memo(({ 
    children,
    flexDirection,
}) => {
    return (
        <StyledGameLayout flexDirection={flexDirection} >
            <Menu />
            <Board playerName={Player.Player} borderPosition={['top']} /> 
            <Board playerName={Player.Computer} borderPosition={['top', 'bottom']} />
        </StyledGameLayout>
    );
});