import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Marker = ({ children }) => (
  <View style={styles.markerContainer}>{children}</View>
);

export default function MapView({ children, style }) {
  return (
    <View style={[style, styles.container]}>
      <Text style={styles.text}>Map rendering is only supported on Android/iOS Native Devices.</Text>
      <Text style={styles.subText}>Falling back to standard view for Web testing.</Text>
      {/* We can still render the marker overlay */}
      <View style={styles.markerOverlay}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  text: {
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    color: '#888',
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -12 }, { translateY: -12 }], // 24 / 2 half of marker sizes used
  },
});
