# 🍎 Food Scanner & Deep Research App

A modern, AI-powered food scanning application for both Android and iOS. Instantly identify food items, analyze nutritional content, detect harmful ingredients, and get deep health insights with multi-language voice support.

## ✨ Key Features

- **📱 Cross-Platform**: Native iOS and Android support
- **📸 Smart Food Recognition**: AI-powered food identification
- **📊 Nutritional Analysis**: Complete nutritional breakdown (calories, protein, fat, sugar, carbs, fiber)
- **🔬 Deep Research Mode**: Advanced ingredient analysis and harm detection
- **⚠️ Harm Detection**: Identifies harmful ingredients, bacteria risks, and food safety concerns
- **🌍 Country-Specific Alerts**: Warns about banned ingredients by region
- **🎤 Multi-Language Voice Support**: Listen to results in 20+ languages
- **🎨 Instagram-Style UI**: Modern, smooth animations with white/black/grey theme
- **📚 Food Encyclopedia**: Comprehensive food database with history and nutritional info
- **🔦 Advanced Scanner**: Live camera scanner with flashlight support
- **🖼️ Gallery Upload**: Analyze food from saved photos

## 🎯 Core Features Summary

### Onboarding
- ✅ Multi-language selection (20+ languages)
- ✅ Region/country selection
- ✅ Personalized experience setup

### Scanner Interface
- ✅ Live camera scanner (Google Pay-like UI)
- ✅ Gallery image upload
- ✅ Flashlight toggle
- ✅ Animated scan frame with scan line

### Result Analysis
- ✅ Bottom sheet panel (30% screen) with quick info
- ✅ Expandable full-screen detailed analysis
- ✅ Complete nutritional breakdown
- ✅ Ingredients listing
- ✅ Vitamins & minerals information
- ✅ Health alerts and warnings

### Advanced Features
- ✅ Deep Research Mode for detailed analysis
- ✅ Harmful ingredient detection
- ✅ Bacteria and contamination risks
- ✅ Food poisoning warnings
- ✅ Unsafe food combination alerts
- ✅ Country ban detection
- ✅ Re-scan functionality

### Voice & Accessibility
- ✅ AI-powered voice output
- ✅ Multi-language text-to-speech
- ✅ Speaks: food name, calories, protein, fat, sugar, warnings, analysis

## 🏗️ Project Structure

```
food-scanner-app/
├── src/
│   ├── screens/
│   │   ├── LanguageSelectionScreen.js
│   │   ├── RegionSelectionScreen.js
│   │   ├── ScannerScreen.js
│   │   └── ResultDetailsScreen.js
│   ├── components/
│   │   ├── BottomSheet.js
│   │   ├── AnimatedButton.js
│   │   └── NutritionCard.js
│   ├── services/
│   │   ├── foodAPI.js (USDA, Wikipedia, Edamam, Open Food Facts)
│   │   └── voiceService.js
│   ├── theme/
│   │   ├── colors.js (White/Black/Grey palette)
│   │   ├── spacing.js
│   │   └── animations.js (Instagram-style)
│   ├── config/
│   │   └── localization.js
│   ├── locales/
│   │   ├── en.json
│   │   ├── hi.json
│   │   ├── es.json
│   │   └── ... (more languages)
│   └── database/
│       └── foodDatabase.js
├── App.js (Main navigation)
├── app.json (Expo config)
├── package.json
└── README.md
```

## 🔌 API Integration

### Food Data Sources
- **USDA FoodData Central**: Comprehensive nutritional data
- **Wikipedia API**: Food history, origins, descriptions
- **Edamam API**: Recipe and detailed nutrition
- **Open Food Facts**: Packaged food and barcode data
- **Google ML Vision**: Food image recognition

### APIs Used in Code
```javascript
// USDA Nutrition
foodService.getNutrition('apple')

// Wikipedia Food Info
wikipediaService.searchFood('banana')

// Edamam Nutrition Details
edamamService.getNutrition(['milk', 'sugar'])

// Open Food Facts Barcode
openFoodFactsService.searchProductByBarcode('8718206030138')
```

## 🎨 Theme & Animations

### Color Scheme
- Primary: White (#FFFFFF), Black (#000000)
- Secondary: Grey scale (9 shades from #F9F9F9 to #1A1A1A)
- Status: Green (success), Red (danger), Yellow (warning), Blue (info)

### Instagram-Style Animations
- **Smooth transitions** between screens
- **Bottom sheet slide animations**
- **Button press feedback**
- **Scanner focus animations**
- **Result fade-in effects**
- **Elastic bounce animations**

## 📱 Supported Platforms

- **iOS**: Version 12.0+
- **Android**: API Level 24+
- **Web**: Supported (React Native Web)

## 🌐 Supported Languages

20+ languages including:
- English, Hindi, Spanish, French, German
- Italian, Portuguese, Russian, Japanese, Chinese
- Arabic, Korean, Turkish, Vietnamese, Thai
- Indonesian, Dutch, Polish, Swedish, Ukrainian

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- Expo CLI
- iOS Simulator or Xcode
- Android Studio or Android Emulator

### Installation

```bash
# Install dependencies
npm install

# or with yarn
yarn install

# Install Expo CLI globally
npm install -g expo-cli
```

### Running the App

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

### Environment Variables

Create a `.env` file:
```
USDA_API_KEY=your_usda_api_key
EDAMAM_APP_ID=your_edamam_app_id
EDAMAM_APP_KEY=your_edamam_app_key
ML_VISION_API_KEY=your_ml_vision_api_key
```

## 📦 Key Dependencies

```json
{
  "react-native": "0.73.0",
  "expo": "^50.0.0",
  "expo-camera": "^13.4.4",
  "expo-speech": "^11.5.0",
  "react-native-reanimated": "^3.6.0",
  "@react-navigation/native": "^6.1.9",
  "axios": "^1.6.5",
  "i18n-js": "^4.4.0"
}
```

## 🔐 Permissions Required

### iOS
- Camera access
- Microphone access
- Photo library access

### Android
- CAMERA
- MICROPHONE
- INTERNET
- READ_EXTERNAL_STORAGE
- WRITE_EXTERNAL_STORAGE

## 🏥 Deep Research Mode

When enabled, the app will:
1. Re-scan the food with enhanced accuracy
2. Analyze all ingredients in detail
3. Detect harmful substances and chemicals
4. Check for bacteria risks
5. Identify banned ingredients by region
6. Provide food poisoning warnings
7. Alert on dangerous combinations

## 📊 Data Flow

```
User Scans Food
    ↓
Image Sent to ML Vision API
    ↓
Food Identified & Recognition Returned
    ↓
Query Multiple Food Databases (USDA, Wikipedia, etc.)
    ↓
Compile Comprehensive Analysis
    ↓
Display Results with Animations
    ↓
Enable Voice Output in Selected Language
```

## 🎓 Food Encyclopedia Features

- **Basic Info**: Name, origin, description
- **Nutritional Data**: Complete macros and micros
- **Vitamins & Minerals**: DV percentages
- **Health Benefits**: Positive health aspects
- **Risks**: Potential health concerns
- **Allergies**: Common allergens
- **Storage**: Proper food storage methods
- **Recipes**: Popular recipe suggestions

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run on specific device
expo run:ios --device "iPhone 15"
expo run:android --device-id emulator-5554
```

## 📈 Performance Optimization

- Lazy loading of screens
- Image caching
- API response caching (1 hour)
- Optimized re-renders with React memo
- Native thread animations with Reanimated
- Efficient database queries

## 🔒 Security Features

- API key management via environment variables
- Secure local storage of user preferences
- HTTPS only for all API calls
- User data privacy compliance
- No data tracking or telemetry

## 🚀 Future Enhancements

- [ ] Barcode scanning (NFC support)
- [ ] Recipe suggestions based on scanned food
- [ ] Meal planning and tracking
- [ ] User health profiles (allergies, dietary restrictions)
- [ ] Social features (share meals with friends)
- [ ] Push notifications for health alerts
- [ ] Offline mode with local database
- [ ] ML model optimization for edge devices
- [ ] Video scanning (scan moving food)
- [ ] AR visualization of nutritional info

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, feature requests, or suggestions, please open an issue on GitHub or contact our support team.

## 👨‍💻 Authors

- Development Team
- UI/UX Design Team
- Data Science Team

---

**Built with ❤️ for global health awareness**

Happy scanning! 🍎📸
