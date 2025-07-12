import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../Utils/ValidationSchema.js';
import { useTheme } from '../../Theme/ThemeContext.jsx';
import { Input } from '../../Components/Atom/Input.jsx';
import { Button } from '../../Components/Atom/Button.jsx';
import { Toast } from '../../Components/Atom/Toast.jsx';

export default function LoginScreen() {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [toastVisible, setToastVisible] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = data => {
    console.log('Login data:', data);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Toggle Theme Button - Untuk Testing */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={[
          styles.themeToggle,
          { backgroundColor: colors.primary, borderColor: colors.border },
        ]}
      >
        <Text style={{ color: 'white' }}>
          {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
        </Text>
      </TouchableOpacity>

      {/* Login Form */}
      <Text style={[styles.title, { color: colors.textPrimary }]}>
        Welcome Back
      </Text>

      <Input
        control={control}
        name="email"
        label="Email"
        placeholder="user@example.com"
        keyboardType="email-address"
      />

      <Input
        control={control}
        name="password"
        label="Password"
        placeholder="••••••••"
        secureTextEntry
      />

      <Button
        label="Login"
        onPress={handleSubmit(onSubmit)}
        variant="primary"
        style={{ marginTop: 20 }}
      />

      {/* Debug Info */}
      <View style={styles.debugInfo}>
        <Text style={{ color: colors.textSecondary }}>
          Current Theme: {isDarkMode ? 'Dark' : 'Light'}
        </Text>
        <Text style={{ color: colors.textSecondary }}>
          Primary Color: {colors.primary}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  themeToggle: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  debugInfo: {
    marginTop: 30,
    alignItems: 'center',
  },
});
