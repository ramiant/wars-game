import { CardSuit, CardValue, Player } from "./deckConstants";

export interface Card {
    readonly image: string;   
    readonly value: CardValue;
    readonly images: {
        readonly svg: string;
        readonly png: string;
    };
    readonly suit: CardSuit;  
    readonly code: string; 
}

export interface Pile {
    readonly remaining: number;
    readonly cards: Card[];
}

export type Piles = Record<Player, Pile>;