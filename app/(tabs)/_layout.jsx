import { Tabs } from 'expo-router';
import { View, Pressable, StyleSheet, Text, Platform } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

function CustomTabBar({ state, descriptors, navigation }) {
  const router = useRouter();

  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          // Define icon logic based on route name
          if (route.name === 'new-survey') {
            return (
              <View key={route.key} style={styles.floatingButtonContainer}>
                <Pressable style={styles.floatingButton} onPress={onPress}>
                  <Feather name="plus" size={26} color="#FFF" />
                </Pressable>
              </View>
            );
          }

          let iconName = 'circle';
          if (route.name === 'index') iconName = 'grid';
          if (route.name === 'history') iconName = 'clock';
          if (route.name === 'profile') iconName = 'user';
          if (route.name === 'settings') iconName = 'settings';

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
            >
              <Feather 
                name={iconName} 
                size={22} 
                color={isFocused ? '#5C4DE6' : '#A0A0A0'} 
              />
              <Text style={[
                styles.tabLabel, 
                { color: isFocused ? '#5C4DE6' : '#A0A0A0', fontWeight: isFocused ? '600' : '500' }
              ]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarLabel: 'History',
        }}
      />
      <Tabs.Screen
        name="new-survey"
        options={{
          title: 'New Survey',
          tabBarLabel: '',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
      {/* We add settings here so it appears in the tab bar. Wait, if settings.jsx is not in app/(tabs), this might fail. We'll map it differently if it crashes, but expo-router allows it if we just define it and it resolves to an empty view or fallback if not physically present, or we can just create it. */}
      {/* To avoid crashing if settings doesn't exist in (tabs), we just emit events for the standard 4, and handle settings custom. But the user image shows 5 tabs. We'll just define it or navigate away. Actually, I'll provide a dummy settings.jsx if missing, or use a pseudo-tab. Let's just create a mock settings.jsx in next step if required. */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  tabBarInner: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
  },
  floatingButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30, // Lift it up
  },
  floatingButton: {
    backgroundColor: '#5C4DE6',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5C4DE6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#FFF',
  },
});
