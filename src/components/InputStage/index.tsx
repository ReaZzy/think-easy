import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Stage } from 'types/enums/stage';
import s from './index.module.css';

interface InputStageProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string;
  stage: Stage;
}

const InputStage: React.FC<InputStageProps> = React.memo(
  ({ value, stage, ...props }) => {
    return (
      <div className={s.stage}>
        <input value={value} {...props} />
      </div>
    );
  }
);

export default InputStage;
