import { useState, useCallback } from 'react';

export interface IStage<T> {
  current: T;
  next?: T;
  default?: boolean;
}
export interface StagesResponse<T = string> {
  currentStage: IStage<T> | undefined;
  getPreviousStage: () => void;
  getDefaultStage: () => void;
  getNextStage: () => void;
  goToStage: (swapToStage: T) => void;
  history: Array<IStage<T>>;
}

const useStages = <T,>(stages: Array<IStage<T>>): StagesResponse<T> => {
  const defaultStage = stages.find((stage) => stage?.default);
  const [currentStage, setCurrentStage] = useState<IStage<T> | undefined>(
    defaultStage
  );
  const [history, setHistory] = useState<Array<IStage<T>>>([]);
  const getPreviousStage = useCallback((): void => {
    if (history[history.length - 1]) {
      setCurrentStage(history[history.length - 1]);
      setHistory(history.slice(0, -1));
    }
  }, [history]);

  const getNextStage = useCallback((): void => {
    if (currentStage?.next) {
      const nextStage = stages.find(
        (stage) => stage.current === currentStage?.next
      );
      setHistory([...history, currentStage]);
      setCurrentStage(nextStage);
    }
  }, [history, currentStage, stages]);

  const getDefaultStage = useCallback((): void => {
    const defaultStage = stages.find((stage) => stage?.default);
    setHistory([]);
    setCurrentStage(defaultStage);
  }, [stages]);

  const setHistoryRecursive = useCallback(() => {
    const localHistory: Array<IStage<T>> = [];
    const historyRecursive = (
      defaultStage: IStage<T> | undefined,
      stageEnd: T
    ): Array<IStage<T>> => {
      const stageWeNeed = stages.find(
        (stage) => stage.current === defaultStage?.next
      );
      if (!defaultStage?.current || defaultStage?.current === stageEnd) {
        return localHistory;
      }
      localHistory.push(defaultStage);
      return historyRecursive(stageWeNeed, stageEnd);
    };
    return historyRecursive;
  }, [stages]);

  const goToStage = useCallback(
    (swapToStage: T): void => {
      const stageSwap = stages.find((stage) => stage?.current === swapToStage);
      const history = setHistoryRecursive()(defaultStage, swapToStage);
      setHistory(history);
      setCurrentStage(stageSwap);
    },
    [defaultStage, stages, setHistoryRecursive]
  );

  return {
    currentStage,
    getPreviousStage,
    getDefaultStage,
    getNextStage,
    goToStage,
    history,
  };
};

export default useStages;
