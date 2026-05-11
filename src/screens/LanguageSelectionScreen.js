import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { colors, spacing, typography } from '../theme/colors';
import { SUPPORTED_LANGUAGES, setLanguage, translate } from '../config/localization';

const LanguageSelectionScreen = ({ onLanguageSelected }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLanguages, setFilteredLanguages] = useState(SUPPORTED_LANGUAGES);
  
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = SUPPORTED_LANGUAGES.filter(lang =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLanguages(filtered);
    } else {
      setFilteredLanguages(SUPPORTED_LANGUAGES);
    }
  }, [searchQuery]);
  
  const handleLanguageSelect = (languageCode) => {
    setLanguage(languageCode);
    onLanguageSelected(languageCode);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Please Select Your Language</Text>
        <Text style={styles.subtitle}>Choose your preferred language to continue</Text>
      </View>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search language..."
        placeholderTextColor={colors.grey[400]}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      
      <ScrollView 
        style={styles.languageList}
        showsVerticalScrollIndicator={false}
      >
        {filteredLanguages.map((language) => (
          <TouchableOpacity
            key={language.code}
            style={styles.languageItem}
            onPress={() => handleLanguageSelect(language.code)}
            activeOpacity={0.7}
          >
            <View>
              <Text style={styles.languageName}>{language.name}</Text>
              <Text style={styles.languageNative}>{language.nativeName}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  searchInput: {
    borderWidth: 1,
    borderColor: colors.grey[300],
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
    fontSize: typography.body1.fontSize,
    color: colors.black,
  },
  languageList: {
    flex: 1,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
    borderRadius: 12,
    backgroundColor: colors.grey[50],
    borderBottomWidth: 1,
    borderBottomColor: colors.grey[200],
  },
  languageName: {
    fontSize: typography.body1.fontSize,
    fontWeight: '600',
    color: colors.black,
    marginBottom: spacing.xs,
  },
  languageNative: {
    fontSize: typography.caption.fontSize,
    color: colors.grey[600],
  },
  arrow: {
    fontSize: 24,
    color: colors.grey[400],
  },
});

export default LanguageSelectionScreen;
