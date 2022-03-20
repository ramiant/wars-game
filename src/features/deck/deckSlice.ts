import { Card, Piles } from "./deckModels";
import { 
    createAsyncThunk,
    createSlice,
    PayloadAction,
 } from "@reduxjs/toolkit";
import { 
    getShuffledDeck, 
    GetShuffledDeckResponse,
    drawFromDeck,
    addToPile,
    GetPileResponse,
    getPile,
    returnCardsToDeck,
    shuffleDeck,
 } from "./deckAPI";
import { RootState } from "../../app/store";
import { Player } from "./deckConstants";
import { cardValueToNumber, getLSDeckId, getLSLastCards } from "./deckUtils";

export const sliceName: string = 'deck';

interface ThunkApiConfig {
    state: RootState;
}

export interface DeckState {
    remaining?: number;
    deckId: string;
    piles: Piles;
    ready: boolean;
    loading: boolean;
    shuffled: boolean;
    lastCards: Card[];
}

const initialState: DeckState = {
    piles: {
        [Player.Player]: {
            cards: [],
            remaining: 0,
        },
        [Player.Computer]: {
            cards: [],
            remaining: 0,
        },
    },
    deckId: getLSDeckId(),
    ready: false,
    loading: false,
    shuffled: false,
    lastCards: getLSLastCards(),
};

export const newDeckThunk = createAsyncThunk<GetShuffledDeckResponse>(
    `${sliceName}/newDeck`,
    async (_, { dispatch }) => {
        const deck = await getShuffledDeck();

        dispatch(readyAction(false));

        await addToPile({ cards: [], deckId: deck.deck_id, pileName: Player.Player.toString() });
        await addToPile({ cards: [], deckId: deck.deck_id, pileName: Player.Computer.toString() });
        localStorage.clear();
        localStorage.setItem('deckId', deck.deck_id);

        return deck;
    }
);

export const getPilesThunk = createAsyncThunk<GetPileResponse, undefined, ThunkApiConfig>(
    `${sliceName}/piles`,
    async (_, { getState, dispatch }) => {
        const { deck: { deckId } } = getState();

        if (!deckId) {
            dispatch(newDeckThunk());
        }

        const player1PileResponse: GetPileResponse = await getPile({ deckId, pileName: Player.Player.toString() });
        const player2PileResponse: GetPileResponse = await getPile({ deckId, pileName: Player.Computer.toString() });

        return {
            ...player1PileResponse,
            piles: {
                [Player.Player]: {
                    ...player1PileResponse.piles[Player.Player],
                },
                [Player.Computer]: {
                    ...player2PileResponse.piles[Player.Computer],
                },
            },
        };
    }
)

interface DrawCardThunkPayload {
    readonly player: Player;
    readonly cards: Card[];
    readonly remaining: number;
}

export const drawCardsThunk = createAsyncThunk<DrawCardThunkPayload | null, undefined, ThunkApiConfig>(
    `${sliceName}/draw`,
    async (_, { getState, dispatch }) => {
        const { deck: { deckId } } = getState();

        dispatch(loadingAction(true));
        dispatch(shuffledAction(false));
        const { cards, remaining } = await drawFromDeck({ deckId });
        
        const [
            { code: code1, value: value1 }, 
            { code: code2, value: value2 },
        ] = cards;

        dispatch(lastCardsAction(cards));
        localStorage.setItem('lastCards', JSON.stringify(cards));
        
        if (cardValueToNumber(value1) > cardValueToNumber(value2)) {
            await addToPile({ pileName: Player.Player.toString(), deckId, cards: [code1, code2] })
            return { cards, player: Player.Player, remaining };
        } else if (cardValueToNumber(value1) < cardValueToNumber(value2)) {
            await addToPile({ pileName: Player.Computer.toString(), deckId, cards: [code1, code2] })
            return { player: Player.Computer, cards, remaining }; 
        } else {
            await returnCardsToDeck({ deckId, cards: [code1, code2] });
            await shuffleDeck({ deckId });
            return null;
        }
    }
)

export const deckSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        readyAction: (state: DeckState, action: PayloadAction<boolean>) => {
            state.ready = action.payload;
        },
        loadingAction: (state: DeckState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        shuffledAction: (state: DeckState, action: PayloadAction<boolean>) => {
            state.shuffled = action.payload;
        },
        lastCardsAction: (state: DeckState, action: PayloadAction<Card[]>) => {
            state.lastCards = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(newDeckThunk.fulfilled, (state: DeckState, action: PayloadAction<GetShuffledDeckResponse>): void => {
                const { deck_id, remaining } = action.payload;
                state.piles = initialState.piles;
                state.deckId = deck_id;
                state.remaining = remaining;
                state.ready = true;
                state.lastCards = [];
            })
            .addCase(drawCardsThunk.fulfilled, (state: DeckState, action: PayloadAction<DrawCardThunkPayload | null>): void => {
                if (!action.payload) {
                    state.loading = false;
                    state.shuffled = true;
                    return;
                }

                const { cards, player, remaining } = action.payload;
                state.piles = {
                    ...state.piles,
                    [player]: {
                        cards: [...state.piles[player].cards, ...cards],
                        remaining: state.piles[player].remaining + cards.length,
                    },
                };
                state.loading = false;
                state.remaining = remaining;
            })
            .addCase(getPilesThunk.fulfilled, (state: DeckState, action: PayloadAction<GetPileResponse>): void => {
                const { piles, remaining } = action.payload;
                state.piles = piles;
                state.remaining = remaining;
                state.ready = true;
            });
    },
});

export const { readyAction, loadingAction, shuffledAction, lastCardsAction } = deckSlice.actions;
export const deckReducer = deckSlice.reducer;