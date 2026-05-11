import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, shadows } from '../theme/colors';

/**
 * Reusable Button Component
 * Supports primary and secondary variants with animations
 */
export const Button = ({ 
  label, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  size = 'medium',
  style,
  ...props 
}) => {
  const getStyle = () => {
    const baseStyle = [styles.button];
    
    if (variant === 'primary') {
      baseStyle.push(styles.primaryButton);
    } else {
      baseStyle.push(styles.secondaryButton);
    }
    
    if (size === 'small') {
      baseStyle.push(styles.smallButton);
    } else if (size === 'large') {
      baseStyle.push(styles.largeButton);
    }
    
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }
    
    return [baseStyle, style];
  };
  
  return (
    <TouchableOpacity
      style={getStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
      {...props}
    >
      <Text style={[styles.buttonText, variant === 'secondary' && styles.secondaryButtonText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

/**
 * Reusable Card Component
 */
export const Card = ({ children, style, onPress }) => {
  const content = (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
        {content}
      </TouchableOpacity>
    );
  }
  
  return content;
};

/**
 * Nutritional Info Display Component
 */
export const NutritionRow = ({ label, value, unit = 'g' }) => (
  <View style={styles.nutritionRow}>
    <Text style={styles.nutritionLabel}>{label}</Text>
    <Text style={styles.nutritionValue}>{value}{unit}</Text>
  </View>
);

/**
 * Warning Alert Component
 */
export const WarningAlert = ({ message, type = 'warning', onDismiss }) => {
  const bgColor = type === 'danger' ? '#FFE5E5' : '#FFF3CD';
  const borderColor = type === 'danger' ? colors.danger : colors.warning;
  
  return (
    <View style={[styles.alertBox, { backgroundColor: bgColor, borderLeftColor: borderColor }]}>
      <Text style={[styles.alertText, { color: type === 'danger' ? colors.danger : '#856404' }]}>
        {message}
      </Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.alertCloseButton}>
          <Text style={styles.alertCloseText}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

/**
 * Loading Spinner Component
 */
export const LoadingSpinner = ({ size = 'large', color = colors.black }) => (
  <View style={styles.spinner}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.black,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.black,
  },
  smallButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  largeButton: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xxl,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
  },
  secondaryButtonText: {
    color: colors.black,
  },
  
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    ...shadows.md,
  },
  
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[200],
  },
  nutritionLabel: {
    fontSize: typography.body2.fontSize,
    color: colors.grey[600],
  },
  nutritionValue: {
    fontSize: typography.body2.fontSize,
    fontWeight: '600',
    color: colors.black,
  },
  
  alertBox: {
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: spacing.lg,
    marginVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  alertText: {
    fontSize: typography.body2.fontSize,
    flex: 1,
  },
  alertCloseButton: {
    padding: spacing.md,
  },
  alertCloseText: {
    fontSize: 24,
    color: '#999',
  },
  
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
});

export default {
  Button,
  Card,
  NutritionRow,
  WarningAlert,
  LoadingSpinner,
};
