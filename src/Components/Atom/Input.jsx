import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useController } from 'react-hook-form';
import { useTheme } from '../../Theme/ThemeContext';

export const Input = ({
  control,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  rules,
}) => {
  const { colors } = useTheme();
  const { field, fieldState } = useController({ control, name, rules });

  return (
    <View style={styles.container}>
      {label && (
        <Text style={[styles.label, { color: colors.textPrimary }]}>
          {label}
        </Text>
      )}
      <TextInput
        value={field.value}
        onChangeText={field.onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={[
          styles.input,
          {
            backgroundColor: colors.background,
            borderColor: fieldState.error ? 'red' : colors.border,
            color: colors.textPrimary,
          },
        ]}
      />
      {fieldState.error && (
        <Text style={styles.errorText}>{fieldState.error.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
