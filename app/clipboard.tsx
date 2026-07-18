import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function ClipboardScreen() {
  const [pastedText, setPastedText] = useState('');
  const [notes, setNotes] = useState('');

  const copyToClipboard = async (text: string, label: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied', `${label} copied to clipboard!`);
  };

  const pasteFromClipboard = async () => {
    const hasString = await Clipboard.hasStringAsync();
    if (hasString) {
      const text = await Clipboard.getStringAsync();
      setPastedText(text);
      setNotes(text);
      Alert.alert('Pasted', 'Content pasted from clipboard');
    } else {
      Alert.alert('Empty', 'No text found in clipboard');
    }
  };

  const clearClipboard = async () => {
    await Clipboard.setStringAsync('');
    Alert.alert('Cleared', 'Clipboard data cleared');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Copy Actions</Text>
      <View style={styles.actionBlock}>
        <Pressable style={styles.btn} onPress={() => copyToClipboard('SRV-10293', 'Survey ID')}>
          <Text style={styles.btnText}>Copy Survey ID (SRV-10293)</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => copyToClipboard('+1 234 567 8900', 'Contact Number')}>
          <Text style={styles.btnText}>Copy Contact Number</Text>
        </Pressable>
        <Pressable style={styles.btn} onPress={() => copyToClipboard('Lat: 40.7128, Lon: -74.0060', 'Location')}>
          <Text style={styles.btnText}>Copy Current Location</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Paste Actions</Text>
      <View style={styles.actionBlock}>
        <Pressable style={[styles.btn, styles.btnSecondary]} onPress={pasteFromClipboard}>
          <Text style={styles.btnText}>Paste Notes</Text>
        </Pressable>
        {pastedText ? (
          <View style={styles.pastedContainer}>
            <Text style={styles.pastedLabel}>Pasted Content:</Text>
            <Text style={styles.pastedText}>{pastedText}</Text>
          </View>
        ) : null}
      </View>

      <Text style={styles.sectionTitle}>Notepad</Text>
      <TextInput
        style={styles.textArea}
        value={notes}
        onChangeText={setNotes}
        placeholder="Edit pasted notes here..."
        multiline
      />

      <Pressable style={[styles.btn, styles.btnDanger]} onPress={clearClipboard}>
        <Text style={styles.btnText}>Clear Clipboard Data</Text>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    marginTop: 20,
  },
  actionBlock: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  btnSecondary: {
    backgroundColor: '#03dac6',
  },
  btnDanger: {
    backgroundColor: '#ff5252',
    marginTop: 20,
    marginBottom: 40,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  pastedContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
  },
  pastedLabel: {
    fontSize: 12,
    color: '#555',
    marginBottom: 4,
  },
  pastedText: {
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    height: 120,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  }
});
