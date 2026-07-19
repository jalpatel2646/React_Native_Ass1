import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter, usePathname } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

function CustomDrawerContent(props) {
  const router = useRouter();
  const pathname = usePathname();

  // Helper function to figure out if we're on a specific tab/route
  const isActive = (path, matchPath) => {
    if (path === '/' && (pathname === '/' || pathname === '/(tabs)')) return true;
    if (pathname.includes(matchPath)) return true;
    return false;
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentContainer} bounces={false}>
      <View style={styles.headerArea}>
        <View style={styles.headerBackground}>
           <View style={styles.headerCircle1} />
           <View style={styles.headerCircle2} />
        </View>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('../assets/images/jal_final.png')}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.userName}>Jal Patel</Text>
      </View>

      <View style={styles.menuContainer}>
        <Text style={styles.sectionTitle}>CORE PAGES</Text>

        <Pressable 
          style={[styles.menuItem, isActive('/', '/(tabs)') ? styles.activeItem : null]} 
          onPress={() => router.push('/(tabs)')}
        >
          <Feather name="grid" size={20} color={isActive('/', '/(tabs)') ? '#FFF' : '#333'} />
          <Text style={[styles.menuText, isActive('/', '/(tabs)') ? styles.activeText : null]}>Dashboard</Text>
        </Pressable>

        <Pressable 
          style={[styles.menuItem, isActive('/survey', '/survey') ? styles.activeItem : null]} 
          onPress={() => router.push('/survey')}
        >
          <Feather name="edit" size={20} color={isActive('/survey', '/survey') ? '#FFF' : '#333'} />
          <Text style={[styles.menuText, isActive('/survey', '/survey') ? styles.activeText : null]}>New Survey</Text>
        </Pressable>

        <Pressable 
          style={[styles.menuItem, isActive('/history', '/history') ? styles.activeItem : null]} 
          onPress={() => router.push('/(tabs)/history')}
        >
          <Feather name="clock" size={20} color={isActive('/history', '/history') ? '#FFF' : '#333'} />
          <Text style={[styles.menuText, isActive('/history', '/history') ? styles.activeText : null]}>Survey History</Text>
        </Pressable>


        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>HARDWARE UTILITIES</Text>

        <Pressable 
          style={[styles.menuItem, isActive('/camera', '/camera') ? styles.activeItem : null]} 
          onPress={() => router.push('/camera')}
        >
          <Feather name="camera" size={20} color={isActive('/camera', '/camera') ? '#FFF' : '#333'} />
          <Text style={[styles.menuText, isActive('/camera', '/camera') ? styles.activeText : null]}>Camera Capture</Text>
        </Pressable>

        <Pressable 
          style={[styles.menuItem, isActive('/contacts', '/contacts') ? styles.activeItem : null]} 
          onPress={() => router.push('/contacts')}
        >
          <Feather name="users" size={20} color={isActive('/contacts', '/contacts') ? '#FFF' : '#333'} />
          <Text style={[styles.menuText, isActive('/contacts', '/contacts') ? styles.activeText : null]}>Contacts Integration</Text>
        </Pressable>

        <Pressable 
          style={[styles.menuItem, isActive('/location', '/location') ? styles.activeItem : null]} 
          onPress={() => router.push('/location')}
        >
          <Feather name="map-pin" size={20} color={isActive('/location', '/location') ? '#FFF' : '#333'} />
          <Text style={[styles.menuText, isActive('/location', '/location') ? styles.activeText : null]}>GPS Mapping</Text>
        </Pressable>

        <Pressable 
          style={[styles.menuItem, isActive('/clipboard', '/clipboard') ? styles.activeItem : null]} 
          onPress={() => router.push('/clipboard')}
        >
          <Feather name="clipboard" size={20} color={isActive('/clipboard', '/clipboard') ? '#FFF' : '#333'} />
          <Text style={[styles.menuText, isActive('/clipboard', '/clipboard') ? styles.activeText : null]}>Clipboard Actions</Text>
        </Pressable>
        
        <View style={styles.bottomDivider} />
        
        <Pressable 
          style={[styles.menuItem, isActive('/settings', '/settings') ? styles.activeItem : null, { marginTop: 4 }]} 
          onPress={() => router.push('/settings')}
        >
          <Feather name="settings" size={20} color={isActive('/settings', '/settings') ? '#FFF' : '#333'} />
          <Text style={[styles.menuText, isActive('/settings', '/settings') ? styles.activeText : null]}>App Settings</Text>
        </Pressable>

      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Field App © 2026</Text>
      </View>
    </DrawerContentScrollView>
  );
}

import { SurveyProvider } from '../context/SurveyContext';

export default function Layout() {
  return (
    <SurveyProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer 
          screenOptions={{ headerShown: true, drawerActiveBackgroundColor: '#5D4037', drawerActiveTintColor: '#FFF' }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerLabel: 'Dashboard',
              title: 'Dashboard',
              headerShown: false,
            }}
          />
          <Drawer.Screen
            name="survey"
            options={{
              drawerLabel: 'Survey',
              title: 'Survey',
            }}
          />
          <Drawer.Screen
            name="camera"
            options={{
              drawerLabel: 'Camera',
              title: 'Camera',
            }}
          />
          <Drawer.Screen
            name="contacts"
            options={{
              drawerLabel: 'Contacts',
              title: 'Contacts',
            }}
          />
          <Drawer.Screen
            name="location"
            options={{
              drawerLabel: 'Location',
              title: 'Location',
            }}
          />
          <Drawer.Screen
            name="clipboard"
            options={{
              drawerLabel: 'Clipboard',
              title: 'Clipboard',
            }}
          />
          <Drawer.Screen
            name="settings"
            options={{
              drawerLabel: 'Settings',
              title: 'Settings',
            }}
          />
          <Drawer.Screen
            name="preview"
            options={{
              drawerLabel: 'Survey Preview',
              title: 'Survey Preview',
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </SurveyProvider>
  );
}

const styles = StyleSheet.create({
  drawerContentContainer: {
    paddingTop: 0,
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  headerArea: {
    position: 'relative',
    alignItems: 'center',
    paddingBottom: 24,
  },
  headerBackground: {
    backgroundColor: '#5D4037',
    height: 130,
    width: '100%',
    position: 'absolute',
    top: 0,
    overflow: 'hidden',
  },
  headerCircle1: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -80,
    right: -80,
  },
  headerCircle2: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.05)',
    bottom: -30,
    left: -40,
  },
  avatarContainer: {
    marginTop: 80, // Middle of the 130px header so it overlaps bottom
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },
  userName: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  menuContainer: {
    paddingHorizontal: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#795548',
    letterSpacing: 1,
    marginTop: 10,
    marginBottom: 12,
    marginLeft: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginBottom: 6,
  },
  activeItem: {
    backgroundColor: '#5D4037',
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
  },
  activeText: {
    color: '#FFF',
    fontWeight: '700',
  },
  bottomDivider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginTop: 16,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  footerContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  }
});
