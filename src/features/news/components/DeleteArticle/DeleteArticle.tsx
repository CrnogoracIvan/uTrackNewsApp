import { Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper/src';
import React from 'react';
import { INewsArticle } from '../../../../types.ts';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { createStyles } from './DeleteArticle.styles.ts';
import { Toast } from 'toastify-react-native';
import { UtModal } from '../../../../components/UtModal/UtModal.tsx';
import { useTheme } from 'react-native-paper';

interface IProps {
  article: INewsArticle;
}

export const DeleteArticle = ({ article }: IProps) => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { handleDeleteArticle } = useNewsContext();
  const theme = useTheme();
  const styles = createStyles(theme);

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

  return (
    <>
      {renderDeleteArticleButton()}
      <UtModal
        visible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        cancelLabel={'NO'}
        onConfirm={handleDelete}
        confirmLabel={'YES'}
        title={'Delete Article'}
        content={
          <Text style={styles.contentText}>
            Are you sure you want to remove the article titled{' '}
            <Text style={styles.contentTextBold}>"{article.title}"?</Text>
          </Text>
        }
      />
    </>
  );
};
