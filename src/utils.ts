const checkDeviceWidth = (): boolean => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(max-width: 1024px)').matches;
  }

  return false;
};

export const isTabSize = checkDeviceWidth();
