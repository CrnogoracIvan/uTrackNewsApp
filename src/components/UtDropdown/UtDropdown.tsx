import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { MultiSelectDropdown } from 'react-native-paper-dropdown';
import { useTheme } from 'react-native-paper';
import { INewsCategory } from '../../types.ts';

interface IProps {
  value?: string[];
  onSelect?: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  options: INewsCategory[];
  error?: boolean;
}

export const UtDropdown = ({
  value = [],
  onSelect,
  label = 'Categories',
  placeholder = 'Select Categories',
  options,
  error = false,
}: IProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(value);
  const theme = useTheme();

  const handleSelect = (values: string[]) => {
    setSelectedValues(values);
    if (onSelect) {
      onSelect(values);
    }
  };

  return (
    <MultiSelectDropdown
      label={label}
      placeholder={placeholder}
      options={options}
      value={selectedValues}
      onSelect={handleSelect}
      mode="outlined"
      error={error}
      // @ts-ignore
      inputProps={{
        style: styles.input,
        outlineColor: error ? theme.colors.error : theme.colors.outline,
        activeOutlineColor: theme.colors.primary,
      }}
      listProps={{
        style: styles.list,
      }}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 8,
  },
  list: {
    backgroundColor: 'white',
  },
});
