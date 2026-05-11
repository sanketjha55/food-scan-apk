import axios from 'axios';

// Food API Services - Multiple sources for comprehensive data

const API_CLIENTS = {
  // USDA FoodData Central - Best nutrition data
  usda: axios.create({
    baseURL: 'https://fdc.nal.usda.gov/api/v1',
    params: {
      api_key: process.env.USDA_API_KEY || 'demo_key',
    },
  }),
  
  // Edamam - Nutrition and recipe API
  edamam: axios.create({
    baseURL: 'https://api.edamam.com/api',
  }),
  
  // Wikipedia API - Food info and history
  wikipedia: axios.create({
    baseURL: 'https://en.wikipedia.org/w/api.php',
    params: {
      format: 'json',
      origin: '*',
    },
  }),
  
  // Open Food Facts - Packaged food data
  openFoodFacts: axios.create({
    baseURL: 'https://world.openfoodfacts.org/api/v0',
  }),
};

// Food Recognition Service
export const foodRecognitionService = {
  // Scan food image and get identification
  async scanFood(imageUri) {
    try {
      // This would integrate with ML Vision API or similar
      // For now, returning mock implementation
      const formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'food-image.jpg',
      });
      
      // Replace with actual ML service endpoint
      const response = await axios.post(
        'https://your-ml-api.com/detect-food',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Food recognition error:', error);
      throw error;
    }
  },
};

// USDA Nutrition Service
export const usdaNutritionService = {
  async searchFood(foodName) {
    try {
      const response = await API_CLIENTS.usda.get('/foods/search', {
        params: {
          query: foodName,
          pageSize: 10,
        },
      });
      return response.data.foods || [];
    } catch (error) {
      console.error('USDA search error:', error);
      throw error;
    }
  },
  
  async getFoodDetails(fdcId) {
    try {
      const response = await API_CLIENTS.usda.get(`/food/${fdcId}`);
      return response.data;
    } catch (error) {
      console.error('USDA details error:', error);
      throw error;
    }
  },
};

// Wikipedia Service
export const wikipediaService = {
  async searchFood(foodName) {
    try {
      const response = await API_CLIENTS.wikipedia.get('/', {
        params: {
          action: 'query',
          srsearch: foodName,
          srwhat: 'text',
          srlimit: 5,
        },
      });
      return response.data.query?.search || [];
    } catch (error) {
      console.error('Wikipedia search error:', error);
      throw error;
    }
  },
  
  async getPageContent(title) {
    try {
      const response = await API_CLIENTS.wikipedia.get('/', {
        params: {
          action: 'query',
          titles: title,
          prop: 'extracts|pageimages',
          explaintext: true,
          exintro: true,
          piprop: 'thumbnail',
          pithumbsize: 300,
        },
      });
      return response.data.query?.pages || {};
    } catch (error) {
      console.error('Wikipedia content error:', error);
      throw error;
    }
  },
};

// Edamam Service
export const edamamService = {
  async getNutrition(ingredients) {
    try {
      const response = await API_CLIENTS.edamam.post('/nutrition-details', {
        ingredients: ingredients.map(item => ({ food: item })),
      }, {
        headers: {
          'Edamam-Account-User': process.env.EDAMAM_USER || 'demo',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Edamam nutrition error:', error);
      throw error;
    }
  },
};

// Open Food Facts Service
export const openFoodFactsService = {
  async searchProductByBarcode(barcode) {
    try {
      const response = await API_CLIENTS.openFoodFacts.get(`/product/${barcode}.json`);
      return response.data;
    } catch (error) {
      console.error('Open Food Facts error:', error);
      throw error;
    }
  },
  
  async searchProductByName(productName) {
    try {
      const response = await API_CLIENTS.openFoodFacts.get('/cgi/search.pl', {
        params: {
          search_terms: productName,
          action: 'process',
          json: 1,
        },
      });
      return response.data.products || [];
    } catch (error) {
      console.error('Open Food Facts search error:', error);
      throw error;
    }
  },
};

// Unified Food Service
export const foodService = {
  async getComprehensiveFoodData(foodName) {
    try {
      // Parallel API calls for comprehensive data
      const [usdaData, wikipediaData] = await Promise.allSettled([
        usdaNutritionService.searchFood(foodName),
        wikipediaService.searchFood(foodName),
      ]);
      
      return {
        nutrition: usdaData.status === 'fulfilled' ? usdaData.value : [],
        info: wikipediaData.status === 'fulfilled' ? wikipediaData.value : [],
      };
    } catch (error) {
      console.error('Comprehensive food data error:', error);
      throw error;
    }
  },
};

export default {
  foodRecognitionService,
  usdaNutritionService,
  wikipediaService,
  edamamService,
  openFoodFactsService,
  foodService,
};
