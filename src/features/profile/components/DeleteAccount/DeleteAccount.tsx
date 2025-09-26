import React from 'react';
import { UtModal } from '../../../../components/UtModal/UtModal.tsx';
import { Button, useTheme } from 'react-native-paper';
import { createStyles } from './DeleteAccount.styles.ts';

interface IProps {
  onConfirm: () => void;
}

export const DeleteAccount = ({ onConfirm }: IProps) => {
  const theme = useTheme();
  const styles = createStyles();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const handleDelete = () => {
    onConfirm();
    setIsModalVisible(false);
  };

  const renderTrigger = () => (
    <Button
      mode={'outlined'}
      textColor={theme.colors.primary}
      onPress={() => setIsModalVisible(true)}
      style={styles.button}
    >
      LOGOUT AND DELETE ACCOUNT
    </Button>
  );

  return (
    <>
      {renderTrigger()}
      <UtModal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        cancelLabel={'NO'}
        onConfirm={handleDelete}
        confirmLabel={'YES'}
        title={'Delete Account'}
        content={'Are you sure you want to delete account?'}
      />
    </>
  );
};
