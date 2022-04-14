import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function DatePickerCustom({
  handleConfirm = () => {},
  hideDatePicker = () => {},
  isDatePickerVisible,
  dateShow = '',
  showDatePicker = () => {},
  styles = {},
}) {
  return (
    <View>
      <View style={styles.view}>
        <Text style={styles.label}>Birthday</Text>
        <TouchableOpacity style={styles.date} onPress={showDatePicker}>
          <Text style={styles.textDate}>{dateShow}</Text>
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
