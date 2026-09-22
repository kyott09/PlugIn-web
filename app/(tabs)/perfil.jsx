import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Mi Perfil
      </Text>

      <Text style={styles.text}>
        Perfil de usuario
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