import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, ActivityIndicator, SafeAreaView, ScrollView, Platform } from 'react-native';
import * as Location from 'expo-location';
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import MapView, { Marker } from '../components/MapView';

export default function LocationScreen() {
  const router = useRouter();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mapType, setMapType] = useState('satellite');

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
      const text = `${location.coords.latitude.toFixed(6)}, ${location.coords.longitude.toFixed(6)}`;
      await Clipboard.setStringAsync(text);
      Alert.alert('Success', 'Coordinates copied to clipboard!');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Drawer.Screen options={{ headerShown: false }} />
      
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitleText}>Location Utility</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View style={styles.statusBanner}>
          <Feather name="check-circle" size={18} color="#20B268" />
          <Text style={styles.statusText}>GPS Satellite Lock Acquired</Text>
        </View>

        {/* Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
             <View style={styles.greenDot} />
             <Text style={styles.cardHeaderTitle}>GPS DATA INPUT</Text>
          </View>
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>LATITUDE</Text>
            <Text style={styles.dataValue}>{location ? location.coords.latitude.toFixed(6) : '--'}</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>LONGITUDE</Text>
            <Text style={styles.dataValue}>{location ? location.coords.longitude.toFixed(6) : '--'}</Text>
          </View>
          <View style={styles.divider} />
          
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>ACCURACY</Text>
            <Text style={[styles.dataValue, { color: '#00B4D8' }]}>
               ± {location ? Math.round(location.coords.accuracy) : '--'} meters
            </Text>
          </View>
        </View>

        {/* Map View Container */}
        <View style={styles.mapContainer}>
          {location ? (
             <MapView 
                style={styles.map}
                mapType={mapType}
                initialRegion={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
             >
                <Marker 
                  coordinate={{
                    latitude: location.coords.latitude, 
                    longitude: location.coords.longitude
                  }}
                >
                   <View style={styles.customMarker}>
                     <View style={styles.customMarkerInner} />
                   </View>
                </Marker>
             </MapView>
          ) : (
             <View style={[styles.map, styles.mapLoading]}>
                {errorMsg ? (
                  <Text style={styles.errorText}>{errorMsg}</Text>
                ) : (
                  <ActivityIndicator size="large" color="#5D4037" />
                )}
             </View>
          )}

          {/* Map Type Toggle */}
          <View style={styles.mapTypeToggle}>
            <Pressable 
               style={[styles.toggleBtn, mapType === 'standard' && styles.toggleBtnActive]}
               onPress={() => setMapType('standard')}
            >
               <Text style={[styles.toggleText, mapType === 'standard' && styles.toggleTextActive]}>Default</Text>
            </Pressable>
            <Pressable 
               style={[styles.toggleBtn, mapType === 'satellite' && styles.toggleBtnActive]}
               onPress={() => setMapType('satellite')}
            >
               <Text style={[styles.toggleText, mapType === 'satellite' && styles.toggleTextActive]}>Satellite</Text>
            </Pressable>
          </View>
        </View>

        {/* Actions List */}
        <View style={styles.actionsContainer}>
          <Pressable style={styles.actionItem} onPress={fetchLocation}>
             <View style={[styles.actionIconWrapper, { backgroundColor: '#EFEBE9' }]}>
               <Feather name="rotate-cw" size={18} color="#5D4037" />
             </View>
             <Text style={styles.actionText}>Refresh Coordinates</Text>
             <Feather name="chevron-right" size={20} color="#CCC" />
          </Pressable>

          <Pressable style={styles.actionItem} onPress={copyToClipboard}>
             <View style={[styles.actionIconWrapper, { backgroundColor: '#EBF6FF' }]}>
               <Feather name="copy" size={18} color="#00B4D8" />
             </View>
             <Text style={styles.actionText}>Copy Coordinates</Text>
             <Feather name="chevron-right" size={20} color="#CCC" />
          </Pressable>
          
          <Pressable style={styles.actionItem} onPress={() => router.back()}>
             <View style={[styles.actionIconWrapper, { backgroundColor: '#E6F8E9' }]}>
               <Feather name="paperclip" size={18} color="#20B268" />
             </View>
             <Text style={styles.actionText}>Attach to Survey Template</Text>
             <Feather name="chevron-right" size={20} color="#CCC" />
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    paddingTop: Platform.OS === 'android' ? 30 : 12,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  statusBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6F8EF',
    borderWidth: 1,
    borderColor: '#C3EADA',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  statusText: {
    color: '#20B268',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 8,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#20B268',
    marginRight: 8,
  },
  cardHeaderTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#777',
    letterSpacing: 1,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  dataLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#777',
  },
  dataValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
  },
  mapContainer: {
    height: 250,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ECECEC',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapLoading: {
    backgroundColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#E53935',
    fontWeight: '600',
  },
  customMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(92, 77, 230, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customMarkerInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#5D4037',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  mapTypeToggle: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  toggleBtnActive: {
    backgroundColor: '#5D4037',
  },
  toggleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  toggleTextActive: {
    color: '#FFF',
  },
  actionsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ECECEC',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  actionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
  }
});
