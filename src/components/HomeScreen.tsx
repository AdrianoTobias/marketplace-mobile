import { View, Text, StyleSheet } from 'react-native'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>DM Sans Bold</Text>
      <Text style={styles.subtitle}>Poppins Medium</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'DMSans_700Bold',
    fontSize: 24,
  },
  subtitle: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 18,
  },
})
