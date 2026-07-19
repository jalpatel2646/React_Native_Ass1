import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert, SafeAreaView, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import MapView, { Marker } from '../components/MapView';
import { useSurvey } from '../context/SurveyContext';

export default function SurveyPreviewScreen() {
  const router = useRouter();
  const { surveyData, setSurveyData, setHistoryData } = useSurvey();

  const handleSubmit = () => {
    // Save to history before routing
    const newEntry = {
      id: Math.random().toString(), // basic uid
      ...surveyData,
      date: new Date().toLocaleDateString(),
    };
    
    setHistoryData(prev => [newEntry, ...prev]);

    // Clear memory
    setSurveyData({
        photoUri: null,
        photoTime: null,
        siteName: '',
        clientName: '',
        description: '',
        priority: 'Low',
        notes: ''
    });

    Alert.alert('Success', 'Survey submitted securely to History log', [
      { text: 'OK', onPress: () => router.replace('/(tabs)/history') }
    ]);
  };

  const handleEdit = () => {
    router.back();
  };

  // Safe fallback if photo isn't captured
  const imgSrc = surveyData?.photoUri 
    ? { uri: surveyData.photoUri } 
    : { uri: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3' };
  
  const timeText = surveyData?.photoTime ? surveyData.photoTime : '19/7/2026, 2:13:32 pm';

  // Fallbacks for text fields if user didn't enter anything
  const renderedSiteName = surveyData?.siteName || 'Not Provided';
  const renderedClientName = surveyData?.clientName || 'Not Provided';
  const renderedDescription = surveyData?.description || 'N/A';
  const renderedNotes = surveyData?.notes || 'No extra notes provided';
  const renderedPriority = surveyData?.priority || 'Low';

  // Determine dynamic pill color based on Priority
  const getPillColor = () => {
    switch(renderedPriority) {
      case 'High': return '#E53935';
      case 'Medium': return '#F39C12';
      default: return '#20B268';
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Drawer.Screen options={{ headerShown: false }} />
      
      {/* Custom Header */}
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={handleEdit}>
          <Feather name="chevron-left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitleText}>Preview Survey</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Banner */}
        <View style={styles.bannerContainer}>
          <View>
            <Text style={styles.bannerLabel}>DRAFT PREVIEW</Text>
            <Text style={styles.bannerDate}>Sun, 19 Jul, 2026</Text>
          </View>
          <View style={[styles.priorityPill, { backgroundColor: getPillColor() }]}>
             <Text style={styles.priorityPillText}>{renderedPriority}</Text>
          </View>
        </View>

        {/* Card 1: Site Details */}
        <View style={styles.card}>
           <View style={styles.cardHeader}>
              <Feather name="box" size={18} color="#5C4DE6" />
              <Text style={styles.cardTitle}>Site Details</Text>
           </View>
           <View style={styles.row}>
              <Text style={styles.rowLabel}>Site Name</Text>
              <Text style={styles.rowValue}>{renderedSiteName}</Text>
           </View>
           <View style={styles.row}>
              <Text style={styles.rowLabel}>Client Name</Text>
              <Text style={styles.rowValue}>{renderedClientName}</Text>
           </View>
           <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0, alignItems: 'flex-start', flexDirection: 'column' }]}>
              <Text style={styles.rowLabel}>Description</Text>
              <Text style={[styles.rowValue, { marginTop: 8, alignSelf: 'flex-end', textAlign: 'right' }]}>{renderedDescription}</Text>
           </View>
        </View>

        {/* Card 2: Site Photo */}
        <View style={styles.card}>
           <View style={styles.cardHeader}>
              <Feather name="camera" size={18} color="#5C4DE6" />
              <Text style={styles.cardTitle}>Site Photo</Text>
           </View>
           <View style={styles.imageWrapper}>
             <Image 
               source={imgSrc} 
               style={styles.capturedImage}
             />
           </View>
           <View style={styles.imageSubtextWrapper}>
             <Feather name="clock" size={12} color="#888" />
             <Text style={styles.imageSubtext}>{timeText}</Text>
           </View>
        </View>

        {/* Card 3: Location Markers */}
        <View style={styles.card}>
           <View style={styles.cardHeader}>
              <Feather name="map-pin" size={18} color="#5C4DE6" />
              <Text style={styles.cardTitle}>Location Markers</Text>
           </View>
           <View style={styles.row}>
              <Text style={styles.rowLabel}>Latitude</Text>
              <Text style={styles.rowValue}>23.223700</Text>
           </View>
           <View style={styles.row}>
              <Text style={styles.rowLabel}>Longitude</Text>
              <Text style={styles.rowValue}>72.506941</Text>
           </View>
           <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0, marginBottom: 12 }]}>
              <Text style={styles.rowLabel}>Accuracy</Text>
              <Text style={styles.rowValue}>±13 meters</Text>
           </View>
           
           <Text style={styles.mapLabel}>MAP POSITION</Text>
           <View style={styles.mapContainer}>
              <MapView 
                style={styles.map}
                mapType="satellite"
                initialRegion={{
                  latitude: 23.223700,
                  longitude: 72.506941,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker 
                  coordinate={{
                    latitude: 23.223700, 
                    longitude: 72.506941
                  }}
                >
                   <View style={styles.customMarker}>
                     <View style={styles.customMarkerInner} />
                   </View>
                </Marker>
              </MapView>
              <View style={styles.mapTypeToggle}>
                <View style={styles.toggleBtn}>
                   <Text style={styles.toggleText}>Default</Text>
                </View>
                <View style={styles.toggleBtnActive}>
                   <Text style={styles.toggleTextActive}>Satellite</Text>
                </View>
              </View>
           </View>
        </View>

        {/* Card 4: Contact Details */}
        <View style={styles.card}>
           <View style={styles.cardHeader}>
              <Feather name="users" size={18} color="#5C4DE6" />
              <Text style={styles.cardTitle}>Contact Details</Text>
           </View>
           <View style={styles.row}>
              <Text style={styles.rowLabel}>Name</Text>
              <Text style={styles.rowValue}>Ambulance</Text>
           </View>
           <View style={[styles.row, { borderBottomWidth: 0, paddingBottom: 0 }]}>
              <Text style={styles.rowLabel}>Phone</Text>
              <Text style={styles.rowValue}>102</Text>
           </View>
        </View>

        {/* Card 5: Notes */}
        <View style={styles.card}>
           <View style={styles.cardHeader}>
              <Feather name="file-text" size={18} color="#5C4DE6" />
              <Text style={styles.cardTitle}>Notes</Text>
           </View>
           <Text style={styles.notesText}>{renderedNotes}</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Action Footer */}
      <View style={styles.actionFooter}>
        <Pressable style={styles.editBtn} onPress={handleEdit}>
          <Feather name="edit-2" size={18} color="#5C4DE6" />
          <Text style={styles.editBtnText}>Edit Fields</Text>
        </Pressable>
        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Feather name="cloud-upload" size={18} color="#FFF" />
          <Text style={styles.submitBtnText}>Submit Survey</Text>
        </Pressable>
      </View>
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
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E6F8EF',
    borderWidth: 1,
    borderColor: '#C3EADA',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  bannerLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#777',
    marginBottom: 4,
  },
  bannerDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  priorityPill: {
    backgroundColor: '#20B268',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priorityPillText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: '#777',
    fontWeight: '500',
  },
  rowValue: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  imageWrapper: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#EAEAEA',
  },
  capturedImage: {
    width: '100%',
    height: '100%',
  },
  imageSubtextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  imageSubtext: {
    fontSize: 11,
    color: '#888',
    marginLeft: 4,
  },
  mapLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#777',
    marginBottom: 8,
    marginTop: 12,
    letterSpacing: 0.5,
  },
  mapContainer: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ECECEC',
    position: 'relative',
  },
  map: {
    width: '100%',
    height: '100%',
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
    backgroundColor: '#5C4DE6',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  mapTypeToggle: {
    position: 'absolute',
    bottom: 10,
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
    paddingHorizontal: 12,
  },
  toggleBtnActive: {
    backgroundColor: '#5C4DE6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  toggleText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  toggleTextActive: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  notesText: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  actionFooter: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
  },
  editBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 12,
    marginRight: 8,
    backgroundColor: '#FFF',
  },
  editBtnText: {
    color: '#5C4DE6',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  submitBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginLeft: 8,
    backgroundColor: '#5C4DE6',
  },
  submitBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  }
});
