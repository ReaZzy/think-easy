import { render, screen } from '@testing-library/react';
import CompleteStage from 'components/CompleteStage';

describe('<CompleteStage />', () => {
  it('Should render result in correct order', () => {
    render(
      <CompleteStage
        what={'is coding'}
        when={'today'}
        where={'on his computer'}
        who={'Max'}
      />
    );
    expect(
      screen.getByText(/Max is coding on his computer today/)
    ).toBeTruthy();
  });
});
