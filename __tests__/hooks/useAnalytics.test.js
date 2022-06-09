import { renderHook } from '@testing-library/react-hooks';
import useAnalytics from '~/hooks/useAnalytics';

jest.mock('../../src/hooks/useAppTrackTransparency', () => {
  return jest.fn(() => {
    return { isTrackingAuthorized: true };
  });
});

describe('useAnalytics', () => {
  it('Deve iniciar com valores padrões', () => {
    const { result } = renderHook(() => useAnalytics());

    expect(result.current.analyticsData).toBeTruthy();
  });
});
