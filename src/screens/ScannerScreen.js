import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Animated, { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { colors, spacing, typography } from '../theme/colors';
import { animationTimings, animationEasings } from '../theme/animations';

const ScannerScreen = ({ onFoodDetected }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const cameraRef = useRef(null);
  
  // Animation values
  const scanLineAnim = useSharedValue(0);
  const pulseAnim = useSharedValue(1);
  
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    
    // Start scan line animation
    startScanAnimation();
  }, []);
  
  const startScanAnimation = () => {
    scanLineAnim.value = withTiming(1, {
      duration: animationTimings.xl,
      easing: Easing.linear,
    }, () => {
      scanLineAnim.value = 0;
      startScanAnimation(); // Loop
    });
  };
  
  const scanLineAnimStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanLineAnim.value * 300 }],
  }));
  
  const handleTakePicture = async () => {
    if (!cameraRef.current) return;
    
    try {
      setIsLoading(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });
      
      // Simulate food detection
      await simulateFoodDetection(photo.uri);
    } catch (error) {
      Alert.alert('Error', 'Failed to capture image');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGalleryUpload = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Camera roll permission is required');
        return;
      }
      
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.8,
      });
      
      if (!result.canceled) {
        setIsLoading(true);
        await simulateFoodDetection(result.assets[0].uri);
        setIsLoading(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
      console.error(error);
    }
  };
  
  const simulateFoodDetection = async (imageUri) => {
    // This will be replaced with actual AI food detection
    setTimeout(() => {
      const mockFoodData = {
        name: 'Apple',
        calories: 95,
        protein: 0.5,
        fat: 0.3,
        sugar: 19,
        harmfulIngredients: [],
        imageUri: imageUri,
      };
      onFoodDetected(mockFoodData);
    }, 2000);
  };
  
  if (hasPermission === null) {
    return <View style={styles.container}><ActivityIndicator size="large" color={colors.black} /></View>;
  }
  
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Camera permission is required</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        flashMode={flashEnabled ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off}
      >
        {/* Scan Frame Overlay */}
        <View style={styles.scanOverlay}>
          <View style={styles.scanFrame}>
            {/* Corner indicators */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            
            {/* Animated scan line */}
            <Animated.View style={[styles.scanLine, scanLineAnimStyle]} />
          </View>
        </View>
        
        {/* Controls */}
        <View style={styles.controls}>
          {/* Top bar */}
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => setFlashEnabled(!flashEnabled)}
            >
              <Text style={styles.iconText}>{flashEnabled ? '⚡' : '🔦'}</Text>
            </TouchableOpacity>
          </View>
          
          {/* Bottom controls */}
          <View style={styles.bottomControls}>
            <TouchableOpacity
              style={styles.galleryButton}
              onPress={handleGalleryUpload}
              disabled={isLoading}
            >
              <Text style={styles.galleryIcon}>🖼️</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.captureButton, isLoading && styles.captureButtonDisabled]}
              onPress={handleTakePicture}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <View style={styles.captureCircle} />
              )}
            </TouchableOpacity>
            
            <View style={styles.spacer} />
          </View>
        </View>
      </Camera>
      
      {/* Info text */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Point at any food item and tap to scan</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  camera: {
    flex: 1,
  },
  scanOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 300,
    height: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: colors.white,
    borderWidth: 3,
  },
  topLeft: {
    top: -2,
    left: -2,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: -2,
    right: -2,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: -2,
    left: -2,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: -2,
    right: -2,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  scanLine: {
    height: 3,
    backgroundColor: colors.white,
    width: '100%',
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 24,
  },
  bottomControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: spacing.lg,
  },
  galleryButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.white,
  },
  galleryIcon: {
    fontSize: 28,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.white,
  },
  captureButtonDisabled: {
    opacity: 0.5,
  },
  captureCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.white,
  },
  spacer: {
    width: 60,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 160,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  infoText: {
    color: colors.white,
    fontSize: typography.body2.fontSize,
    textAlign: 'center',
    opacity: 0.8,
  },
  permissionText: {
    color: colors.white,
    fontSize: typography.body1.fontSize,
    textAlign: 'center',
  },
});

export default ScannerScreen;
