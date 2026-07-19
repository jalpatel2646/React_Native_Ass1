import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Platform, SafeAreaView, Pressable } from 'react-native';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useSurvey } from '../../context/SurveyContext';

export default function Profile() {
  const navigation = useNavigation();
  const { historyData } = useSurvey();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable 
          style={styles.menuIconWrapper}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={28} color="#000" />
        </Pressable>
        <Text style={styles.headerTitleText}>Inspector Profile</Text>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Purple Background Banner */}
        <View style={styles.heroBanner}>
          <View style={styles.heroCircle1} />
          <View style={styles.heroCircle2} />
        </View>

        {/* Profile Avatar & Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <Image 
              source={require('../../assets/images/jal_final.png')} 
              style={styles.avatarImage} 
            />
          </View>
          <Text style={styles.profileName}>Jal Patel</Text>
          <Text style={styles.profileEmail}>jal.patel@example.com</Text>
          
          <View style={styles.activeBadge}>
            <View style={styles.badgeDot} />
            <Text style={styles.activeBadgeText}>ACTIVE FIELD AGENT</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="check-all" size={22} color="#20B268" style={styles.statIcon} />
            <Text style={styles.statNumber}>{historyData.length}</Text>
            <Text style={styles.statLabel}>COMPLETED</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="file-document-outline" size={22} color="#7A7A9D" style={styles.statIcon} />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>NO DRAFT</Text>
          </View>
          <View style={styles.statCard}>
            <MaterialCommunityIcons name="shield-check" size={22} color="#5C4DE6" style={styles.statIcon} />
            <Text style={styles.statNumber}>T-2</Text>
            <Text style={styles.statLabel}>CLEARANCE</Text>
          </View>
        </View>

        {/* Inspector Credentials */}
        <Text style={styles.sectionTitle}>INSPECTOR CREDENTIALS</Text>
        <View style={styles.listCard}>
          <View style={styles.listRow}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="card-account-details-outline" size={20} color="#5C4DE6" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listSubtitle}>ID NUMBER</Text>
              <Text style={styles.listTitle}>INSP-2026-001</Text>
            </View>
          </View>
          
          <View style={styles.listDivider} />

          <View style={styles.listRow}>
            <View style={styles.iconBox}>
              <MaterialCommunityIcons name="school-outline" size={20} color="#5C4DE6" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listSubtitle}>COURSE NAME</Text>
              <Text style={styles.listTitle}>React Native Mobile App Development</Text>
            </View>
          </View>
          
          <View style={styles.listDivider} />

          <View style={styles.listRow}>
             <View style={styles.iconBox}>
              <MaterialCommunityIcons name="medal-outline" size={20} color="#5C4DE6" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listSubtitle}>BATCH YEAR</Text>
              <Text style={styles.listTitle}>Batch 2026</Text>
            </View>
          </View>
        </View>

        {/* Device Node Diagnostics */}
        <Text style={styles.sectionTitle}>DEVICE NODE DIAGNOSTICS</Text>
        <View style={styles.listCard}>
          <View style={[styles.listRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
            <View style={styles.iconBox}>
              <Feather name="cloud-drizzle" size={20} color="#5C4DE6" />
            </View>
            <View style={styles.listContent}>
              <Text style={styles.listSubtitle}>STORAGE MODE</Text>
              <Text style={styles.listTitle}>Cloud Sync Enabled</Text>
            </View>
          </View>
        </View>

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
    position: 'relative',
    zIndex: 10,
  },
  menuIconWrapper: {
    padding: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
  },
  headerTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroBanner: {
    height: 140,
    backgroundColor: '#6C5CE7',
    position: 'relative',
    overflow: 'hidden',
    marginTop: -20, // Seamlessly pulls it up slightly
  },
  heroCircle1: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    top: -50,
    left: -50,
  },
  heroCircle2: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    top: -20,
    right: -80,
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -60,
    marginBottom: 24,
  },
  avatarWrapper: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#FFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    backgroundColor: '#ECECEC',
    marginBottom: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
  },
  activeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#20B268',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#F0FFF7',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#20B268',
    marginRight: 6,
  },
  activeBadgeText: {
    color: '#20B268',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 28,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 4,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8A8A8A',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#222',
    letterSpacing: 0.5,
    marginLeft: 20,
    marginBottom: 10,
  },
  listCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 14,
    marginLeft: 36,
  },
  iconBox: {
    width: 24,
    alignItems: 'center',
    marginRight: 10,
  },
  listContent: {
    flex: 1,
  },
  listSubtitle: {
    fontSize: 11,
    color: '#888',
    fontWeight: '700',
    marginBottom: 2,
    letterSpacing: 0.2,
  },
  listTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
});
