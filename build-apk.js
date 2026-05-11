#!/usr/bin/env node

/**
 * Quick APK Builder Script
 * Run this to build Android APK ready for sharing
 * 
 * Usage: node build-apk.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('\n🍎 Food Scanner - APK Builder\n');
console.log('=' .repeat(50));

// Check if eas-cli is installed
try {
  execSync('eas --version', { stdio: 'ignore' });
  console.log('✅ EAS CLI found\n');
} catch (error) {
  console.log('❌ EAS CLI not installed');
  console.log('Run: npm install -g eas-cli\n');
  process.exit(1);
}

// Check authentication
console.log('Checking Expo authentication...');
try {
  execSync('eas whoami', { stdio: 'ignore' });
  console.log('✅ Already logged in\n');
} catch (error) {
  console.log('⚠️  Not logged in to Expo');
  console.log('Running: eas login\n');
  try {
    execSync('eas login', { stdio: 'inherit' });
    console.log('\n✅ Logged in successfully\n');
  } catch (error) {
    console.log('❌ Login failed\n');
    process.exit(1);
  }
}

// Start build
console.log('Starting Android APK build...');
console.log('This may take 5-15 minutes depending on network speed\n');

try {
  execSync('eas build --platform android --type apk', { stdio: 'inherit' });
  console.log('\n' + '='.repeat(50));
  console.log('✅ Build completed successfully!\n');
  console.log('📱 Your APK is ready to download from the EAS console');
  console.log('📎 Share the APK link via WhatsApp to distribute\n');
  console.log('='.repeat(50) + '\n');
} catch (error) {
  console.log('\n❌ Build failed\n');
  process.exit(1);
}
