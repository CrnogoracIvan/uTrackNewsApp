import { Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-paper/src';
import React from 'react';
import { INewsArticle } from '../../../../types.ts';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { createStyles } from './DeleteArticle.styles.ts';
import { Button, Modal, Portal } from 'react-native-paper';
import { Toast } from 'toastify-react-native';

interface IProps {
  article: INewsArticle;
}

export const DeleteArticle = ({ article }: IProps) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { handleDeleteArticle } = useNewsContext();
  const styles = createStyles();

  const handleDelete = () => {
    handleDeleteArticle(article.uuid);
    setIsModalVisible(false);
    Toast.success('Article has been removed.');
  };

  const renderDeleteArticleButton = () => (
    <TouchableOpacity
      onPress={() => setIsModalVisible(true)}
      style={styles.trigger}
      testID="delete-article-button"
    >
      <Icon source={'trash-can-outline'} size={24} color={'white'} />
    </TouchableOpacity>
  );

  const renderModal = () => (
    <Portal>
      <Modal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        contentContainerStyle={styles.modalContainer}
      >
        <Text style={styles.titleText}>Delete Article</Text>
        <Text style={styles.contentText}>
          Are you sure you want to remove the article titled{' '}
          <Text style={styles.contentTextBold}>"{article.title}"</Text>?
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            mode={'contained'}
            textColor={'white'}
            onPress={handleDelete}
            testID="yes-button"
          >
            YES
          </Button>
          <Button
            mode={'outlined'}
            onPress={() => setIsModalVisible(false)}
            testID="no-button"
          >
            NO
          </Button>
        </View>
      </Modal>
    </Portal>
  );

  return (
    <>
      {renderDeleteArticleButton()}
      {renderModal()}
    </>
  );
};
