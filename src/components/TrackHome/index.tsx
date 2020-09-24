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
  infosDelivary: {
    uuid: string;
    docIdentify: string;
    numberIdentify: string;
    title: string;
    typeDoc: string;
  };
}

const TrackHome: React.FC<IProps> = ({ infosDelivary }) => {
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
        <TitleDelivary>{infosDelivary.title}</TitleDelivary>
        <RectButton
          onPress={() => removeOrder(infosDelivary.uuid)}
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
          CPNJ: <ColorBlack>{infosDelivary.docIdentify}</ColorBlack>
        </ItemBodyDelivary>
        <ItemBodyDelivary>
          Número encomenda:{' '}
          <ColorBlack>{infosDelivary.numberIdentify}</ColorBlack>
        </ItemBodyDelivary>

        <RectButton
          onPress={() => handleTracking(infosDelivary)}
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
