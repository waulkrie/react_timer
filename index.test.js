import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { App } from './app/(tabs)/index.tsx';

jest.mock('expo-av', () => 'Audio');

describe('App', () => {
    it('adds a split when the reset button is clicked', () => {
      const { getByText, getByTestId } = render(<App />);
      
      // Trigger the action that should call onResetPress()
      fireEvent.click(getByText('Reset'));
      
      // Assert that addSplit() is called
      const splitList = getByTestId('split-list');
      expect(splitList.children.length).toBe(1); // Assuming addSplit adds one split
    });
  });