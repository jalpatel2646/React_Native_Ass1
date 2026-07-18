import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';

export default function LocationScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      setLoading(false);
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
    setLoading(false);
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const copyToClipboard = async () => {
    if (location) {
      const text = `Lat: ${location.coords.latitude}, Lon: ${location.coords.longitude}`;
      await Clipboard.setStringAsync(text);
      Alert.alert('Success', 'Location copied to clipboard!');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <View style={styles.card}>
          <Text style={styles.title}>Current Location</Text>
          <Text style={styles.text}>Latitude: {location.coords.latitude.toFixed(6)}</Text>
          <Text style={styles.text}>Longitude: {location.coords.longitude.toFixed(6)}</Text>
          <Text style={styles.text}>Accuracy: {location.coords.accuracy?.toFixed(2)} meters</Text>
          
          <Pressable style={styles.btn} onPress={fetchLocation}>
            <Text style={styles.btnText}>Refresh Location</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnOutline]} onPress={copyToClipboard}>
            <Text style={styles.btnTextOutline}>Copy Location</Text>
          </Pressable>
        </View>
      ) : (
        <Text>Fetching location...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 8,
    width: '100%',
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  btn: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#6200ee',
    marginTop: 10,
  },
  btnTextOutline: {
    color: '#6200ee',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
