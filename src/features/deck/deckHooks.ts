import { useCallback } from "react";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { Player } from "./deckConstants";
import { Card, Pile } from "./deckModels";

const remainingSelector = (state: RootState) => state.deck.remaining;

export function useRemaining(): number | undefined { 
    return useAppSelector(remainingSelector);
}

const readySelector = (state: RootState) => state.deck.ready;

export function useReady(): boolean {
    return useAppSelector(readySelector);
}

export function usePile(playerName: Player): Pile {
    return useAppSelector(useCallback((state: RootState) => state.deck.piles[playerName], [playerName]));
}

export function useScore(playerName: Player): number {
    return useAppSelector(useCallback((state: RootState) => state.deck.piles[playerName].remaining / 2, [playerName]));
}

const shuffledSelector = (state: RootState) => state.deck.shuffled;

export function useShuffled(): boolean {
    return useAppSelector(shuffledSelector);
}

const loadingSelector = (state: RootState) => state.deck.loading;

export function useLoading(): boolean {
    return useAppSelector(loadingSelector);
}

export function useLastCard(playerName: Player): Card {
    return useAppSelector(useCallback((state: RootState) => state.deck.lastCards[playerName], [playerName]));
}
