# Smart Field Survey App

A robust React Native application built with Expo designed for creating and managing field surveys and inspections. It enables users to record data effectively, with support for location tracking and photo capturing out in the field.

## Features

- **Dashboard**: High-level overview of survey statistics (Total Surveys, Pending, Completed, Drafts) and quick actions to start new surveys.
- **Survey Forms**: Detailed forms to collect inspection data, supporting multiple field types.
- **Camera Integration**: Capture, preview, and attach photos to survey reports.
- **Location Tracking**: Automatically fetch and record the location coordinates for the survey location.
- **Clipboard/Tools**: Handy utilities and tools directly within the app.
- **History**: View past surveys, survey status, and review submitted details.
- **Profile**: Manage user preferences and system settings.

## Tech Stack

- **Framework**: React Native (Expo SDK 54)
- **Navigation**: Expo Router (File-based navigation with Tabs, Stack, and Drawer layouts)
- **Styling**: React Native StyleSheet, dynamic theming support
- **Icons**: Expo Vector Icons (Ionicons, FontAwesome, etc.)

## Project Structure

```
├── app/                  # Expo Router file-based navigation screens and layouts
├── components/           # Reusable UI components (buttons, inputs, cards)
├── constants/            # Global constants (Colors, Typography, Layouts)
├── assets/               # Images, fonts, and static resources
└── ...                   # Other configuration files
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Run on specific platforms:**
   - Press `a` in the terminal to open on an Android emulator/device
   - Press `i` to open on an iOS simulator
   - Press `w` to open on Web

## Notes
Ensure you have appropriate permissions (camera, location) granted when running the application on physical devices or emulators to utilize full hardware functionality.
