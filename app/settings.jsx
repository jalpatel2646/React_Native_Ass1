import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView, Platform, Alert } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSurvey } from '../context/SurveyContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { historyData } = useSurvey();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Feather name="chevron-left" size={24} color="#000" />
        </Pressable>
        <Text style={styles.headerTitleText}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <MaterialCommunityIcons name="shield-check-outline" size={32} color="#FFF" style={styles.heroIcon} />
          <Text style={styles.heroTitle}>Smart Field Survey</Text>
          <Text style={styles.heroSubtitle}>Version 1.0.0 — All 8 Modules Active</Text>
        </View>

        {/* Inspector Details */}
        <Text style={styles.sectionLabel}>INSPECTOR DETAILS</Text>
        <View style={styles.listCard}>
          <View style={styles.listRow}>
            <View style={styles.iconBox}>
              <Feather name="user" size={18} color="#795548" />
            </View>
            <Text style={styles.rowLabel}>Name</Text>
            <Text style={styles.rowValue} numberOfLines={1}>Jal Patel</Text>
          </View>
          <View style={styles.listDivider} />

          <View style={styles.listRow}>
            <View style={styles.iconBox}>
              <Ionicons name="school-outline" size={18} color="#795548" />
            </View>
            <Text style={styles.rowLabel}>Course</Text>
            <Text style={styles.rowValue} numberOfLines={1}>React Native Mobile App ...</Text>
          </View>
          <View style={styles.listDivider} />

          <View style={styles.listRow}>
            <View style={styles.iconBox}>
              <Ionicons name="layers-outline" size={18} color="#795548" />
            </View>
            <Text style={styles.rowLabel}>Batch</Text>
            <Text style={styles.rowValue} numberOfLines={1}>Batch 2026</Text>
          </View>
          <View style={styles.listDivider} />

          <View style={styles.listRow}>
            <View style={styles.iconBox}>
              <Feather name="mail" size={18} color="#795548" />
            </View>
            <Text style={styles.rowLabel}>Email</Text>
            <Text style={styles.rowValue} numberOfLines={1}>jal.patel@example.com</Text>
          </View>
        </View>

        {/* App Statistics */}
        <Text style={styles.sectionLabel}>APP STATISTICS</Text>
        <View style={styles.listCard}>
          <View style={styles.listRow}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="file-document-multiple-outline" size={18} color="#795548" />
            </View>
            <Text style={styles.rowLabel}>Total Surveys</Text>
            <Text style={styles.rowValueAccent}>{historyData.length}</Text>
          </View>
          <View style={styles.listDivider} />
          
          <View style={styles.listRow}>
            <View style={styles.iconBox}>
              <Feather name="calendar" size={18} color="#795548" />
            </View>
            <Text style={styles.rowLabel}>Today's Surveys</Text>
            <Text style={styles.rowValueAccent}>{historyData.length}</Text>
          </View>
        </View>

        {/* Data Management */}
        <Text style={styles.sectionLabel}>DATA MANAGEMENT</Text>
        <Pressable 
          style={styles.actionCard}
          onPress={() => Alert.alert("Confirm", "Are you sure you want to clear your active survey draft?")}
        >
          <View style={styles.actionIconWrapper}>
            <Feather name="file" size={20} color="#D97706" />
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Clear Survey Draft</Text>
            <Text style={styles.actionSubtitle}>Reset the active local form and cache</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#C4C4C4" />
        </Pressable>

        <View style={{ height: 100 }} />
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
  heroCard: {
    backgroundColor: '#5D4037', // Replaced purple with dark brown theme
    borderRadius: 16,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  heroIcon: {
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8A8A8A',
    letterSpacing: 0.5,
    marginBottom: 10,
    marginLeft: 4,
  },
  listCard: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  iconBox: {
    width: 24,
    alignItems: 'center',
    marginRight: 10,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#795548',
    flex: 1,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
    maxWidth: '55%',
    textAlign: 'right',
  },
  rowValueAccent: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  listDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 50,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
  actionIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FEF3C7', // Amber tint
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#8A8A8A',
  }
});
