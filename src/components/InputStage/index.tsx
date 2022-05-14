import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { Stage } from 'types/enums/stage';

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
      <div>
        {stage} {value}
        <input value={value} {...props} />
      </div>
    );
  }
);

export default InputStage;
