import React, { FC, memo } from 'react';
import { Player } from '../../features/deck/deckConstants';
import { useRemaining, useScore } from '../../features/deck/deckHooks';
import styled from 'styled-components';

const StyledScore = styled.h3`
    margin: 0;
    text-align: center;
`;

interface ScoreProps {
    readonly playerName: Player;
}

export const Score: FC<ScoreProps> = memo(({ playerName }) => {
    const remaining: number | undefined = useRemaining();
    const score: number = useScore(playerName);
    const oponentScore: number = useScore(+!playerName);

    if (remaining === 0) {
        if (score > oponentScore) {
            return <StyledScore>YOU WIN!</StyledScore>;
        } else if (score < oponentScore) {
            return <StyledScore>YOU LOSE!</StyledScore>;
        } else {
            return <StyledScore>DRAW</StyledScore>;
        }
    }
    
    return (
        <StyledScore>Score: {score}</StyledScore>
    );
});