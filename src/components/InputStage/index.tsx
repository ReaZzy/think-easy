import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import s from './index.module.css';

interface InputStageProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  value: string;
}

const InputStage: React.FC<InputStageProps> = React.memo(
  ({ value, ...props }) => {
    return (
      <div className={s.stage}>
        <input value={value} {...props} data-testid={'InputStage'} />
      </div>
    );
  }
);

export default InputStage;
