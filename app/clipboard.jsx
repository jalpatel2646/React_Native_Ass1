import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert, ScrollView, SafeAreaView, Platform } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ClipboardScreen() {
  const router = useRouter();
  const [notes, setNotes] = useState('');

  const copyToClipboard = async (text, label) => {
    if (!text) {
        Alert.alert('Empty', `No ${label} data to copy.`);
        return;
    }
    await Clipboard.setStringAsync(text);
    Alert.alert('Copied', `${label} copied to clipboard!`);
  };

  const pasteFromClipboard = async () => {
    const hasString = await Clipboard.hasStringAsync();
    if (hasString) {
      const text = await Clipboard.getStringAsync();
      setNotes(prev => prev ? `${prev}\n${text}` : text);
    } else {
      Alert.alert('Empty', 'No text found in clipboard');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitleText}>Clipboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageTitle}>Clipboard Utilities</Text>
        <Text style={styles.pageSubtitle}>Copy and paste survey data quickly</Text>

        <Text style={styles.sectionLabel}>SURVEY DATA</Text>
        <Pressable 
          style={styles.copyCard} 
          onPress={() => copyToClipboard('SURV-1784450742369', 'Survey ID')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#F0EEFE' }]}>
            <Feather name="file-text" size={20} color="#5C4DE6" />
          </View>
          <View style={styles.cardTextContainer}>
             <Text style={styles.cardTitle}>Copy Latest Survey ID</Text>
             <Text style={styles.cardSub}>SURV-1784450742369</Text>
          </View>
          <Feather name="copy" size={20} color="#888" style={styles.copyIcon} />
        </Pressable>

        <Text style={styles.sectionLabel}>CONTACT INFO</Text>
        <Pressable 
          style={[styles.copyCard, styles.cardFaded]} 
          onPress={() => copyToClipboard(null, 'Contact Number')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#EAF6F8' }]}>
            <Feather name="phone" size={20} color="#45AFC5" />
          </View>
          <View style={styles.cardTextContainer}>
             <Text style={[styles.cardTitle, { color: '#888' }]}>Copy Attached Contact Number</Text>
             <Text style={[styles.cardSub, { color: '#B0B0B0' }]}>No contact attached to draft</Text>
          </View>
          <Feather name="copy" size={20} color="#C4C4C4" style={styles.copyIcon} />
        </Pressable>

        <Text style={styles.sectionLabel}>LOCATION DATA</Text>
        <Pressable 
          style={[styles.copyCard, styles.cardFaded]} 
          onPress={() => copyToClipboard(null, 'Location')}
        >
          <View style={[styles.iconBox, { backgroundColor: '#E6F8EF' }]}>
            <Feather name="map-pin" size={20} color="#20B268" />
          </View>
          <View style={styles.cardTextContainer}>
             <Text style={[styles.cardTitle, { color: '#888' }]}>Copy Attached Location</Text>
             <Text style={[styles.cardSub, { color: '#B0B0B0' }]}>No location attached to draft</Text>
          </View>
          <Feather name="copy" size={20} color="#C4C4C4" style={styles.copyIcon} />
        </Pressable>

        <Text style={styles.sectionLabel}>NOTES</Text>
        <View style={styles.notesCard}>
          <TextInput
            style={styles.textArea}
            value={notes}
            onChangeText={setNotes}
            placeholder="Paste or type notes here..."
            placeholderTextColor="#A0A0A0"
            multiline
          />
          <View style={styles.notesActionRow}>
             <Pressable style={styles.pasteBtn} onPress={pasteFromClipboard}>
               <Feather name="clipboard" size={16} color="#45AFC5" />
               <Text style={styles.pasteBtnText}>Paste</Text>
             </Pressable>
             <Pressable style={styles.saveBtn} onPress={() => { Alert.alert('Saved', 'Draft temporarily saved'); }}>
               <Feather name="save" size={16} color="#5C4DE6" />
               <Text style={styles.saveBtnText}>Save to Draft</Text>
             </Pressable>
          </View>
        </View>
        
        <View style={{ height: 60 }} />
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
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 8,
  },
  copyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    padding: 14,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardFaded: {
    backgroundColor: '#F7F7F7',
    shadowOpacity: 0,
    elevation: 0,
    borderColor: '#F0F0F0',
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  cardSub: {
    fontSize: 12,
    color: '#777',
  },
  copyIcon: {
    marginLeft: 10,
  },
  notesCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
    marginBottom: 16,
  },
  notesActionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pasteBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#45AFC5',
    paddingVertical: 12,
    marginRight: 8,
    backgroundColor: '#EAF6F8',
  },
  pasteBtnText: {
    color: '#45AFC5',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  },
  saveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#5C4DE6',
    paddingVertical: 12,
    marginLeft: 8,
  },
  saveBtnText: {
    color: '#5C4DE6',
    fontWeight: '700',
    fontSize: 14,
    marginLeft: 6,
  }
});
