import { Drawer } from 'expo-router/drawer';

export default function RootLayout() {
    return (
        <Drawer>
            <Drawer.Screen name="index" options={{ title: 'Home' }} />
            <Drawer.Screen name="settings" options={{ title: 'Settings' }} />
        </Drawer>
    );
}