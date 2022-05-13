import React, { useMemo } from 'react';
import { Stage } from 'Types/enums/stage';
import useStages from 'Hooks/useStages';

const exhausted = (x: never): never => {
  throw new Error(`Can\`t find component for ${x} stage`);
};

const App: React.FC = () => {
  const { currentStage } = useStages<Stage>([
    {
      current: Stage.WHO,
      next: Stage.WHAT,
      default: true,
    },
    { current: Stage.WHAT, next: Stage.WHEN },
    { current: Stage.WHEN, next: Stage.WHERE },
    { current: Stage.WHERE },
  ]);

  const getCurrentStage = useMemo(() => {
    if (!currentStage?.current) return null;
    switch (currentStage.current) {
      case Stage.WHO:
        return;
      case Stage.WHAT:
        return;
      case Stage.WHEN:
        return;
      case Stage.WHERE:
        return;
      default:
        exhausted(currentStage.current);
    }
  }, [currentStage]);

  return <div className="App">{getCurrentStage}</div>;
};

export default App;
