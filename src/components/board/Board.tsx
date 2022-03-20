import React, { FC, memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Player } from '../../features/deck/deckConstants';
import { GameInfo } from '../gameinfo/GameInfo';
import { PlayerPile } from '../pile/Pile';

const StyledBoard = styled.div`
    display: flex;
    flex: 1;
    ${(props: Partial<BoardProps>) => props.borderPosition?.map((border: string) => `border-${border}: 1px solid black;`).join(';')}
    padding: 20px;
`;

interface BoardProps {
    readonly playerName: Player;
    readonly borderPosition?: string[];
}

export const Board: FC<BoardProps> = memo(function BoardComponent({ 
    children,
    playerName,
    borderPosition,
}) {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const onHandleToggleExpanded = useCallback(() => {
        setIsExpanded((prevShowFile: boolean) => !prevShowFile);
    }, []);

    return (
        <StyledBoard borderPosition={borderPosition}>
            <PlayerPile playerName={playerName} isExpanded={isExpanded} onHandleToggleExpanded={onHandleToggleExpanded} />
            <GameInfo playerName={playerName} isExpanded={isExpanded} />
        </StyledBoard>
    );
});