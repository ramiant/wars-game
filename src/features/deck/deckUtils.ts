import { CardValue } from "./deckConstants";
import { Card } from "./deckModels";

export function cardValueToNumber(cardValue: CardValue) {
    if (cardValue === CardValue.ace) {
        return 15;
    }

    if (cardValue === CardValue.king) {
        return 14;
    }

    if (cardValue === CardValue.queen) {
        return 13;
    }

    if (cardValue === CardValue.jack) {
        return 12;
    }

    return +cardValue;
}

export function getLSDeckId(): string {
    return localStorage.getItem('deckId') || '';
}

export function getLSLastCards(): Card[] {
    const lastCards: string | null = localStorage.getItem('lastCards');
    return lastCards ? JSON.parse(lastCards) : [];
}

export function compareCards(card1: Card, card2: Card) {
    return card1.code;
}
