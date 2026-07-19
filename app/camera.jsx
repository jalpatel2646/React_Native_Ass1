import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, Image, ActivityIndicator } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { useSurvey } from '../context/SurveyContext';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const { surveyData, setSurveyData } = useSurvey();
  const [photo, setPhoto] = useState(surveyData?.photoUri || null);
  const [captureTime, setCaptureTime] = useState(surveyData?.photoTime || null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      const time = new Date().toLocaleString();
      setPhoto(data.uri);
      setCaptureTime(time);
      setSurveyData(prev => ({ ...prev, photoUri: data.uri, photoTime: time }));
    }
  };

  const deletePhoto = () => {
    Alert.alert('Delete Photo', 'Are you sure you want to delete this photo?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { 
        setPhoto(null); 
        setCaptureTime(null);
        setSurveyData(prev => ({ ...prev, photoUri: null, photoTime: null }));
      } }
    ]);
  };

  if (hasPermission === null) {
    return <View style={styles.center}><ActivityIndicator size="large" color="#5D4037" /></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.center}><Text>No access to camera</Text></View>;
  }

  if (photo) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photo }} style={styles.preview} />
        <Text style={styles.timeText}>Captured: {captureTime}</Text>
        <View style={styles.actions}>
          <Pressable style={styles.btn} onPress={() => { setPhoto(null); setCaptureTime(null); }}>
            <Text style={styles.btnText}>Retake Photo</Text>
          </Pressable>
          <Pressable style={[styles.btn, styles.btnDelete]} onPress={deletePhoto}>
            <Text style={styles.btnText}>Delete Photo</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!isCameraReady && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <CameraView 
        style={styles.camera} 
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)}
      />
      <View style={styles.captureContainer}>
        <Pressable style={styles.captureBtn} onPress={takePicture}>
          <View style={styles.captureInner} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  captureContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
  },
  captureBtn: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
  },
  preview: {
    flex: 1,
  },
  timeText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#333',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#111',
  },
  btn: {
    backgroundColor: '#5D4037',
    padding: 15,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  btnDelete: {
    backgroundColor: '#ff5252',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
