import * as Speech from 'expo-speech';
import i18n from 'i18n-js';

// Multi-language voice support
export const voiceService = {
  async speak(text, language = 'en') {
    try {
      // Stop any ongoing speech
      await Speech.stop();
      
      // Map language codes to speech language
      const languageMap = {
        en: 'en-US',
        hi: 'hi-IN',
        es: 'es-ES',
        fr: 'fr-FR',
        de: 'de-DE',
        it: 'it-IT',
        pt: 'pt-BR',
        ru: 'ru-RU',
        ja: 'ja-JP',
        zh: 'zh-CN',
        ar: 'ar-SA',
      };
      
      const selectedLanguage = languageMap[language] || 'en-US';
      
      await Speech.speak(text, {
        language: selectedLanguage,
        pitch: 1,
        rate: 0.9,
        onDone: () => console.log('Speech finished'),
        onError: (error) => console.error('Speech error:', error),
      });
    } catch (error) {
      console.error('Voice service error:', error);
    }
  },
  
  async stop() {
    try {
      await Speech.stop();
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  },
  
  async speakFoodAnalysis(foodData, language = 'en') {
    const analysis = this.formatFoodAnalysisForSpeech(foodData, language);
    await this.speak(analysis, language);
  },
  
  formatFoodAnalysisForSpeech(foodData, language) {
    const t = i18n.t;
    
    let speech = `${foodData.name}. `;
    speech += `${t('calories')}: ${foodData.calories} kcal. `;
    speech += `${t('protein')}: ${foodData.protein} grams. `;
    speech += `${t('fat')}: ${foodData.fat} grams. `;
    speech += `${t('sugar')}: ${foodData.sugar} grams. `;
    
    if (foodData.harmfulIngredients?.length > 0) {
      speech += `${t('warning')}: ${foodData.harmfulIngredients.join(', ')}. `;
    }
    
    if (foodData.deepResearch) {
      speech += `${foodData.deepResearch}. `;
    }
    
    return speech;
  },
};

export default voiceService;
