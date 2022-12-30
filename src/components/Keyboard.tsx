import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { GREEN, WHITE } from '~/services/colors';

const KEYBOARD = [1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0, 'delete'];

type KeyboardProps = {
  sum: number;
  setSum: React.Dispatch<number>;
};

function Keyboard({ sum, setSum }: KeyboardProps): JSX.Element {
  const handleClick = (key: string | number) => {
    if (typeof key === 'number') {
      setSum(Number(String(sum) + String(key)));
    }

    if (key === 'delete') {
      setSum(Number(String(sum).substring(-1, 1)));
    }

    if (key === '.') {
      setSum(Number(String(sum) + key));
    }
  };

  return (
    <View style={styles.container}>
      {KEYBOARD.map((key, index) => (
        <TouchableOpacity
          style={styles.button}
          key={index}
          onPress={() => handleClick(key)}>
          <Text style={styles.text}>{key}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Keyboard;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginHorizontal: 80,
  },
  button: {
    backgroundColor: GREEN,
    height: 60,
    width: 50,
    borderRadius: 50,
    flexBasis: '27%',
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: WHITE,
    fontSize: 20,
  },
});
