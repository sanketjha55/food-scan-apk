# Copilot Instructions - Food Scanner App

This file contains workspace-specific instructions for developing the Food Scanner & Deep Research App.

## Project Overview

**Food Scanner & Deep Research App** is a React Native + Expo application that provides:
- AI-powered food recognition
- Comprehensive nutritional analysis
- Harmful ingredient detection
- Multi-language voice support
- Instagram-style modern UI with smooth animations

## Technology Stack

- **Framework**: React Native with Expo
- **Language**: JavaScript (ES6+)
- **Navigation**: React Navigation v6
- **Animations**: React Native Reanimated
- **API Services**: Axios with multiple food databases
- **Localization**: i18n-js for 20+ languages
- **Voice**: Expo Speech for multi-language TTS
- **Camera**: Expo Camera for food scanning

## Project Structure

```
src/
├── screens/           # All screen components
├── components/        # Reusable UI components
├── services/          # API and service logic
├── theme/             # Colors, spacing, animations
├── config/            # Localization and config
├── locales/           # Translation files
└── database/          # Local database (future)
```

## Design System

### Colors
- **Primary**: White, Black, Grey (9 shades)
- **Status**: Green (#27AE60), Red (#E74C3C), Yellow (#F39C12), Blue (#3498DB)

### Animations
- All animations follow Instagram-style smooth transitions
- Use `react-native-reanimated` for performant animations
- Animation timings: xs(100ms), sm(200ms), md(300ms), lg(500ms), xl(800ms)

### Typography
- h1: 32px, bold
- h2: 28px, bold
- h3: 24px, bold
- body1: 16px, regular
- button: 16px, semi-bold

## API Integration

### Configured Services
1. **USDA FoodData Central**: Nutrition data
2. **Wikipedia API**: Food info and history
3. **Edamam API**: Recipes and detailed nutrition
4. **Open Food Facts**: Packaged food data
5. **Google ML Vision**: Food image recognition (optional)

### Adding New API

When integrating a new API:
1. Create service file in `src/services/`
2. Use axios client from `foodAPI.js`
3. Add error handling and fallbacks
4. Document API key requirements in README

## Localization

### Adding New Language

1. Create `src/locales/[lang-code].json`
2. Add translation object
3. Register in `src/config/localization.js`
4. Add to `SUPPORTED_LANGUAGES` array
5. Test voice output with Expo Speech

### Key Translation Keys
- `welcome`, `selectLanguage`, `selectRegion`
- `scanner`, `nutrition`, `ingredients`
- `harmfulIngredients`, `warning`, `error`

## Component Guidelines

### Screen Components
- Should be functional components
- Use hooks (useState, useEffect, useRef)
- Import theme values for consistent styling
- Handle loading and error states
- Support animations via Reanimated

### Service Components
- Keep API logic separate from UI
- Use async/await for promises
- Implement proper error handling
- Cache responses where appropriate
- Log errors to console in development

## Animation Conventions

```javascript
// Use pre-defined animation configs
import { animationTimings, animationEasings } from '../theme/animations';

// Apply animations with Reanimated
Animated.timing(value, {
  duration: animationTimings.md,
  easing: animationEasings.smooth,
}).start();
```

## Best Practices

### Code Style
- Use ESLint configuration
- Follow React best practices
- Keep components under 400 lines
- Extract complex logic to custom hooks
- Use TypeScript for future scalability

### Performance
- Lazy load screens via React Navigation
- Memoize heavy components
- Cache API responses
- Optimize images
- Use native animations (Reanimated)

### Accessibility
- Provide alternative text for images
- Ensure sufficient color contrast
- Support screen readers
- Use semantic HTML/components

## Common Tasks

### Add New Screen

1. Create file in `src/screens/[ScreenName].js`
2. Export component with navigation props
3. Add route to `App.js`
4. Define screen options (animations, headers)
5. Test with proper data flow

### Add New Feature

1. Create feature branch
2. Update relevant services in `src/services/`
3. Update UI components in `src/screens/` or `src/components/`
4. Add translations to locale files
5. Test on both iOS and Android
6. Update README with feature description

### Debug on Device

```bash
# iOS
npm run ios -- --device "iPhone 15"

# Android
npm run android -- --device-id <device_id>

# View logs
npx expo logs
```

## Known Limitations & TODO

- [ ] Real ML food recognition (currently mocked)
- [ ] Offline database implementation
- [ ] Barcode scanning integration
- [ ] AR visualization
- [ ] User profiles and health tracking
- [ ] Social sharing features

## Environment Setup

### Required
- Node.js 16+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator
- Code editor (VS Code recommended)

### Optional
- Xcode (for iOS development)
- Android Studio (for Android development)
- Watchman (for file watching)

## Deployment

### iOS App Store
1. Update version in `app.json`
2. Build: `eas build --platform ios`
3. Submit: `eas submit --platform ios`

### Google Play Store
1. Update version in `app.json`
2. Build: `eas build --platform android`
3. Submit: `eas submit --platform android`

## Support & Resources

- **Expo Documentation**: https://docs.expo.dev
- **React Native**: https://reactnative.dev
- **React Navigation**: https://reactnavigation.org
- **Reanimated**: https://docs.swmansion.com/react-native-reanimated
- **Localization**: https://github.com/fnando/i18n-js

## Last Updated

May 12, 2026

---

**For questions or suggestions, please refer to the README.md or create an issue on GitHub.**
