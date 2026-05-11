// Environment and configuration utilities

const ENV_VARS = {
  // API Keys
  USDA_API_KEY: process.env.USDA_API_KEY || 'DEMO_KEY',
  EDAMAM_APP_ID: process.env.EDAMAM_APP_ID || '',
  EDAMAM_APP_KEY: process.env.EDAMAM_APP_KEY || '',
  ML_VISION_API_KEY: process.env.ML_VISION_API_KEY || '',
  
  // API Endpoints
  USDA_BASE_URL: 'https://fdc.nal.usda.gov/api/v1',
  WIKIPEDIA_BASE_URL: 'https://en.wikipedia.org/w/api.php',
  EDAMAM_BASE_URL: 'https://api.edamam.com/api',
  OPEN_FOOD_FACTS_URL: 'https://world.openfoodfacts.org/api/v0',
  
  // App Config
  APP_VERSION: '1.0.0',
  APP_NAME: 'Food Scanner',
  BUILD_TYPE: __DEV__ ? 'development' : 'production',
  
  // Feature Flags
  ENABLE_DEEP_RESEARCH: true,
  ENABLE_VOICE: true,
  ENABLE_ANALYTICS: false,
  ENABLE_OFFLINE_MODE: false,
};

export function getConfig() {
  return {
    ...ENV_VARS,
    isDevelopment: __DEV__,
    isProduction: !__DEV__,
  };
}

export function getAPIKey(apiName) {
  const keys = {
    usda: ENV_VARS.USDA_API_KEY,
    edamam: ENV_VARS.EDAMAM_APP_ID,
    vision: ENV_VARS.ML_VISION_API_KEY,
  };
  
  return keys[apiName.toLowerCase()] || null;
}

export function logConfig() {
  console.log('=== App Configuration ===');
  console.log(`App Name: ${ENV_VARS.APP_NAME}`);
  console.log(`Version: ${ENV_VARS.APP_VERSION}`);
  console.log(`Build Type: ${ENV_VARS.BUILD_TYPE}`);
  console.log(`Features:`, {
    deepResearch: ENV_VARS.ENABLE_DEEP_RESEARCH,
    voice: ENV_VARS.ENABLE_VOICE,
    analytics: ENV_VARS.ENABLE_ANALYTICS,
  });
}

export default {
  getConfig,
  getAPIKey,
  logConfig,
  ...ENV_VARS,
};
