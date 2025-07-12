import { StyleSheet, View } from 'react-native';
import LoginScreen from './src/Screen/Authentication/Login';
import { ThemeProvider } from './src/Theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2%',
  },
});
