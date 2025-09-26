import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { IUser } from '../../../../types.ts';
import { getUserFromStorage } from '../../../../utils.ts';
import { RegularLayout } from '../../../../components/RegularLayout/RegularLayout.tsx';
import { useTheme } from 'react-native-paper';

export const ProfileScreen = () => {
  const theme = useTheme();
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    const getUserData = async () => {
      const data = await getUserFromStorage();
      console.log('data: ', data);
      if (data) {
        setUserData(data);
      }
    };
    getUserData();
  }, []);

  const renderRow = (label: string, info: string) => (
    <View style={{ flexDirection: 'row', marginVertical: 8 }}>
      <Text style={{ minWidth: 80, fontSize: 20 }}>{label}:</Text>
      <Text
        style={{
          minWidth: 80,
          fontSize: 20,
          color: theme.colors.primary,
          fontWeight: 'bold',
        }}
      >
        {info}
      </Text>
    </View>
  );

  return (
    <RegularLayout>
      {userData && (
        <View>
          {renderRow('Name', userData.name)}
          {renderRow('Email', userData.email)}
        </View>
      )}
    </RegularLayout>
  );
};
