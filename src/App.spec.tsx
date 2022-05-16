import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import App from './App';

const setup = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe('<CompleteStage />', () => {
  it('Should render without errors', () => {
    setup();
    expect(screen.getByTestId('App')).toBeTruthy();
  });
  it('Should render who stage by default', () => {
    setup();
    expect(screen.getByText(/Who/)).toBeTruthy();
    expect(screen.queryByText(/When/)).toBeFalsy();
  });
  it('Should hide prev button', () => {
    setup();
    expect(screen.queryByText(/previous/i)).toBeFalsy();
    expect(screen.getByText(/next/i)).toBeTruthy();
  });
  it('Should show prev button', () => {
    setup();
    expect(screen.queryByText(/previous/i)).toBeFalsy();
    fireEvent.click(screen.getByText(/next/i));
    expect(screen.getByText(/What/)).toBeTruthy();
    expect(screen.getByText(/previous/i)).toBeTruthy();
    expect(screen.getByText(/next/i)).toBeTruthy();
  });
  it("Should don't let to go result stage", () => {
    setup();
    fireEvent.click(screen.getByTestId(/ResultStage/i));
    expect(screen.queryByTestId('ResultStageComponent')).toBeFalsy();
    expect(screen.getByText(/Who/)).toBeTruthy();
  });
  it('Should hide next button and show clear', async () => {
    setup();
    fireEvent.change(screen.getByTestId('InputStage'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByText(/next/i));
    fireEvent.change(screen.getByTestId('InputStage'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByText(/next/i));
    fireEvent.change(screen.getByTestId('InputStage'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByText(/next/i));
    fireEvent.change(screen.getByTestId('InputStage'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByText(/next/i));
    const result = await screen.findByTestId('ResultStageComponent');
    await waitFor(() => expect(result).toBeInTheDocument());
    expect(result).toBeTruthy();
    expect(screen.getByText(/previous/i)).toBeTruthy();
    expect(screen.getByText(/clear/i)).toBeTruthy();
    expect(screen.queryByText(/next/i)).toBeFalsy();
    fireEvent.click(screen.getByText(/clear/i));
    expect(screen.queryByText(/clear/i)).toBeFalsy();
    expect(screen.queryByText(/previous/i)).toBeFalsy();
    expect(screen.getByText(/Who/)).toBeTruthy();
  });
});
