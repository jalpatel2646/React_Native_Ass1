import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Pressable, Alert, Platform, SafeAreaView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSurvey } from '../../context/SurveyContext';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native';
import { ScrollView } from 'react-native';

export default function History() {
  const { historyData, setHistoryData } = useSurvey();
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const handleDelete = (id) => {
    Alert.alert('Delete Survey', 'Are you sure you want to delete this survey record permanently?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setHistoryData(historyData.filter(d => d.id !== id)) }
    ]);
  };

  const filteredData = historyData.filter(item => {
    const siteMatches = (item.siteName || '').toLowerCase().includes(search.toLowerCase());
    const clientMatches = (item.clientName || '').toLowerCase().includes(search.toLowerCase());
    const matchesSearch = siteMatches || clientMatches;
    const matchesFilter = filter === 'All' || item.priority === filter;
    return matchesSearch && matchesFilter;
  });

  const getPillColor = (priority) => {
    switch(priority) {
      case 'High': return '#E53935';
      case 'Medium': return '#F39C12';
      default: return '#20B268';
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderTextGroup}>
           <Feather name="box" size={16} color="#5C4DE6" />
           <Text style={styles.siteText}>{item.siteName || 'Untitled Survey'}</Text>
        </View>
        <View style={[styles.priorityPill, { backgroundColor: getPillColor(item.priority) }]}>
           <Text style={styles.priorityPillText}>{item.priority || 'Low'}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.metaRow}>
          <Feather name="user" size={14} color="#888" />
          <Text style={styles.clientText}>{item.clientName || 'N/A'}</Text>
        </View>
        <View style={styles.metaRow}>
          <Feather name="calendar" size={14} color="#888" />
          <Text style={styles.metaText}>{item.date || 'Unknown'}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.actionRow}>
        <Pressable style={styles.viewBtn}>
          <Text style={styles.viewText}>View Report</Text>
          <Feather name="arrow-right" size={14} color="#5C4DE6" />
        </Pressable>
        <Pressable style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
          <Feather name="trash-2" size={16} color="#E53935" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Pressable 
          style={styles.menuIconWrapper}
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={28} color="#000" />
        </Pressable>
        <Text style={styles.headerTitleText}>Survey History</Text>
        <View style={{ width: 28 }} />
      </View>

      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <Feather name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search site or client..."
            placeholderTextColor="#A0A0A0"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterContainer}>
          {['All', 'Low', 'Medium', 'High'].map(p => (
            <Pressable
              key={p}
              style={[styles.filterBtn, filter === p && styles.filterBtnActive]}
              onPress={() => setFilter(p)}
            >
              <Text style={[styles.filterText, filter === p && styles.filterTextActive]}>{p}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {historyData.length === 0 ? (
          <View style={styles.emptyContainer}>
             <Feather name="file-text" size={48} color="#D0D0D0" />
             <Text style={styles.emptyTitle}>No History Available</Text>
             <Text style={styles.emptySubtitle}>Submit a new survey to view history logs.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
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
    paddingHorizontal: 16,
    backgroundColor: '#FAFAFA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  filterScroll: {
    flexGrow: 0,
    marginBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginRight: 10,
  },
  filterBtnActive: {
    backgroundColor: '#5C4DE6',
    borderColor: '#5C4DE6',
  },
  filterText: {
    color: '#777',
    fontWeight: '600',
    fontSize: 13,
  },
  filterTextActive: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ECECEC',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderTextGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  siteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 8,
  },
  priorityPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityPillText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clientText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  metaText: {
    fontSize: 13,
    color: '#888',
    marginLeft: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewText: {
    color: '#5C4DE6',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 4,
  },
  deleteBtn: {
    padding: 6,
    backgroundColor: '#FFF5F5',
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  }
});
