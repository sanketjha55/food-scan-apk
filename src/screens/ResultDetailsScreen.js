import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  PanResponder,
  Animated,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../theme/colors';
import { voiceService } from '../services/voiceService';

const ResultDetailsScreen = ({ foodData, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const panY = useRef(new Animated.Value(0)).current;
  const bottomSheetAnim = useRef(new Animated.Value(300)).current;
  
  useEffect(() => {
    // Animate bottom sheet entrance
    Animated.spring(bottomSheetAnim, {
      toValue: 0,
      useNativeDriver: false,
      bounciness: 8,
    }).start();
  }, []);
  
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, { dy }) => {
        if (dy > 0) {
          panY.setValue(dy);
        }
      },
      onPanResponderRelease: (e, { dy, vy }) => {
        if (dy > 50 || vy > 0.5) {
          handleCollapse();
        } else {
          handleExpand();
        }
      },
    })
  ).current;
  
  const handleExpand = () => {
    setIsExpanded(true);
    Animated.spring(bottomSheetAnim, {
      toValue: 0,
      useNativeDriver: false,
      bounciness: 8,
    }).start();
    panY.setValue(0);
  };
  
  const handleCollapse = () => {
    setIsExpanded(false);
    onClose();
  };
  
  const handleSpeak = async () => {
    setIsSpeaking(true);
    try {
      await voiceService.speakFoodAnalysis(foodData);
    } catch (error) {
      console.error('Error speaking:', error);
    } finally {
      setIsSpeaking(false);
    }
  };
  
  const handleStopSpeech = async () => {
    try {
      await voiceService.stop();
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  };
  
  // Collapsed view (30% of screen)
  const collapsedContent = (
    <View style={styles.collapsedContent}>
      <View style={styles.dragHandle} {...panResponder.panHandlers} />
      <View style={styles.foodNameSection}>
        <Text style={styles.foodName}>{foodData.name}</Text>
        <Text style={styles.caloriesBadge}>{foodData.calories} kcal</Text>
      </View>
      <View style={styles.quickNutritionGrid}>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{foodData.protein}g</Text>
          <Text style={styles.nutritionLabel}>Protein</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{foodData.fat}g</Text>
          <Text style={styles.nutritionLabel}>Fat</Text>
        </View>
        <View style={styles.nutritionItem}>
          <Text style={styles.nutritionValue}>{foodData.sugar}g</Text>
          <Text style={styles.nutritionLabel}>Sugar</Text>
        </View>
      </View>
    </View>
  );
  
  // Expanded view (full screen)
  const expandedContent = (
    <ScrollView style={styles.expandedContent} showsVerticalScrollIndicator={false}>
      <View style={styles.dragHandle} {...panResponder.panHandlers} />
      
      {foodData.imageUri && (
        <Image source={{ uri: foodData.imageUri }} style={styles.foodImage} />
      )}
      
      <View style={styles.foodHeader}>
        <Text style={styles.expandedFoodName}>{foodData.name}</Text>
        <View style={styles.quickStats}>
          <Text style={styles.quickStatText}>Calories: {foodData.calories} kcal</Text>
          <Text style={styles.quickStatText}>Weight: 100g</Text>
        </View>
      </View>
      
      {/* Nutritional Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nutritional Information</Text>
        <View style={styles.nutritionDetails}>
          <DetailRow label="Calories" value={`${foodData.calories} kcal`} />
          <DetailRow label="Protein" value={`${foodData.protein}g`} />
          <DetailRow label="Fat" value={`${foodData.fat}g`} />
          <DetailRow label="Carbs" value={`${foodData.carbs || 'N/A'}g`} />
          <DetailRow label="Fiber" value={`${foodData.fiber || 'N/A'}g`} />
          <DetailRow label="Sugar" value={`${foodData.sugar}g`} />
        </View>
      </View>
      
      {/* Vitamins & Minerals */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vitamins & Minerals</Text>
        <View style={styles.nutritionDetails}>
          <DetailRow label="Vitamin C" value="45% DV" />
          <DetailRow label="Potassium" value="12% DV" />
          <DetailRow label="Iron" value="3% DV" />
          <DetailRow label="Calcium" value="2% DV" />
        </View>
      </View>
      
      {/* Ingredients */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.ingredientsList}>
          {foodData.ingredients || 'No ingredient data available'}
        </Text>
      </View>
      
      {/* Harmful Ingredients Warning */}
      {foodData.harmfulIngredients && foodData.harmfulIngredients.length > 0 && (
        <View style={[styles.section, styles.warningSection]}>
          <Text style={styles.warningSectionTitle}>⚠️ Harmful Ingredients Detected</Text>
          {foodData.harmfulIngredients.map((ingredient, index) => (
            <Text key={index} style={styles.warningItem}>• {ingredient}</Text>
          ))}
        </View>
      )}
      
      {/* Health Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Information</Text>
        <Text style={styles.healthInfo}>
          {foodData.healthInfo || 'No health information available'}
        </Text>
      </View>
      
      {/* Voice Control Button */}
      <TouchableOpacity
        style={styles.voiceButton}
        onPress={isSpeaking ? handleStopSpeech : handleSpeak}
      >
        <Text style={styles.voiceButtonText}>
          {isSpeaking ? '⏹️ Stop Speaking' : '🔊 Play Analysis'}
        </Text>
      </TouchableOpacity>
      
      {/* Deep Research Button */}
      <TouchableOpacity style={styles.deepResearchButton}>
        <Text style={styles.deepResearchButtonText}>🔬 Deep Research Mode</Text>
      </TouchableOpacity>
      
      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.bottomSheet,
          {
            transform: [
              {
                translateY: bottomSheetAnim.interpolate({
                  inputRange: [0, 300],
                  outputRange: [0, 300],
                }),
              },
            ],
          },
        ]}
      >
        {isExpanded ? expandedContent : collapsedContent}
      </Animated.View>
    </View>
  );
};

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '95%',
    ...shadows.lg,
  },
  dragHandle: {
    height: 5,
    width: 50,
    borderRadius: 2.5,
    backgroundColor: colors.grey[300],
    alignSelf: 'center',
    marginVertical: spacing.md,
  },
  
  // Collapsed View
  collapsedContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    maxHeight: '35%',
  },
  foodNameSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  foodName: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: colors.black,
  },
  caloriesBadge: {
    backgroundColor: colors.black,
    color: colors.white,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    fontSize: typography.caption.fontSize,
    fontWeight: '600',
  },
  quickNutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  nutritionLabel: {
    fontSize: 12,
    color: colors.grey[600],
    marginTop: 4,
  },
  
  // Expanded View
  expandedContent: {
    paddingHorizontal: spacing.lg,
  },
  foodImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  foodHeader: {
    marginBottom: spacing.xl,
  },
  expandedFoodName: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.h2.fontWeight,
    color: colors.black,
    marginBottom: spacing.md,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickStatText: {
    fontSize: typography.body2.fontSize,
    color: colors.grey[600],
  },
  
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.h4.fontSize,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.md,
  },
  
  nutritionDetails: {
    backgroundColor: colors.grey[50],
    borderRadius: 12,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[200],
  },
  detailLabel: {
    fontSize: typography.body2.fontSize,
    color: colors.grey[600],
  },
  detailValue: {
    fontSize: typography.body2.fontSize,
    fontWeight: '600',
    color: colors.black,
  },
  
  ingredientsList: {
    fontSize: typography.body2.fontSize,
    color: colors.grey[700],
    lineHeight: 20,
  },
  
  warningSection: {
    backgroundColor: '#FFE5E5',
    borderLeftWidth: 4,
    borderLeftColor: colors.danger,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  warningSectionTitle: {
    fontSize: typography.h4.fontSize,
    fontWeight: '600',
    color: colors.danger,
    marginBottom: spacing.md,
  },
  warningItem: {
    fontSize: typography.body2.fontSize,
    color: colors.danger,
    marginBottom: spacing.sm,
  },
  
  healthInfo: {
    fontSize: typography.body2.fontSize,
    color: colors.grey[700],
    lineHeight: 20,
  },
  
  voiceButton: {
    backgroundColor: colors.black,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    marginVertical: spacing.lg,
    alignItems: 'center',
  },
  voiceButtonText: {
    color: colors.white,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
  },
  
  deepResearchButton: {
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  deepResearchButtonText: {
    color: colors.black,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
  },
  
  bottomSpacer: {
    height: spacing.xl,
  },
});

export default ResultDetailsScreen;
