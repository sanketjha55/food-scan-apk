# 🚀 Quick Start Guide - Food Scanner App

## Prerequisites

- **Node.js** 16+ installed
- **npm** or **yarn** package manager
- **Expo CLI**: `npm install -g expo-cli`
- **iOS Simulator** (Mac) or **Android Emulator**
- **Code editor**: VS Code recommended

## Installation Steps

### 1. Install Dependencies

```bash
cd d:\ntcc

# Install all dependencies
npm install

# or with yarn
yarn install
```

### 2. Setup Environment Variables

```bash
# Copy example to create .env file
cp .env.example .env

# Edit .env and add your API keys:
# - USDA API: https://fdc.nal.usda.gov/api-guide
# - Edamam: https://www.edamam.com/
# - Google Vision: https://cloud.google.com/vision
```

### 3. Run the App

#### Start Development Server
```bash
npm start
# or
expo start
```

#### Run on iOS
```bash
npm run ios
# or manually
i
```

#### Run on Android
```bash
npm run android
# or manually
a
```

#### Run on Web (browser)
```bash
npm run web
```

## Project Structure Overview

```
d:\ntcc\
├── src/
│   ├── screens/              # Screen components
│   │   ├── LanguageSelectionScreen.js
│   │   ├── RegionSelectionScreen.js
│   │   ├── ScannerScreen.js
│   │   └── ResultDetailsScreen.js
│   ├── services/             # API & business logic
│   │   ├── foodAPI.js
│   │   └── voiceService.js
│   ├── theme/                # Design system
│   │   ├── colors.js
│   │   ├── spacing.js
│   │   └── animations.js
│   ├── config/               # Configuration
│   │   ├── localization.js
│   │   └── environment.js
│   ├── utils/                # Utilities
│   │   ├── foodAnalysis.js
│   │   ├── storage.js
│   │   ├── format.js
│   │   └── errorHandler.js
│   ├── locales/              # Translations
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── es.json
│   ├── components/           # Reusable components
│   │   └── Common.js
│   └── database/             # Database setup
├── App.js                    # Main app & navigation
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── .env.example              # Environment template
└── README.md                 # Full documentation
```

## Key Features Implemented

✅ **Multi-language Support**: 20+ languages with voice
✅ **Food Scanner**: Live camera + gallery upload
✅ **Nutrition Analysis**: Complete nutritional breakdown
✅ **Deep Research Mode**: Advanced analysis & harm detection
✅ **Instagram Animations**: Smooth, modern UI
✅ **Food Encyclopedia**: USDA, Wikipedia, Edamam APIs
✅ **Voice Output**: Multi-language text-to-speech
✅ **Harm Detection**: Ingredient checking, warnings
✅ **Regional Alerts**: Country-specific banned ingredients
✅ **Local Storage**: Scan history, favorites

## API Keys Setup

### USDA FoodData Central
1. Visit: https://fdc.nal.usda.gov/api-guide
2. Sign up for free API key
3. Add to `.env`: `USDA_API_KEY=your_key`

### Edamam API
1. Visit: https://www.edamam.com/
2. Create developer account
3. Get App ID and Key
4. Add to `.env`:
   ```
   EDAMAM_APP_ID=your_id
   EDAMAM_APP_KEY=your_key
   ```

### Google ML Vision (Optional)
1. Visit: https://cloud.google.com/vision
2. Create project and enable Vision API
3. Add to `.env`: `ML_VISION_API_KEY=your_key`

## Common Commands

```bash
# Start development
npm start

# Run specific platform
npm run ios
npm run android
npm run web

# Check for errors
npm run lint  # (after setting up eslint)

# View logs
npx expo logs

# Reset cache
expo start --clear

# Run tests
npm test

# Build for production
eas build --platform ios
eas build --platform android
```

## Troubleshooting

### Issue: "Module not found" errors
**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install
npm start --clear
```

### Issue: Camera permission denied
**Solution:**
- Check app permissions in device settings
- Reinstall app: `npm run ios` or `npm run android`

### Issue: API key errors
**Solution:**
- Verify `.env` file exists with correct API keys
- Check API key is active/not expired
- Restart dev server: `npm start --clear`

### Issue: Animation lag
**Solution:**
- Enable USB debugging (Android)
- Use physical device instead of emulator
- Check for slow API calls

## Testing on Device

### iOS
```bash
npm run ios -- --device "iPhone 15"
```

### Android
```bash
# Find device ID
adb devices

# Run on specific device
npm run android -- --device-id <device_id>
```

## Debug Tools

### Expo DevTools
- Open in browser: Press `w` during `npm start`

### React Native Debugger
```bash
npm install --save-dev react-native-debugger
```

### Console Logs
```bash
npx expo logs
npx expo logs --clear
```

## Next Steps

1. **Get API Keys** - Set up USDA and Edamam accounts
2. **Install Dependencies** - Run `npm install`
3. **Configure Environment** - Create `.env` file
4. **Run App** - `npm start` then choose platform
5. **Test Functionality** - Scan foods, check results
6. **Customize** - Modify colors, texts, features as needed

## Support

- 📖 Full docs: See `README.md`
- 🆘 Issues: Check `.github/copilot-instructions.md`
- 💬 Questions: Review inline code comments

---

**Happy Scanning! 🍎📸**

For more details, see [README.md](./README.md)
