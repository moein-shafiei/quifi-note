import { DeviceNotificationService } from "@/Notifications/deviceNotificationService";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Button, Platform, Text, View } from "react-native";

export default function Index() {
  const dv = new DeviceNotificationService();

  useEffect(() => {
    dv.registerForPushNotificationsAsync().then(
      (token) => token
      //&& setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then(
        (value) => console.log()
        //setChannels(value ?? [])
      );
    }

    dv.initialize();
    // notificationListener.current = Notifications.addNotificationReceivedListener(notification =>
    // {
    //   setNotification(notification);
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response =>
    // {
    //   console.log(response);
    // });

    return () => {
      // notificationListener.current &&
      //   Notifications.removeNotificationSubscription(
      //     notificationListener.current
      //   );
      // responseListener.current &&
      //   Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen...</Text>
      <Button
        onPress={() => dv.schedulePushNotification()}
        title="device"
      />
    </View>
  );
}
