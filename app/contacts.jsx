import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Alert, Pressable, RefreshControl } from 'react-native';
import * as Contacts from 'expo-contacts';
import * as Clipboard from 'expo-clipboard';

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const fetchContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      setPermissionGranted(true);
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setContacts(data);
      }
    } else {
      setPermissionGranted(false);
      Alert.alert('Permission Denied', 'Cannot access contacts');
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContacts();
    setRefreshing(false);
  };

  const copyToClipboard = async (number) => {
    await Clipboard.setStringAsync(number);
    Alert.alert('Success', 'Contact number copied to clipboard!');
  };

  if (!permissionGranted) {
    return (
      <View style={styles.center}>
        <Text>Please grant contacts permission to view this page.</Text>
        <Pressable style={styles.btn} onPress={fetchContacts}>
          <Text style={styles.btnText}>Request Permission</Text>
        </Pressable>
      </View>
    );
  }

  const filteredContacts = contacts.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const initial = item.name ? item.name.charAt(0).toUpperCase() : '?';
    const number = item.phoneNumbers && item.phoneNumbers.length > 0 
      ? item.phoneNumbers[0].number 
      : null;

    return (
      <View style={styles.contactCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initial}</Text>
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactNumber}>{number || 'No Number'}</Text>
        </View>
        {number && (
          <Pressable style={styles.copyBtn} onPress={() => copyToClipboard(number)}>
            <Text style={styles.copyBtnText}>Copy</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.counter}>Total Contacts: {filteredContacts.length}</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts..."
        value={search}
        onChangeText={setSearch}
      />
      {filteredContacts.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No contacts found.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  btn: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  header: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  counter: {
    fontSize: 14,
    color: '#666',
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  contactNumber: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  copyBtn: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  copyBtnText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#999',
  }
});
