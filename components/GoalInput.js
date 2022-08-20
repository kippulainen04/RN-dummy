import { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native'

const GoalInput = ({onAddGoal}) => {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(e)  {
        setEnteredGoalText(e)
      };

    function addGoalHandler() {
        onAddGoal(enteredGoalText)
        setEnteredGoalText('')
    }  

  return (
    <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder='Your course goal!' value={enteredGoalText} onChangeText={goalInputHandler}/>
        <Button title='Add Goal' onPress={addGoalHandler}/>
      </View>
  )
}

export default GoalInput

const styles = StyleSheet.create({
        inputContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8
      },
})