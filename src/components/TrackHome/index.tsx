import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { IOrders } from '../../pages/Homepage';
import { removeOrder } from '../../services/StorageAPI';
import {
  BodyDelivary,
  Delivary,
  HeaderDelivary,
  ItemBodyDelivary,
  TitleDelivary,
  ColorBlack,
} from './styles';

interface IProps {
  infosDelivery: {
    uuid: string;
    docIdentify: string;
    numberIdentify: string;
    title: string;
    typeDoc: string;
  };
}

const TrackHome: React.FC<IProps> = ({ infosDelivery }) => {
  const { navigate } = useNavigation();

  const handleTracking = ({
    docIdentify,
    typeDoc,
    numberIdentify,
  }: IOrders) => {
    navigate('Tracking', { docIdentify, typeDoc, numberIdentify });
  };
  return (
    <Delivary>
      <HeaderDelivary>
        <TitleDelivary>{infosDelivery.title}</TitleDelivary>
        <RectButton
          onPress={() => removeOrder(infosDelivery.uuid)}
          style={{
            backgroundColor: '#004e9a',
            borderRadius: 50,
            width: 50,
            alignItems: 'center',
          }}
        >
          <Ionicons name="ios-close" size={30} color="#d58500" />
        </RectButton>
      </HeaderDelivary>

      <BodyDelivary>
        <ItemBodyDelivary>
          CPNJ:{' '}
          <ColorBlack
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{ width: 100 }}
          >
            {infosDelivery.docIdentify}
          </ColorBlack>
        </ItemBodyDelivary>
        <ItemBodyDelivary>
          Número encomenda:{' '}
          <ColorBlack
            ellipsizeMode="tail"
            numberOfLines={2}
            style={{ width: 100 }}
          >
            {infosDelivery.numberIdentify}
          </ColorBlack>
        </ItemBodyDelivary>

        <RectButton
          onPress={() => handleTracking(infosDelivery)}
          style={{
            backgroundColor: '#004e9a',
            padding: 10,
            borderRadius: 8,
            marginTop: 10,
          }}
        >
          <ItemBodyDelivary style={{ color: '#fff' }}>
            Abrir rastreio
          </ItemBodyDelivary>
        </RectButton>
      </BodyDelivary>
    </Delivary>
  );
};

export default TrackHome;
