import React, { Suspense, useCallback, useMemo } from 'react';
import useStages from 'hooks/useStages';
import { QuestionStage, Stage } from 'types/enums/stage';
import InputStage from 'components/InputStage';
import { useTypedDispatch, useTypedSelector } from 'redux/store';
import { clear, setValue } from 'redux/gameReducer';
import Steps from 'rc-steps';

const CompleteStage = React.lazy(() => import('components/CompleteStage'));

const exhausted = (x: never): never => {
  throw new Error(`Can\`t find component for ${x} stage`);
};

const stages = [
  {
    current: Stage.WHO,
    next: Stage.WHAT,
    default: true,
  },
  { current: Stage.WHAT, next: Stage.WHEN },
  { current: Stage.WHEN, next: Stage.WHERE },
  { current: Stage.WHERE, next: Stage.COMPLETE },
  { current: Stage.COMPLETE },
];

const App: React.FC = () => {
  const {
    currentStage,
    getPreviousStage,
    getNextStage,
    history,
    goToStage,
    getDefaultStage,
  } = useStages<Stage>(stages);
  const game = useTypedSelector((state) => state.game);
  const dispatch = useTypedDispatch();
  const isComplete = game.who && game.when && game.what && game.where;

  const handleChange = useCallback(
    (value: ReturnType<typeof setValue>['payload']) => {
      return dispatch(setValue({ ...value }));
    },
    [dispatch]
  );

  const handleNextStage = useCallback(() => {
    if (currentStage?.next === Stage.COMPLETE && !isComplete) return;
    getNextStage();
  }, [getNextStage, currentStage, isComplete]);

  const handleClear = useCallback(() => {
    dispatch(clear());
    getDefaultStage();
  }, [getDefaultStage, dispatch]);

  const titles: Record<Stage, string> = useMemo(
    () => ({
      [Stage.WHO]: 'Who',
      [Stage.WHAT]: 'What',
      [Stage.WHEN]: 'When',
      [Stage.WHERE]: 'Where',
      [Stage.COMPLETE]: 'Result',
    }),
    []
  );

  const getCurrentStage = useMemo(() => {
    if (!currentStage?.current) return null;
    switch (currentStage.current) {
      case Stage.WHO:
        return (
          <InputStage
            onChange={(e) => handleChange({ who: e.target.value })}
            value={game.who}
            placeholder={titles[Stage.WHO]}
          />
        );
      case Stage.WHAT:
        return (
          <InputStage
            onChange={(e) => handleChange({ what: e.target.value })}
            value={game.what}
            placeholder={titles[Stage.WHAT]}
          />
        );
      case Stage.WHEN:
        return (
          <InputStage
            onChange={(e) => handleChange({ when: e.target.value })}
            value={game.when}
            placeholder={titles[Stage.WHEN]}
          />
        );
      case Stage.WHERE:
        return (
          <InputStage
            onChange={(e) => handleChange({ where: e.target.value })}
            value={game.where}
            placeholder={titles[Stage.WHERE]}
          />
        );
      case Stage.COMPLETE:
        return (
          <Suspense fallback={'Loading...'}>
            <CompleteStage
              what={game.what}
              when={game.when}
              where={game.where}
              who={game.who}
            />
          </Suspense>
        );
      default:
        exhausted(currentStage.current);
    }
  }, [titles, currentStage, handleChange, game]);

  const questionSteps = useMemo(() => {
    return Object.values(Stage)
      .filter((stage) => stage !== Stage.COMPLETE)
      .map((stage, index) => (
        <Steps.Step
          key={index}
          title={stage}
          onClick={() => goToStage(stage)}
          status={
            currentStage?.current === stage
              ? 'process'
              : game[stage as QuestionStage]?.length === 0
              ? 'wait'
              : 'finish'
          }
        />
      ));
  }, [game, goToStage, currentStage]);

  const navButtons = useMemo(
    () => (
      <div className={'buttons'}>
        <div className={'buttons__nav'}>
          {history.length > 0 && (
            <button onClick={getPreviousStage}>Previous</button>
          )}
          {currentStage?.next && (
            <button onClick={handleNextStage}>Next</button>
          )}
        </div>
        {currentStage?.current === Stage.COMPLETE && (
          <button onClick={handleClear}>Clear</button>
        )}
      </div>
    ),
    [getPreviousStage, handleNextStage, currentStage, handleClear, history]
  );

  return (
    <div className="App" data-testid={'App'}>
      <Steps current={history.length}>
        {questionSteps}
        <Steps.Step
          title={'Result'}
          onClick={() => goToStage(Stage.COMPLETE)}
          data-testid={'ResultStage'}
          style={{
            pointerEvents: `${isComplete ? 'auto' : 'none'}`,
          }}
          status={
            currentStage?.current === Stage.COMPLETE
              ? 'process'
              : isComplete && game.where
              ? 'finish'
              : 'wait'
          }
        />
      </Steps>
      <div className={'content'}>
        <h2>{titles[currentStage?.current || Stage.WHO]}</h2>
        {getCurrentStage}
        {navButtons}
      </div>
    </div>
  );
};

export default App;
