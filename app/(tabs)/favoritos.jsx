import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Favoritos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Favoritos
      </Text>

      <Text style={styles.text}>
        Todavía no tenés productos favoritos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FBFF',
    padding: 20,
  },

  title: {
    color: '#102A43',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 10,
  },

  text: {
    color: '#52667A',
    fontSize: 16,
  },
});