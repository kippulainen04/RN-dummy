import { Pressable, StyleSheet, Text, View } from 'react-native';

function GoalItem ({ itemData, onDeletItem, id }) {


    return (
        <View style={styles.goalItem}>
            <Pressable 
            android_ripple={{color: '#dddddd'}} 
            onPress={onDeletItem.bind(this, id)}
            style={({ pressed }) => pressed && styles.pressedItem}
            >
              <Text style={styles.goalText}>
                {itemData.item.text}
              </Text>
              </Pressable>
        </View>
    )
};

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc'
      },
    goalText: {
      padding: 8,
      color: 'white'
      },
    pressedItem: {
      opacity: 1
    }
});