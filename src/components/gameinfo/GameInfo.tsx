import React, { FC, memo } from 'react';
import { Player } from '../../features/deck/deckConstants';
import { useLastCard } from '../../features/deck/deckHooks';
import { Card } from '../../features/deck/deckModels';
import { CardImage } from '../core/CardImage';
import { Score } from './Score';
import GameInfoCss from './GameInfo.module.css';

interface ScoreProps {
    readonly playerName: Player;
    readonly isExpanded: boolean;
}

export const GameInfo: FC<ScoreProps> = memo(function GameInfoComponent({
    playerName,
    isExpanded,
}: ScoreProps) {
    const lastCard: Card = useLastCard(playerName);

    return (
        <div className={`${GameInfoCss.GameInfo} ${!isExpanded && GameInfoCss['GameInfo--Full']}`}>
            <h3 className={GameInfoCss.PlayerName}>{playerName ? 'Computer' : 'Player'}</h3>
            <Score playerName={playerName} />
            {lastCard && (
                <div className={GameInfoCss.DrawnCards}>
                    <span className={GameInfoCss.DrawnCards__Text}>Drawn card:</span>
                    <CardImage code={lastCard.code} imageUrl={lastCard.image} />
                </div>
            )}
        </div>
    )
});