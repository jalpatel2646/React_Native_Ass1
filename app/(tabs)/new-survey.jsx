import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Pressable, Platform, SafeAreaView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useSurvey } from '../../context/SurveyContext';

export default function NewSurvey() {
  const router = useRouter();
  const navigation = useNavigation();
  const { surveyData, setSurveyData } = useSurvey();
  
  const [siteName, setSiteName] = useState(surveyData?.siteName || '');
  const [clientName, setClientName] = useState(surveyData?.clientName || '');
  const [description, setDescription] = useState(surveyData?.description || '');
  const [priority, setPriority] = useState(surveyData?.priority || 'Low');
  const [notes, setNotes] = useState(surveyData?.notes || ''); // Initialize blank
  
  // Persist form data heavily before going to preview
  const handlePreview = () => {
    setSurveyData(prev => ({
       ...prev,
       siteName,
       clientName,
       description,
       priority,
       notes,
    }));
    router.push('/preview');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable 
          style={styles.menuIconWrapper}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={28} color="#000" />
        </Pressable>
        <Text style={styles.headerTitleText}>New Survey</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtext}>Complete site fields and attach inspector resources below</Text>
        
        {/* Site Name Field */}
        <Text style={styles.label}>SITE NAME <Text style={styles.requiredStar}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Feather name="box" size={20} color="#777" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={siteName}
            onChangeText={setSiteName}
            placeholder="e.g. North Station Hub"
            placeholderTextColor="#A0A0A0"
          />
        </View>

        {/* Client Name Field */}
        <Text style={styles.label}>CLIENT NAME <Text style={styles.requiredStar}>*</Text></Text>
        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#777" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={clientName}
            onChangeText={setClientName}
            placeholder="e.g. Nexus Energy Inc."
            placeholderTextColor="#A0A0A0"
          />
        </View>

        {/* Description Field */}
        <Text style={styles.label}>DESCRIPTION ASSESSMENT <Text style={styles.requiredStar}>*</Text></Text>
        <View style={[styles.inputContainer, styles.textAreaContainer]}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Describe assessment goals, structural integrity, and key logs..."
            placeholderTextColor="#A0A0A0"
            multiline
          />
        </View>

        {/* Priority Segmented Control */}
        <Text style={styles.label}>PRIORITY LEVEL</Text>
        <View style={styles.priorityContainer}>
          <Pressable
            style={[styles.priorityBtn, priority === 'Low' && styles.priorityBtnSelected]}
            onPress={() => setPriority('Low')}
          >
            <Feather name="check-circle" size={16} color={priority === 'Low' ? '#FFF' : '#20B268'} />
            <Text style={[styles.priorityText, { color: priority === 'Low' ? '#FFF' : '#333' }]}>Low</Text>
          </Pressable>

          <Pressable
            style={[styles.priorityBtn, { marginHorizontal: 8 }, priority === 'Medium' && styles.priorityBtnMedium]}
            onPress={() => setPriority('Medium')}
          >
            <Feather name="alert-triangle" size={16} color={priority === 'Medium' ? '#FFF' : '#FF9800'} />
            <Text style={[styles.priorityText, { color: priority === 'Medium' ? '#FFF' : '#333' }]}>Medium</Text>
          </Pressable>

          <Pressable
            style={[styles.priorityBtn, priority === 'High' && styles.priorityBtnHigh]}
            onPress={() => setPriority('High')}
          >
            <Feather name="alert-circle" size={16} color={priority === 'High' ? '#FFF' : '#E53935'} />
            <Text style={[styles.priorityText, { color: priority === 'High' ? '#FFF' : '#333' }]}>High</Text>
          </Pressable>
        </View>

        {/* Inspection Date */}
        <Text style={styles.label}>INSPECTION DATE</Text>
        <View style={styles.inputContainer}>
          <Feather name="calendar" size={20} color="#6C5CE7" style={styles.inputIcon} />
          <Text style={styles.dateText}>Sun, 19 Jul, 2026</Text>
          <Feather name="chevron-down" size={20} color="#777" style={styles.chevronIcon} />
        </View>

        {/* Required Attachments */}
        <Text style={styles.label}>REQUIRED ATTACHMENTS</Text>
        <View style={styles.attachmentsContainer}>
          
          <Pressable style={styles.attachmentItem} onPress={() => router.push('/camera')}>
            <View style={[styles.attachmentIconWrapper, { backgroundColor: '#E6F8EF' }]}>
              <Feather name="camera" size={18} color="#20B268" />
            </View>
            <View style={styles.attachmentTextWrapper}>
              <Text style={styles.attachmentTitle}>Site Image Capture</Text>
              <Text style={[styles.attachmentSubtitle, { color: '#20B268', fontWeight: '600' }]}>Image attached successfully</Text>
            </View>
            <View style={styles.checkIconWrapper}>
              <Feather name="check" size={14} color="#FFF" />
            </View>
          </Pressable>

          <View style={styles.attachmentDivider} />

          <Pressable style={styles.attachmentItem} onPress={() => router.push('/location')}>
            <View style={[styles.attachmentIconWrapper, { backgroundColor: '#E6F8EF' }]}>
              <Feather name="map-pin" size={18} color="#20B268" />
            </View>
            <View style={styles.attachmentTextWrapper}>
              <Text style={styles.attachmentTitle}>GPS Marker Coordinates</Text>
              <Text style={[styles.attachmentSubtitle, { color: '#20B268', fontWeight: '600' }]}>GPS coordinates pinned</Text>
            </View>
            <View style={styles.checkIconWrapper}>
              <Feather name="check" size={14} color="#FFF" />
            </View>
          </Pressable>

          <View style={styles.attachmentDivider} />

          <Pressable style={styles.attachmentItem} onPress={() => router.push('/contacts')}>
            <View style={[styles.attachmentIconWrapper, { backgroundColor: '#E6F8EF' }]}>
              <Feather name="users" size={18} color="#20B268" />
            </View>
            <View style={styles.attachmentTextWrapper}>
              <Text style={styles.attachmentTitle}>Site Representative Contact</Text>
              <Text style={[styles.attachmentSubtitle, { color: '#20B268', fontWeight: '600' }]}>Ambulance linked</Text>
            </View>
            <View style={styles.checkIconWrapper}>
              <Feather name="check" size={14} color="#FFF" />
            </View>
          </Pressable>
        </View>

        {/* Additional Notes Field */}
        <Text style={styles.label}>ADDITIONAL NOTES</Text>
        <View style={[styles.inputContainer, styles.textAreaContainer, { height: 100, marginBottom: 20 }]}>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Add any extra information here..."
            placeholderTextColor="#A0A0A0"
            multiline
          />
        </View>

        {/* Preview Button */}
        <Pressable 
          style={styles.previewBtn} 
          onPress={handlePreview}
        >
          <Feather name="eye" size={20} color="#FFF" style={{ marginRight: 8 }} />
          <Text style={styles.previewBtnText}>Preview Survey Report</Text>
        </Pressable>

        <View style={{ height: 120 }} />
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
  menuIconWrapper: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  headerTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  subtext: {
    fontSize: 13,
    color: '#777',
    marginBottom: 20,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#888',
    marginBottom: 8,
    marginTop: 16,
    letterSpacing: 0.5,
  },
  requiredStar: {
    color: '#E53935',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
  },
  textAreaContainer: {
    height: 100,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  textArea: {
    textAlignVertical: 'top',
    height: '100%',
    fontWeight: '700',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 12,
    backgroundColor: '#FFF',
  },
  priorityBtnSelected: {
    backgroundColor: '#20B268',
    borderColor: '#20B268',
  },
  priorityBtnMedium: {
    backgroundColor: '#F39C12',
    borderColor: '#F39C12',
  },
  priorityBtnHigh: {
    backgroundColor: '#E53935',
    borderColor: '#E53935',
  },
  priorityText: {
    marginLeft: 6,
    fontWeight: '700',
    fontSize: 14,
  },
  dateText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  chevronIcon: {
    marginLeft: 'auto',
  },
  attachmentsContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  attachmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  attachmentIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EEFE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  attachmentTextWrapper: {
    flex: 1,
  },
  attachmentTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  attachmentSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  attachmentDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 12,
    marginLeft: 54, // Align with text
  },
  checkIconWrapper: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#20B268',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  previewBtn: {
    flexDirection: 'row',
    backgroundColor: '#5C4DE6',
    borderRadius: 14,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#5C4DE6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  previewBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  }
});
