import { Pressable } from 'react-native';
import { Icon } from 'react-native-paper/src';
import React from 'react';
import { INewsArticle } from '../../../../types.ts';
import { useNewsContext } from '../../context/NewsContextProvider.tsx';
import { createStyles } from './DeleteArticle.styles.ts';

interface IProps {
  article: INewsArticle;
}

export const DeleteArticle = ({ article }: IProps) => {
  const { handleDeleteArticle } = useNewsContext();
  const styles = createStyles();

  const renderDeleteArticleButton = () => (
    <Pressable
      onPress={() => handleDeleteArticle(article.uuid)}
      style={styles.trigger}
    >
      <Icon source={'trash-can-outline'} size={24} color={'white'} />
    </Pressable>
  );
  return renderDeleteArticleButton();
};
