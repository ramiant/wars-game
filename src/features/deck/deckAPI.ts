import { Card, Piles } from "./deckModels";

export const apiUrl: string = 'https://deckofcardsapi.com/api/deck';

export type DeckResponse<T = {}> = {
    readonly success: boolean;
    readonly deck_id: string;
    readonly remaining: number;
    readonly error?: string;
} & T;

export type GetDrawDeckResponse = DeckResponse<{
    readonly shuffled: boolean;
}>;

// GetShuffledDeck API
export interface GetShuffledDeckOptions {
    readonly deck_count: number;
}

export type GetShuffledDeckResponse = GetDrawDeckResponse & {
    readonly shuffled: true;
};

export async function getResource<T = any>(resourceUrl: string): Promise<T> {
    const response: Response = await fetch(`${apiUrl}/${resourceUrl}`);
    return response.json();
}

export async function getShuffledDeck(options: GetShuffledDeckOptions = { deck_count: 1 }): Promise<GetShuffledDeckResponse> {
    return getResource<GetShuffledDeckResponse>(`new/shuffle/?deck_count=${options.deck_count}`);
}

// AddToPile API

export interface AddToPileOptions {
    readonly deckId: string;
    readonly pileName: string;
    readonly cards: string[];
}

export type AddToPileResponse = DeckResponse<{
    readonly piles: Piles;
}>;


export async function addToPile({ cards, deckId, pileName }: AddToPileOptions): Promise<AddToPileResponse> {
    return getResource<AddToPileResponse>(`${deckId}/pile/${pileName}/add/?cards=${cards.join(',')}`);
}

// GetPile API

export interface GetPileOptions {
    readonly deckId: string;
    readonly pileName: string;
}

export type GetPileResponse = DeckResponse<{
    readonly piles: Piles;
}>;

export async function getPile({ deckId, pileName }: GetPileOptions): Promise<GetPileResponse> {
    return getResource<GetPileResponse>(`${deckId}/pile/${pileName}/list/`);
}

// GetDrawDeck API

export interface GetDrawFromDeckOptions {
    readonly count?: number;
    readonly deckId: string;
}

export type GetDrawFromDeckResponse = DeckResponse<{
    readonly cards: Card[];
}>;

export async function drawFromDeck({ deckId, count = 2 }: GetDrawFromDeckOptions): Promise<GetDrawFromDeckResponse> {
    return getResource<GetDrawFromDeckResponse>(`${deckId}/draw/?count=${count}`);
}

export interface GetShuffleDeckOptions {
    readonly deckId: string;
    readonly remaining?: boolean;
}

export type ShuffleDeckResponse = DeckResponse;

export async function shuffleDeck({ deckId, remaining = true }: GetShuffleDeckOptions): Promise<ShuffleDeckResponse> {
    return getResource<ShuffleDeckResponse>(`${deckId}/shuffle/?remaining=${remaining}`);
}

export interface ReturnToDeckOptions {
    readonly cards: string[];
    readonly deckId: string;
}

export type ReturnToDeckResponse = DeckResponse<{
    readonly piles: Piles;
}>;

export async function returnCardsToDeck({ deckId, cards }: ReturnToDeckOptions): Promise<ReturnToDeckResponse> {
    return getResource<ReturnToDeckResponse>(`${deckId}/return/?cards=${cards.join(',')}`);
}
