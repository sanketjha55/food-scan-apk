import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors, spacing, typography } from '../theme/colors';
import { SUPPORTED_REGIONS } from '../config/localization';

const RegionSelectionScreen = ({ onRegionSelected }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  
  const handleRegionSelect = (regionCode) => {
    setSelectedRegion(regionCode);
    onRegionSelected(regionCode);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Select Your Region</Text>
        <Text style={styles.subtitle}>This helps us personalize food information and regulations for your area</Text>
      </View>
      
      <ScrollView 
        style={styles.regionList}
        showsVerticalScrollIndicator={false}
      >
        {SUPPORTED_REGIONS.map((region) => (
          <TouchableOpacity
            key={region.code}
            style={[
              styles.regionItem,
              selectedRegion === region.code && styles.regionItemSelected,
            ]}
            onPress={() => handleRegionSelect(region.code)}
            activeOpacity={0.7}
          >
            <View style={styles.regionContent}>
              <Text style={styles.regionName}>{region.name}</Text>
              <Text style={styles.regionCode}>{region.country}</Text>
            </View>
            <View style={[
              styles.checkbox,
              selectedRegion === region.code && styles.checkboxSelected,
            ]}>
              {selectedRegion === region.code && (
                <Text style={styles.checkmark}>✓</Text>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {selectedRegion && (
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue to Scanner</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    marginBottom: spacing.xl,
    marginTop: spacing.lg,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.h2.fontWeight,
    color: colors.black,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.body2.fontSize,
    color: colors.grey[600],
    lineHeight: typography.body2.lineHeight,
  },
  regionList: {
    flex: 1,
    marginBottom: spacing.lg,
  },
  regionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 12,
    backgroundColor: colors.grey[50],
    borderWidth: 2,
    borderColor: colors.grey[200],
  },
  regionItemSelected: {
    backgroundColor: colors.grey[100],
    borderColor: colors.black,
  },
  regionContent: {
    flex: 1,
  },
  regionName: {
    fontSize: typography.body1.fontSize,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.xs,
  },
  regionCode: {
    fontSize: typography.caption.fontSize,
    color: colors.grey[600],
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.grey[400],
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.black,
    borderColor: colors.black,
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: colors.black,
    borderRadius: 12,
    paddingVertical: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonText: {
    color: colors.white,
    fontSize: typography.button.fontSize,
    fontWeight: typography.button.fontWeight,
  },
});

export default RegionSelectionScreen;
