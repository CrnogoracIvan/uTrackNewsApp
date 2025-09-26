import { Button, Modal, Portal } from 'react-native-paper';
import { Text, View } from 'react-native';
import React from 'react';
import { createStyles } from './UiModal.styles.ts';

interface IProps {
  visible: boolean;
  onDismiss: () => void;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
  cancelLabel: string;
  confirmLabel: string;
}

export const UtModal = ({
  visible,
  onDismiss,
  title,
  content,
  onCancel,
  onConfirm,
  confirmLabel,
  cancelLabel,
}: IProps) => {
  const styles = createStyles();
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.contentText}>{content}</Text>
        <View style={styles.buttonContainer}>
          <Button
            mode={'contained'}
            textColor={'white'}
            onPress={onConfirm}
            testID="confirm-button"
          >
            {confirmLabel}
          </Button>
          <Button mode={'outlined'} onPress={onCancel} testID="cancel-button">
            {cancelLabel}
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};
