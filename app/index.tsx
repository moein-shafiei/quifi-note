import { DeviceNotificationService } from "@/Notifications/deviceNotificationService";
import { NotificationManger } from "@/Notifications/notificationManager";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

export default function Index()
{
  const dv = new NotificationManger();

  useEffect(() =>
  {
    dv.Initialize();
    // notificationListener.current = Notifications.addNotificationReceivedListener(notification =>
    // {
    //   setNotification(notification);
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response =>
    // {
    //   console.log(response);
    // });

    return () =>
    {
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
      style={ {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      } }
    >
      <Text>Edit app/index.tsx to edit this screen...</Text>
      <Button
        onPress={ () =>
          dv.Send({
            picture: "",
            textMessage: "",
            title: "",
          })
        }
        title="Notify"
      />
    </View>
  );
}
