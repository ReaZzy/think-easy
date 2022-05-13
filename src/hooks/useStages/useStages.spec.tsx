import { act, cleanup, renderHook } from '@testing-library/react';
import useStages from 'Hooks/useStages';
import { Stage } from 'Types/enums/stage';

afterEach(cleanup);

const stages = [
  {
    current: Stage.WHO,
    next: Stage.WHAT,
    default: true,
  },
  { current: Stage.WHAT, next: Stage.WHEN },
  { current: Stage.WHEN, next: Stage.WHERE },
  { current: Stage.WHERE },
];

describe('useStages', () => {
  it('Should set default stage', () => {
    const { result } = renderHook(() => useStages<Stage>([...stages]));
    expect(result.current.currentStage?.current).toEqual(Stage.WHO);
  });
  it('Should get next stage', () => {
    const { result } = renderHook(() => useStages<Stage>([...stages]));
    expect(result.current.currentStage?.current).toEqual(Stage.WHO);
    act(() => result.current.getNextStage());
    expect(result.current.currentStage?.current).toEqual(Stage.WHAT);
  });
  it('Should set history', () => {
    const { result } = renderHook(() => useStages<Stage>([...stages]));
    expect(result.current.currentStage?.current).toEqual(Stage.WHO);
    act(() => result.current.getNextStage());
    expect(result.current.history).toEqual([
      { current: Stage.WHO, next: Stage.WHAT, default: true },
    ]);
  });
  it('Should get previous stage', () => {
    const { result } = renderHook(() => useStages<Stage>([...stages]));
    act(() => result.current.getNextStage());
    expect(result.current.currentStage?.current).toEqual(Stage.WHAT);
    act(() => result.current.getNextStage());
    expect(result.current.currentStage?.current).toEqual(Stage.WHEN);
    act(() => result.current.getPreviousStage());
    expect(result.current.currentStage?.current).toEqual(Stage.WHAT);
    act(() => result.current.getPreviousStage());
    expect(result.current.currentStage?.current).toEqual(Stage.WHO);
  });
  it('Should delete from history on previous stage', () => {
    const { result } = renderHook(() => useStages<Stage>([...stages]));
    act(() => result.current.getNextStage());
    act(() => result.current.getNextStage());
    expect(result.current.history).toEqual([
      { current: Stage.WHO, next: Stage.WHAT, default: true },
      { current: Stage.WHAT, next: Stage.WHEN },
    ]);
    act(() => result.current.getPreviousStage());
    expect(result.current.history).toEqual([
      { current: Stage.WHO, next: Stage.WHAT, default: true },
    ]);
    act(() => result.current.getPreviousStage());
    expect(result.current.history).toEqual([]);
  });
  it('Should go to stage', () => {
    const { result } = renderHook(() => useStages<Stage>([...stages]));
    expect(result.current.currentStage?.current).toEqual(Stage.WHO);
    act(() => result.current.goToStage(Stage.WHEN));
    expect(result.current.currentStage?.current).toEqual(Stage.WHEN);
  });
  it('Should set history when go forward', () => {
    const { result } = renderHook(() => useStages<Stage>([...stages]));
    expect(result.current.currentStage?.current).toEqual(Stage.WHO);
    act(() => result.current.goToStage(Stage.WHERE));
    expect(result.current.history).toEqual([
      { current: Stage.WHO, next: Stage.WHAT, default: true },
      { current: Stage.WHAT, next: Stage.WHEN },
      { current: Stage.WHEN, next: Stage.WHERE },
    ]);
    act(() => result.current.goToStage(Stage.WHAT));
    expect(result.current.history).toEqual([
      { current: Stage.WHO, next: Stage.WHAT, default: true },
    ]);
  });
  it('Should set default page', () => {
    const { result } = renderHook(() => useStages<Stage>([...stages]));
    expect(result.current.currentStage?.current).toEqual(Stage.WHO);
    act(() => result.current.goToStage(Stage.WHERE));
    expect(result.current.currentStage?.current).toEqual(Stage.WHERE);
    act(() => result.current.getDefaultStage());
    expect(result.current.currentStage?.current).toEqual(Stage.WHO);
    expect(result.current.history).toEqual([]);
  });
});
