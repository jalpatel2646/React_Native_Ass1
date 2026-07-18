import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function SurveyHubScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Survey Management</Text>
      <Pressable style={styles.btn} onPress={() => (router as any).push('/new-survey')}>
        <Text style={styles.btnText}>Create New Survey</Text>
      </Pressable>
      <Pressable style={[styles.btn, styles.btnSecondary]} onPress={() => (router as any).push('/history')}>
        <Text style={styles.btnText}>View Survey History</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 30, textAlign: 'center' },
  btn: { backgroundColor: '#6200ee', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  btnSecondary: { backgroundColor: '#03dac6' },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
