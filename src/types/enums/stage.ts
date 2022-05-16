export enum Stage {
  WHO = 'who',
  WHAT = 'what',
  WHEN = 'when',
  WHERE = 'where',
  COMPLETE = 'complete',
}

export type QuestionStage = Exclude<Stage, Stage.COMPLETE>;
