import { useState } from 'react';
import { Button, Image, Modal, StyleSheet, TextInput, View } from 'react-native'

const GoalInput = ({onAddGoal, visible, onCancel}) => {
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(e)  {
        setEnteredGoalText(e)
      };

    function addGoalHandler() {
        onAddGoal(enteredGoalText)
        setEnteredGoalText('')
    }  

  return (
    <Modal visible={visible} animationType='slide'>
        <View style={styles.inputContainer}>
            <Image style={styles.image} source={require('../assets/images/goal.png')} />
            <TextInput style={styles.textInput} 
            placeholder='Your course goal!' 
            value={enteredGoalText} 
            onChangeText={goalInputHandler}/>
            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <Button title='Add Goal' onPress={addGoalHandler}/>
                </View>
                <View style={styles.button}>
                    <Button title='Cancel' onPress={onCancel}/>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default GoalInput

const styles = StyleSheet.create({
        inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#311b6b'
      },
      image: {
        width: 100,
        height: 100,
        margin: 20
      },
      textInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        width: '100%',
        padding: 8
      },
      buttonContainer: {
        marginTop: 16,
        flexDirection: 'row'
      },
      button: {
        width: 100,
        marginHorizontal: 8
      }
})