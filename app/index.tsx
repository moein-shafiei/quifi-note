import { useEffect } from "react";
import { Button, Text, View } from "react-native";
import { NotificationManger } from "../Notifications/notificationManager";

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
            picture: "https://uxwing.com/wp-content/themes/uxwing/download/signs-and-symbols/no-photography-icon.png",
            textMessage: "",
            title: "",
          })
        }
        title="Notify"
      />
    </View>
  );
}
