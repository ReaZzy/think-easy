import React from 'react';

interface CompleteStageProps {
  what: string;
  when: string;
  where: string;
  who: string;
}

const CompleteStage: React.FC<CompleteStageProps> = React.memo(
  ({ what, when, where, who }) => {
    return (
      <h3>
        {who} {what} {where} {when}
      </h3>
    );
  }
);

export default CompleteStage;
