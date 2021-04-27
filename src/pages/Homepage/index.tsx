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
  Deliveries,
} from './styles';
import { NotFound } from '../Tracking/styles';
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
  const [deliveries, setDeliveries] = useState<IOrders[]>([]);

  useFocusEffect(
    useCallback(() => {
      getItems();
    }, [deliveries]),
  );

  const getItems = async (): Promise<void> => {
    const ordersStorage = await getOrders();
    if (ordersStorage) {
      setDeliveries(ordersStorage);
    } else {
      setDeliveries([]);
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

      {deliveries.length === 0 ? (
        <NotFound>
          <TitleMessage>NO TRACKING FOUND</TitleMessage>
          <Line />
        </NotFound>
      ) : (
        <Scroll>
          <Deliveries>
            {deliveries.map(delivery => (
              <TrackHome key={delivery.uuid} infosDelivery={delivery} />
            ))}
          </Deliveries>
        </Scroll>
      )}
    </Container>
  );
}

export default Homepage;
