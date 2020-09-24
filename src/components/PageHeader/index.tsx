import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Header, TitleHeader, TopBar } from './styles';

type PageHeaderProps = {
  arrowBack?: boolean;
};

const PageHeader: React.FC<PageHeaderProps> = ({ arrowBack, children }) => {
  const { goBack } = useNavigation();

  const handleBack = () => {
    goBack();
  };

  return (
    <Header>
      <TopBar>
        {arrowBack && (
          <RectButton
            onPress={handleBack}
            style={{
              borderRadius: 50,
              width: 50,
              alignItems: 'center',
            }}
          >
            <Ionicons name="ios-arrow-back" size={40} color="#d58500" />
          </RectButton>
        )}
        {children}
        <TitleHeader>Braspress Tracking</TitleHeader>
      </TopBar>
    </Header>
  );
};

export default PageHeader;
