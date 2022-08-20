import { Pressable, StyleSheet, Text, View } from 'react-native';

function GoalItem ({ itemData, onDeletItem, id }) {


    return (
      <Pressable onPress={onDeletItem.bind(this, id)}>
        <View style={styles.goalItem}>
              <Text style={styles.goalText}>
                {itemData.item.text}
              </Text>
        </View>
      </Pressable>
    )
};

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#5e0acc'
      },
    goalText: {
        color: 'white'
      }
});