import React, { useState, useCallback } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { getOrders } from '../../services/StorageAPI';

import {
  Container,
  MessageContainer,
  TitleMessage,
  Line,
  Scroll,
  Delivaries,
} from './styles';
import PageHeader from '../../components/PageHeader';
import TrackHome from '../../components/TrackHome';

export interface IOrders {
  title: string;
  docIdentify: string;
  numberIdentify: string;
  typeDoc: string;
  uuid: string;
}

function Homepage() {
  const { navigate } = useNavigation();
  const [delivaries, setDelivaries] = useState<IOrders[]>([]);

  useFocusEffect(
    useCallback(() => {
      getItems();
    }, []),
  );

  const getItems = async (): Promise<void> => {
    const ordersStorage = await getOrders();
    if (ordersStorage) {
      setDelivaries(ordersStorage);
    } else {
      setDelivaries([]);
    }
  };

  const handleAddTracking = () => {
    navigate('AddTracking');
  };

  return (
    <Container>
      <PageHeader>
        <RectButton
          onPress={handleAddTracking}
          style={{
            backgroundColor: '#004e9a',
            borderRadius: 50,
            width: 50,
            alignItems: 'center',
          }}
        >
          <Ionicons name="ios-add" size={40} color="#d58500" />
        </RectButton>
      </PageHeader>
      <MessageContainer>
        <TitleMessage>Suas encomendas.</TitleMessage>
        <Line />
      </MessageContainer>

      <Scroll>
        <Delivaries>
          {delivaries.map(delivary => (
            <TrackHome key={delivary.uuid} infosDelivary={delivary} />
          ))}
        </Delivaries>
      </Scroll>
    </Container>
  );
}

export default Homepage;
