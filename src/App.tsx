import React, { useCallback, useMemo } from 'react';
import useStages from 'hooks/useStages';
import { Stage } from 'types/enums/stage';
import InputStage from './components/InputStage';
import { useTypedDispatch, useTypedSelector } from './redux/store';
import { setValue } from './redux/gameReducer';

const exhausted = (x: never): never => {
  throw new Error(`Can\`t find component for ${x} stage`);
};

const App: React.FC = () => {
  const { currentStage, getPreviousStage, getNextStage } = useStages<Stage>([
    {
      current: Stage.WHO,
      next: Stage.WHAT,
      default: true,
    },
    { current: Stage.WHAT, next: Stage.WHEN },
    { current: Stage.WHEN, next: Stage.WHERE },
    { current: Stage.WHERE },
  ]);
  const { what, where, who, when } = useTypedSelector((state) => state.game);
  const dispatch = useTypedDispatch();

  const handleChange = useCallback(
    (value: ReturnType<typeof setValue>['payload']) => {
      return dispatch(setValue({ ...value }));
    },
    [dispatch]
  );

  const getCurrentStage = useMemo(() => {
    if (!currentStage?.current) return null;
    switch (currentStage.current) {
      case Stage.WHO:
        return (
          <InputStage
            onChange={(e) => handleChange({ who: e.target.value })}
            value={who}
            stage={Stage.WHO}
          />
        );
      case Stage.WHAT:
        return (
          <InputStage
            onChange={(e) => handleChange({ what: e.target.value })}
            value={what}
            stage={Stage.WHAT}
          />
        );
      case Stage.WHEN:
        return (
          <InputStage
            onChange={(e) => handleChange({ when: e.target.value })}
            value={when}
            stage={Stage.WHEN}
          />
        );
      case Stage.WHERE:
        return (
          <InputStage
            onChange={(e) => handleChange({ where: e.target.value })}
            value={where}
            stage={Stage.WHERE}
          />
        );
      default:
        exhausted(currentStage.current);
    }
  }, [currentStage, handleChange, when, what, where, who]);

  return (
    <div className="App">
      {getCurrentStage}
      <button onClick={getPreviousStage}>prev</button>
      <button onClick={getNextStage}>next</button>
    </div>
  );
};

export default App;
