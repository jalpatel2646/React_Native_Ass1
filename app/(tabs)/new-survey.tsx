import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function NewSurvey() {
  const router = useRouter();
  const [siteName, setSiteName] = useState('');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = () => {
    if (!siteName || !clientName) {
      Alert.alert('Validation Error', 'Site Name and Client Name are required.');
      return;
    }
    // Success, proceed to preview or save
    (router as any).push('/preview');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Site Name *</Text>
      <TextInput
        style={styles.input}
        value={siteName}
        onChangeText={setSiteName}
        placeholder="Enter site name"
      />

      <Text style={styles.label}>Client Name *</Text>
      <TextInput
        style={styles.input}
        value={clientName}
        onChangeText={setClientName}
        placeholder="Enter client name"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityContainer}>
        {['Low', 'Normal', 'High'].map(p => (
          <Pressable
            key={p}
            style={[styles.priorityBtn, priority === p && styles.priorityBtnSelected]}
            onPress={() => setPriority(p)}
          >
            <Text style={[styles.priorityText, priority === p && styles.priorityTextSelected]}>
              {p}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="YYYY-MM-DD"
      />

      <Pressable style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitBtnText}>Review & Submit</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  priorityBtn: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
  },
  priorityBtnSelected: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  priorityText: {
    color: '#333',
  },
  priorityTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitBtn: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
