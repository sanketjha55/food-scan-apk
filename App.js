import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LanguageSelectionScreen from './src/screens/LanguageSelectionScreen';
import RegionSelectionScreen from './src/screens/RegionSelectionScreen';
import ScannerScreen from './src/screens/ScannerScreen';
import ResultDetailsScreen from './src/screens/ResultDetailsScreen';
import { colors } from './src/theme/colors';

const Stack = createNativeStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState('Loading');
  const [foodData, setFoodData] = useState(null);
  
  useEffect(() => {
    checkFirstTimeUser();
  }, []);
  
  const checkFirstTimeUser = async () => {
    try {
      const hasLanguage = await AsyncStorage.getItem('selectedLanguage');
      const hasRegion = await AsyncStorage.getItem('selectedRegion');
      
      if (!hasLanguage || !hasRegion) {
        setInitialRoute('LanguageSelection');
      } else {
        setInitialRoute('Scanner');
      }
    } catch (error) {
      console.error('Error checking first time user:', error);
      setInitialRoute('LanguageSelection');
    }
  };
  
  const handleLanguageSelected = async (languageCode) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', languageCode);
      setInitialRoute('RegionSelection');
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };
  
  const handleRegionSelected = async (regionCode) => {
    try {
      await AsyncStorage.setItem('selectedRegion', regionCode);
      setInitialRoute('Scanner');
    } catch (error) {
      console.error('Error saving region:', error);
    }
  };
  
  const handleFoodDetected = (data) => {
    setFoodData(data);
  };
  
  const handleCloseResult = () => {
    setFoodData(null);
  };
  
  if (initialRoute === 'Loading') {
    return null;
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.white },
          animationEnabled: true,
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                opacity: current.progress,
              },
            };
          },
        }}
        initialRouteName={initialRoute}
      >
        <Stack.Screen
          name="LanguageSelection"
          component={LanguageSelectionScreen}
          listeners={({ navigation }) => ({
            focus: () => {
              navigation.setParams({ onLanguageSelected: handleLanguageSelected });
            },
          })}
          initialParams={{ onLanguageSelected: handleLanguageSelected }}
        />
        
        <Stack.Screen
          name="RegionSelection"
          component={RegionSelectionScreen}
          initialParams={{ onRegionSelected: handleRegionSelected }}
        />
        
        <Stack.Screen
          name="Scanner"
          component={ScannerScreen}
          initialParams={{ onFoodDetected: handleFoodDetected }}
        />
        
        {foodData && (
          <Stack.Screen
            name="ResultDetails"
            component={ResultDetailsScreen}
            initialParams={{ foodData, onClose: handleCloseResult }}
            options={{
              animationEnabled: true,
              cardStyle: { backgroundColor: 'transparent' },
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
