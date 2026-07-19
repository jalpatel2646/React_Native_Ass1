import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform, SafeAreaView } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import { useSurvey } from '../../context/SurveyContext';

export default function Dashboard() {
  const router = useRouter();
  const navigation = useNavigation();
  const { historyData } = useSurvey();
  const recentSurveys = historyData.slice(0, 3); // Grab latest 3

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable 
          style={styles.menuIconWrapper}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={28} color="#000" />
        </Pressable>
        <Text style={styles.headerTitleText}>Dashboard</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Purple Banner */}
        <View style={styles.bannerContainer}>
          <View style={styles.bannerBgCircle1} />
          <View style={styles.bannerBgCircle2} />
          <View style={styles.bannerHeader}>
             <Feather name="cloud-drizzle" size={16} color="#D7CCC8" />
             <Text style={styles.goodAfternoonText}>GOOD AFTERNOON</Text>
          </View>
          <Text style={styles.bannerTitle}>Smart Field Inspector</Text>
          <Text style={styles.bannerSubtitle}>Optimize site surveys & logs with offline sync</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileBorderLeft} />
          <View style={styles.profileHeaderRow}>
            <Text style={styles.fieldRepText}>FIELD REPRESENTATIVE</Text>
            <View style={styles.activeBadge}>
              <Text style={styles.activeBadgeText}>ACTIVE</Text>
            </View>
          </View>

          <View style={styles.profileContentRow}>
            <Image 
              source={require('../../assets/images/jal_final.png')} 
              style={styles.profileImage} 
            />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>Jal Patel</Text>
              <Text style={styles.profileRole}>React Native Mobile App Development</Text>
              <View style={styles.batchRow}>
                <MaterialCommunityIcons name="ribbon" size={14} color="#353568" />
                <Text style={styles.batchText}>Batch 2026</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.iconWrapper, { backgroundColor: '#EFEBE9' }]}>
              <Feather name="calendar" size={20} color="#5D4037" />
            </View>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statSubtitle}>Today's Surveys</Text>
          </View>
          
          <View style={styles.statCard}>
            <View style={[styles.iconWrapper, { backgroundColor: '#EBF6FF' }]}>
              <Feather name="check-circle" size={20} color="#1DA1F2" />
            </View>
            <Text style={styles.statNumber}>{historyData.length}</Text>
            <Text style={styles.statSubtitle}>Total Completed</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Inspection Tools</Text>

        {/* Quick Inspection Tools */}
        <View style={styles.toolsRow}>
          <Pressable style={styles.toolCard} onPress={() => router.push('/new-survey')}>
            <View style={[styles.iconWrapper, { backgroundColor: '#EFEBE9', marginBottom: 12 }]}>
              <Feather name="edit" size={20} color="#5D4037" />
            </View>
            <Text style={styles.toolTitle}>New Survey</Text>
            <Text style={styles.toolSubtitle}>Start survey draft</Text>
          </Pressable>

          <Pressable style={styles.toolCard} onPress={() => router.push('/camera')}>
            <View style={[styles.iconWrapper, { backgroundColor: '#EBF6FF', marginBottom: 12 }]}>
              <Feather name="camera" size={20} color="#1DA1F2" />
            </View>
            <Text style={styles.toolTitle}>Camera Capture</Text>
            <Text style={styles.toolSubtitle}>Capture site photos</Text>
          </Pressable>
        </View>

        <View style={styles.toolsRow}>
          <Pressable style={styles.toolCard} onPress={() => router.push('/location')}>
            <View style={[styles.iconWrapper, { backgroundColor: '#E6F8EF', marginBottom: 12 }]}>
              <Feather name="map-pin" size={20} color="#20B268" />
            </View>
            <Text style={styles.toolTitle}>Location</Text>
            <Text style={styles.toolSubtitle}>Pin coordinates</Text>
          </Pressable>

          <Pressable style={styles.toolCard} onPress={() => router.push('/clipboard')}>
            <View style={[styles.iconWrapper, { backgroundColor: '#FFF4E5', marginBottom: 12 }]}>
              <Feather name="users" size={20} color="#FF9800" />
            </View>
            <Text style={styles.toolTitle}>Contact</Text>
            <Text style={styles.toolSubtitle}>Associate contact</Text>
          </Pressable>
        </View>
        
        {/* Recent Surveys Section */}
        <View style={styles.recentHeader}>
           <Text style={styles.sectionTitle}>Recent Surveys</Text>
           <Pressable onPress={() => router.push('/history')}>
              <Text style={styles.viewAllText}>View All</Text>
           </Pressable>
        </View>
        
        {recentSurveys.length > 0 ? (
          recentSurveys.map((survey, index) => (
            <View key={index} style={styles.recentCard}>
              <View style={styles.recentIconBox}>
                <Feather name="file-text" size={18} color="#5D4037" />
              </View>
              <View style={styles.recentContent}>
                <Text style={styles.recentSite}>{survey.siteName || 'Untitled Survey'}</Text>
                <Text style={styles.recentClient}>{survey.clientName || 'N/A'}</Text>
              </View>
              <View style={styles.recentDateBox}>
                <Text style={styles.recentDate}>{survey.date || 'Unknown'}</Text>
                <Feather name="chevron-right" size={16} color="#C4C4C4" />
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyRecent}>
            <Text style={styles.emptyRecentText}>No recent surveys found.</Text>
          </View>
        )}

        {/* Padding for bottom tab */}
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
  bannerContainer: {
    backgroundColor: '#5D4037',
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  bannerBgCircle1: {
    position: 'absolute',
    right: -40,
    top: -40,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  bannerBgCircle2: {
    position: 'absolute',
    right: 60,
    bottom: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  bannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  goodAfternoonText: {
    color: '#D7CCC8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginLeft: 6,
  },
  bannerTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  bannerSubtitle: {
    color: '#D7CCC8',
    fontSize: 13,
    lineHeight: 18,
  },
  profileCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  profileBorderLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#5D4037',
  },
  profileHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingLeft: 8,
  },
  fieldRepText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#795548',
    letterSpacing: 0.5,
  },
  activeBadge: {
    backgroundColor: '#E6F8EF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  activeBadgeText: {
    color: '#20B268',
    fontSize: 10,
    fontWeight: 'bold',
  },
  profileContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  profileRole: {
    fontSize: 12,
    color: '#888',
    marginBottom: 6,
  },
  batchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batchText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A40',
    marginLeft: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statCardLeft: {
    marginRight: 8,
  },
  statCardRight: {
    marginLeft: 8,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 12,
    marginBottom: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  toolsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  toolCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  toolTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  toolSubtitle: {
    fontSize: 12,
    color: '#888',
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  viewAllText: {
    fontSize: 14,
    color: '#5D4037',
    fontWeight: '700',
  },
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  recentIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#EFEBE9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  recentContent: {
    flex: 1,
  },
  recentSite: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  recentClient: {
    fontSize: 13,
    color: '#666',
  },
  recentDateBox: {
    alignItems: 'flex-end',
    flexDirection: 'row'
  },
  recentDate: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
  },
  emptyRecent: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D0D0D0',
  },
  emptyRecentText: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  }
});

