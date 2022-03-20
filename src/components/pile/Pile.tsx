import React, { FC, memo } from 'react';
import styled from 'styled-components';
import { Player } from '../../features/deck/deckConstants';
import { usePile } from '../../features/deck/deckHooks';
import { Card, Pile } from '../../features/deck/deckModels';
import { Button } from '../core/Button';
import { CardImage } from '../core/CardImage';
import PileCss from './Pile.module.css';

const StyledPile = styled.div`
    display: flex;
    align-items: center;
`;

interface PileProps {
    readonly playerName: Player;
    readonly isExpanded: boolean;
    readonly onHandleToggleExpanded: () => void;
}

export const PlayerPile: FC<PileProps> = memo(({
    playerName,
    isExpanded,
    onHandleToggleExpanded,
}) => {
    const pile: Pile = usePile(playerName);

    return (
        <StyledPile>
            <Button 
                className={PileCss.ShowPileBtn}
                type="button"
                text={isExpanded ? 'Hide Pile' : 'Show Pile'} 
                onClick={onHandleToggleExpanded} 
            />
            <div className={PileCss.Pile}>
                {isExpanded && pile.cards.map(({ image, code }: Card) => (
                    <CardImage key={code} code={code} imageUrl={image} />
                ))}
            </div>
        </StyledPile>
    );
});