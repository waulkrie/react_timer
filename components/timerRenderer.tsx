// refactored https://github.com/justinmahar/react-use-precision-timer/blob/master/src/components/TimerRenderer.tsx
// to work on react-native
import React from 'react';
import { Text } from 'react-native';
import { styled } from 'nativewind';
import { Timer, useTimer } from 'react-use-precision-timer';
import { Subs } from 'react-sub-unsub';

const StyledText = styled(Text);

export interface TimerRendererProps {
  /** The timer or stopwatch to render. */
  timer: Timer;
  /**
   * Renders the timer, returning a JSX element.
   * @param timer The timer to render.
   */
  render?: (timer: Timer) => JSX.Element;
  /** Render rate in milliseconds. */
  renderRate?: number;
}

/**
 * Renders a timer or stopwatch at regular intervals.
 */
export const TimerRenderer = ({
  timer,
  render = (timer) => (
    <StyledText className='text-lg text-white'>{(timer.getElapsedRunningTime() / 1000).toFixed(3)}</StyledText>
  ),
  renderRate = 10,
}: TimerRendererProps) => {
  const [, setRenderTime] = React.useState(Date.now());
  React.useEffect(() => {
    const subs = new Subs();
    subs.setInterval(() => setRenderTime(new Date().getTime()), renderRate);
    return subs.createCleanup();
  }, [renderRate]);
  return render(timer);
};
