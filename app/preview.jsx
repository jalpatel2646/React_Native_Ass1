import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function SurveyPreviewScreen() {
  const router = useRouter();

  const handleSubmit = () => {
    Alert.alert('Success', 'Survey submitted successfully!', [
      { text: 'OK', onPress: () => router.replace('/history') }
    ]);
  };

  const handleEdit = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Survey Details</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Site:</Text> Downtown Plaza</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Client:</Text> Acme Corp</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Date:</Text> 2023-10-25</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Priority:</Text> High</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Notes:</Text> General inspection of the main lobby.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Captured Data</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Photo:</Text> 1 Image Attached</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Location:</Text> Lat: 40.7128, Lon: -74.0060</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Contact:</Text> John Smith (+1 234 567 8900)</Text>
      </View>

      <View style={styles.actionContainer}>
        <Pressable style={[styles.btn, styles.editBtn]} onPress={handleEdit}>
          <Text style={styles.editBtnText}>Edit Survey</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.submitBtn]} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit Survey</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#6200ee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 40,
  },
  btn: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  editBtn: {
    backgroundColor: '#e0e0e0',
  },
  editBtnText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#6200ee',
  },
  submitBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  }
});
