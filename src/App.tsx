import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { AppDispatch } from './app/store';
import { GameLayout } from './components/layout/GameLayout';
import { useReady } from './features/deck/deckHooks';
import { getPilesThunk } from './features/deck/deckSlice';

function App() {
  const ready: boolean = useReady();
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPilesThunk());
  }, [dispatch]);

  if (!ready) {
    return (
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100%' 
        }}>
          Loading...
      </div>
    );
  }

  return (
    <GameLayout 
      flexDirection="column"
    />
  );
}

export default App;
