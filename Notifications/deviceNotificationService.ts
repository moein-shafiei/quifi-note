import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { INotificationService } from "../Intermediate/INotificationService";
import { NotificationM } from "../Intermediate/Notification";

export class DeviceNotificationService implements INotificationService
{
  private isInitialized = false; // Flag to track if initialization has been performed

  constructor()
  {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }

  SetupNotificationListener(): Promise<string>
  {
    throw new Error("Method not implemented.");
  }

  async Initialize(): Promise<void>
  {
    if (this.isInitialized)
    {
      console.log("DeviceNotificationService is already initialized.");
      return;
    }

    // registerForPushNotificationsAsync().then(
    //   (token) => token
    //   //&& setExpoPushToken(token)
    // );

    const token = await this.registerForPushNotificationsAsync();

    if (Platform.OS === "android")
    {
      await Notifications.getNotificationChannelsAsync();
    }

    await this.defineNotificationCategories(); // Call your category definition method
    this.isInitialized = true; // Mark as initialized
  }

  async Send(Notification: NotificationM): Promise<void>
  {
    return this.schedulePushNotification(Notification);
  }

  async IsSupported(): Promise<boolean>
  {
    if (!Device.isDevice)
    {
      throw new Error("Must use physical device for Push Notifications.");
    }

    return true;
  }

  setupNotificationListener()
  {
    Notifications.addNotificationResponseReceivedListener((response) =>
    {
      const actionIdentifier = response.actionIdentifier;

      const notification: NotificationM = {
        picture: "",
        textMessage: "",
        title: "",
      };

      switch (actionIdentifier)
      {
        case "know":
          this.schedulePushNotification(notification);
          break;
        case "learning":
          this.schedulePushNotification(notification);
          break;
        default:
          console.log(
            "Notification clicked or unknown action:",
            actionIdentifier
          );
      }
    });
  }

  async defineNotificationCategories()
  {
    await Notifications.setNotificationCategoryAsync("customCategory", [
      {
        identifier: "know",
        buttonTitle: "👍 I know",
        options: { opensAppToForeground: true },
      },
      {
        identifier: "learning",
        buttonTitle: "💬 Learning",
        options: { opensAppToForeground: true },
      },
      // {
      //   identifier: "reply",
      //   buttonTitle: "💬 Reply",
      //   options: { opensAppToForeground: true },
      //   textInput: { placeholder: "Type your reply here..." },
      // },
    ]);
    console.log("Notification categories set up!");


  }

  async schedulePushNotification(notification: NotificationM)
  {
    //await this.defineNotificationCategories();

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here", test: { test1: "more data" } },
        categoryIdentifier: "customCategory",
      },
      trigger: null
      // trigger: {
      //   type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      //   seconds: 3,
      // },
    });
  }

  async registerForPushNotificationsAsync()
  {
    let token;

    if (Platform.OS === "android")
    {
      await Notifications.setNotificationChannelAsync("myNotificationChannel", {
        name: "A channel is needed for the permissions prompt to appear",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice)
    {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted")
      {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted")
      {
        alert("Failed to get push token for push notification!");
        return;
      }
      // Learn more about projectId:
      // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
      // EAS projectId is used here.
      try
      {
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;
        if (!projectId)
        {
          throw new Error("Project ID not found");
        }
        token = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        console.log(token);
      } catch (e)
      {
        token = `${ e }`;
      }
    } else
    {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }
}

/*
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>([]);
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text>Your expo push token: {expoPushToken}</Text>
      <Text>{`Channels: ${JSON.stringify(
        channels.map(c => c.id),
        null,
        2
      )}`}</Text>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View>
      <Button
        title="Press to schedule a notification"
        onPress={async () => {
          await schedulePushNotification();
        }}
      />
    </View>
  );
}
*/
