// Global error handling and logging

export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', details = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
    this.timestamp = new Date();
  }
}

export const ERROR_CODES = {
  CAMERA_PERMISSION_DENIED: 'CAMERA_PERMISSION_DENIED',
  STORAGE_PERMISSION_DENIED: 'STORAGE_PERMISSION_DENIED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  API_ERROR: 'API_ERROR',
  INVALID_IMAGE: 'INVALID_IMAGE',
  FOOD_RECOGNITION_FAILED: 'FOOD_RECOGNITION_FAILED',
  STORAGE_ERROR: 'STORAGE_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
};

export function handleError(error, context = '') {
  console.error(`[${context}]`, error);
  
  const appError = error instanceof AppError 
    ? error 
    : new AppError(error.message, 'UNKNOWN_ERROR', { originalError: error });
  
  // Log to analytics/monitoring service in production
  if (!__DEV__) {
    logErrorToService(appError);
  }
  
  return appError;
}

function logErrorToService(error) {
  // TODO: Implement error logging service
  console.log('Error logged to service:', error);
}

export function getErrorMessage(error, language = 'en') {
  const messages = {
    en: {
      [ERROR_CODES.CAMERA_PERMISSION_DENIED]: 'Camera permission is required to scan food.',
      [ERROR_CODES.STORAGE_PERMISSION_DENIED]: 'Storage permission is required to access gallery.',
      [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection.',
      [ERROR_CODES.API_ERROR]: 'Unable to fetch food data. Please try again.',
      [ERROR_CODES.INVALID_IMAGE]: 'Invalid image. Please try a different photo.',
      [ERROR_CODES.FOOD_RECOGNITION_FAILED]: 'Could not recognize the food. Please try again.',
      [ERROR_CODES.STORAGE_ERROR]: 'Failed to save data. Please try again.',
      [ERROR_CODES.VALIDATION_ERROR]: 'Invalid input. Please check and try again.',
    },
    hi: {
      [ERROR_CODES.CAMERA_PERMISSION_DENIED]: 'खाद्य स्कैन करने के लिए कैमरा अनुमति आवश्यक है।',
      [ERROR_CODES.STORAGE_PERMISSION_DENIED]: 'गैलरी एक्सेस करने के लिए स्टोरेज अनुमति आवश्यक है।',
      [ERROR_CODES.NETWORK_ERROR]: 'नेटवर्क त्रुटि। अपने कनेक्शन की जांच करें।',
      [ERROR_CODES.API_ERROR]: 'खाद्य डेटा प्राप्त नहीं कर सका। फिर से प्रयास करें।',
      [ERROR_CODES.INVALID_IMAGE]: 'अमान्य छवि। कृपया एक अलग फ़ोटो आजमाएं।',
      [ERROR_CODES.FOOD_RECOGNITION_FAILED]: 'खाद्य पहचान नहीं कर सके। फिर से प्रयास करें।',
      [ERROR_CODES.STORAGE_ERROR]: 'डेटा सहेजने में विफल। फिर से प्रयास करें।',
      [ERROR_CODES.VALIDATION_ERROR]: 'अमान्य इनपुट। कृपया जांचें और फिर से प्रयास करें।',
    },
  };
  
  const errorMessages = messages[language] || messages.en;
  return errorMessages[error?.code] || error?.message || 'An unexpected error occurred.';
}

export default {
  AppError,
  ERROR_CODES,
  handleError,
  getErrorMessage,
};
