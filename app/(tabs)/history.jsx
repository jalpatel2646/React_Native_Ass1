import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Pressable, Alert } from 'react-native';

const initialData = [
  { id: '1', site: 'Downtown Plaza', client: 'Acme Corp', priority: 'High', date: '2023-10-01' },
  { id: '2', site: 'Uptown Mall', client: 'Stark Ind', priority: 'Normal', date: '2023-10-02' },
  { id: '3', site: 'Central Park', client: 'Wayne Ent', priority: 'Low', date: '2023-10-03' },
];

export default function History() {
  const [data, setData] = useState(initialData);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const handleDelete = (id) => {
    Alert.alert('Delete Survey', 'Are you sure you want to delete this survey?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setData(data.filter(d => d.id !== id)) }
    ]);
  };

  const filteredData = data.filter(item => {
    const matchesSearch = item.site.toLowerCase().includes(search.toLowerCase()) || 
                          item.client.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || item.priority === filter;
    return matchesSearch && matchesFilter;
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardInfo}>
        <Text style={styles.siteText}>{item.site}</Text>
        <Text style={styles.clientText}>{item.client}</Text>
        <Text style={styles.metaText}>Priority: {item.priority} | Date: {item.date}</Text>
      </View>
      <Pressable style={styles.deleteBtn} onPress={() => handleDelete(item.id)}>
        <Text style={styles.deleteText}>Delete</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search site or client..."
        value={search}
        onChangeText={setSearch}
      />
      
      <View style={styles.filterContainer}>
        {['All', 'Low', 'Normal', 'High'].map(p => (
          <Pressable
            key={p}
            style={[styles.filterBtn, filter === p && styles.filterBtnActive]}
            onPress={() => setFilter(p)}
          >
            <Text style={[styles.filterText, filter === p && styles.filterTextActive]}>{p}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
  },
  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  filterBtnActive: {
    backgroundColor: '#6200ee',
  },
  filterText: {
    color: '#333',
  },
  filterTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  cardInfo: {
    flex: 1,
  },
  siteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  clientText: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  deleteBtn: {
    backgroundColor: '#ff5252',
    padding: 10,
    borderRadius: 8,
    marginLeft: 10,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
