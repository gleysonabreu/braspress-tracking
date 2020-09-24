import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Image } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import braspressLogo from '../../images/braspress.png';
import styles from './styles';

type PageHeaderProps = {
  arrowBack?: boolean;
};

const PageHeader: React.FC<PageHeaderProps> = ({ arrowBack }) => {
  const { goBack } = useNavigation();

  const handleBack = () => {
    goBack();
  };

  return (
    <View style={styles.header}>
      <View style={styles.topbar}>
        {arrowBack && (
          <RectButton onPress={handleBack} style={styles.arrowBack}>
            <Ionicons name="ios-arrow-back" size={40} color="#d58500" />
          </RectButton>
        )}
        <Image style={styles.logo} source={braspressLogo} />
      </View>
    </View>
  );
};

export default PageHeader;
