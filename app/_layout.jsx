import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer screenOptions={{ headerShown: true }}>
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Dashboard',
            title: 'Dashboard',
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="survey" // Not technically a tab, just a separate screen
          options={{
            drawerLabel: 'Survey',
            title: 'Survey',
          }}
        />
        <Drawer.Screen
          name="camera" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Camera',
            title: 'Camera',
          }}
        />
        <Drawer.Screen
          name="contacts" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Contacts',
            title: 'Contacts',
          }}
        />
        <Drawer.Screen
          name="location" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Location',
            title: 'Location',
          }}
        />
        <Drawer.Screen
          name="clipboard" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Clipboard',
            title: 'Clipboard',
          }}
        />
        <Drawer.Screen
          name="settings" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Settings',
            title: 'Settings',
          }}
        />
        <Drawer.Screen
          name="preview" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Survey Preview',
            title: 'Survey Preview',
            drawerItemStyle: { display: 'none' } // Hidden from drawer
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
