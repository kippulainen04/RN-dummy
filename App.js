import { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';
import * as Notifications from 'expo-notifications';
import { PUSH_TOKEN } from "@env";


Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  }
});

export default function App() {
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.'
        );
        return;
      }

      // const pushTokenData = await Notifications.getExpoPushTokenAsync();
      // console.log(pushTokenData);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }

    configurePushNotifications();

  }, []);


  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received');
      console.log(notification);
    }); // register an event handler function when device receives a notificaiton

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('NOTIFICATION RESPONSE RECEIVED');
      console.log(response);
      const userName = response.notification.request.content.data.userName;
      console.log(userName);
    });

    return () => {
      subscription1.remove();
      subscription2.remove();
    }
  }, [])

  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals, 
      {text: enteredGoalText, id: Math.random().toString()}
    ]);
    endAddGoalHandler();
  };

  function deleteGoalHandler(id) {
    setCourseGoals((currentCourseGoals) => {
      return currentCourseGoals.filter((goal) => goal.id !== id ) // where there is no match, we keep it
    })
  }

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the body of the notification',
        data: { userName: 'Nio' }
      },
      trigger: {
        seconds: 5
      }
    });
  }
  function sendPushNotificationHandler() {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: `${PUSH_TOKEN}`,
        title: 'Test- sent from a device',
        body: 'This is a test!'
      })
    });
  }
  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button title='Add New Goal' color='#5e0acc' onPress={startAddGoalHandler}/>
        <View style={styles.extraButton}>
          <Button title='Schedule Local Notification' color='#5e0acc' onPress={scheduleNotificationHandler} />
        </View>
        <View style={styles.extraButton}>
          <Button title='Send Push Notification' color='#5e0acc' onPress={sendPushNotificationHandler} />
        </View>
        <GoalInput 
        visible={modalIsVisible} 
        onAddGoal={addGoalHandler} 
        onCancel={endAddGoalHandler}/>
        <View style={styles.goalsContainer}>
          <FlatList data={courseGoals} renderItem={(itemData) => {
            return <GoalItem itemData={itemData} onDeletItem={deleteGoalHandler} id={itemData.item.id}/>;
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 5
  },
  extraButton: {
    marginTop: 10,
  }
});
