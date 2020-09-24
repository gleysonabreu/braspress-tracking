import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const Tiles: React.FC = ({ children }) => {
  return (
    <View style={styles.order}>
      <View style={styles.orderInfo}>{children}</View>
    </View>
  );
};

export default Tiles;
