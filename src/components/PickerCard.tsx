import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { responsiveHeight, responsiveWidth } from '../responsive_dimensions';
import { Colors } from '../assets/colors';

interface PickerProps {
  mrgnTop?: number;
  placeHolder?: string;
  width?: any
}

const PickerCard: React.FC<PickerProps> = ({ mrgnTop, placeHolder, width = responsiveWidth(91) }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    { label: 'Service 1', value: 'service1' },
    { label: 'Service 2', value: 'service2' },
    { label: 'Service 3', value: 'service3' },
  ]);

  return (
    <View style={[styles.container, { marginTop: mrgnTop, width }]}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeHolder ? placeHolder : 'Select Service'}
        placeholderStyle={{ color: '#000' }}
        style={styles.dropdown}
        dropDownContainerStyle={[styles.dropdownContainer, { zIndex: open ? 2000 : 1 }]} // Adjusting zIndex based on open state
        textStyle={styles.textStyle}
        zIndex={1000}
      />
      {/* {value && <Text style={styles.selectedText}>Selected: {value}</Text>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 3,
  },
  label: {
    fontSize: 18, // Customize size as needed
    color: '#000', // Label color
    marginBottom: 8, // Space between label and dropdown
  },
  dropdown: {
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderRadius: 8,
    color: Colors.black,
    height: responsiveHeight(7.5),
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    position: 'absolute', // Ensure the dropdown is positioned above other elements
    top: responsiveHeight(7.5), // Adjust top positioning if needed
  },
  textStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
});

export default PickerCard;
