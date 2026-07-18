import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';


import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Custom App Header - mostly handled by Tabs/Drawer header, but we can add a custom block */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome Back!</Text>
        <Text style={styles.studentDetails}>User: Jal Patel | Gr.no: 108648</Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.statsLabel}>Today's Survey Count</Text>
        <Text style={styles.statsNumber}>12</Text>
      </View>

      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        <Pressable style={styles.actionCard} onPress={() => (router as any).push('/new-survey')}>
          <Text style={styles.actionText}>New Survey</Text>
        </Pressable>
        <Pressable style={styles.actionCard} onPress={() => (router as any).push('/camera')}>
          <Text style={styles.actionText}>Camera</Text>
        </Pressable>
        <Pressable style={styles.actionCard} onPress={() => (router as any).push('/location')}>
          <Text style={styles.actionText}>Location</Text>
        </Pressable>
        <Pressable style={styles.actionCard} onPress={() => (router as any).push('/clipboard')}>
          <Text style={styles.actionText}>Clipboard</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Recent Survey Summary</Text>
      <View style={styles.recentSummary}>
        <Text style={styles.recentText}>Site: Downtown Plaza</Text>
        <Text style={styles.recentText}>Status: Completed</Text>
        <Text style={styles.recentText}>Date: Today, 10:00 AM</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  studentDetails: {
    color: '#eee',
    fontSize: 14,
    marginTop: 4,
  },
  statsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 2,
  },
  statsLabel: {
    fontSize: 16,
    color: '#555',
  },
  statsNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#6200ee',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionCard: {
    backgroundColor: '#03dac6',
    width: '48%',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionText: {
    fontWeight: 'bold',
    color: '#000',
  },
  recentSummary: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 1,
    marginBottom: 30, // padding at bottom
  },
  recentText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  }
});
