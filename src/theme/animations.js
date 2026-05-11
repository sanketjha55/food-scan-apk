// Instagram-style animation configurations
export const animationTimings = {
  xs: 100,
  sm: 200,
  md: 300,
  lg: 500,
  xl: 800,
};

export const animationEasings = {
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  linear: 'linear',
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

export const animations = {
  // Screen transitions
  slideInUp: {
    duration: animationTimings.md,
    timing: animationEasings.smooth,
  },
  slideOutDown: {
    duration: animationTimings.md,
    timing: animationEasings.smooth,
  },
  
  // Panel animations
  bottomSheetSlideUp: {
    duration: animationTimings.lg,
    timing: animationEasings.smooth,
  },
  bottomSheetSlideDown: {
    duration: animationTimings.lg,
    timing: animationEasings.smooth,
  },
  
  // Button interactions
  buttonPress: {
    duration: animationTimings.sm,
    timing: animationEasings.easeIn,
  },
  buttonRelease: {
    duration: animationTimings.sm,
    timing: animationEasings.easeOut,
  },
  
  // Scanner animations
  scannerFocus: {
    duration: animationTimings.md,
    timing: animationEasings.smooth,
  },
  scannerPulse: {
    duration: animationTimings.lg,
    timing: animationEasings.bounce,
  },
  
  // Result reveals
  resultFadeIn: {
    duration: animationTimings.md,
    timing: animationEasings.smooth,
  },
  resultSlideIn: {
    duration: animationTimings.lg,
    timing: animationEasings.smooth,
  },
  
  // General
  fadeIn: {
    duration: animationTimings.md,
    timing: animationEasings.smooth,
  },
  fadeOut: {
    duration: animationTimings.md,
    timing: animationEasings.smooth,
  },
  scale: {
    duration: animationTimings.md,
    timing: animationEasings.bounce,
  },
};
