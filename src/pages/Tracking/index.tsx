/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import {
  track,
  orderOwner,
  trackingRealTime,
  ITrackingRealTime,
} from '../../services/BraspressAPI';
import { RootStackParamList } from '../../routes';
import PageHeader from '../../components/PageHeader';
import {
  Container,
  Line,
  MessageContainer,
  Scroll,
  TitleMessage,
  OwnerInfo,
  OwnerText,
  Delivaries,
  Delivary,
  DelivaryInfoName,
  DelivaryInfoData,
  DelivaryInfo,
  DelivaryTitle,
  DelivarySubTitle,
  NotFound,
} from './styles';

type TrackingScreenRouteProp = RouteProp<RootStackParamList, 'Tracking'>;

function Tracking() {
  const { docIdentify, numberIdentify, typeDoc } = useRoute<
    TrackingScreenRouteProp
  >().params;
  const [order, setOrder] = useState<
    Array<{
      name: string;
      data: string;
    }>
  >([]);
  const [ownerOrder, setOwnerOrder] = useState<Array<string>>([]);
  const [trackRealTime, setTrackgRealTime] = useState<ITrackingRealTime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    tracking();
  }, []);

  const tracking = async () => {
    try {
      const response = await Axios.get(
        `https://blue.braspress.com/site/w/tracking/search?cnpj=${docIdentify}&documentType=${typeDoc}&numero=${numberIdentify}&isSite=true`,
      );
      const trackResult = track(response.data);
      const ownerResult = orderOwner(response.data);
      const realTimeResult = trackingRealTime(response.data);
      setOrder(trackResult);
      setOwnerOrder(ownerResult);
      setTrackgRealTime(realTimeResult);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <PageHeader arrowBack />
      {loading ? (
        <NotFound>
          <TitleMessage>Loading..</TitleMessage>
          <Line />
        </NotFound>
      ) : (
        <Scroll>
          <MessageContainer>
            <TitleMessage>Tracking - Minhas encomendas</TitleMessage>
            <Line />
          </MessageContainer>

          <OwnerInfo>
            <OwnerText>{ownerOrder[0]}</OwnerText>
            <OwnerText>{ownerOrder[1]}</OwnerText>
          </OwnerInfo>

          <Delivaries>
            <Delivary>
              {order.map(item => (
                <DelivaryInfo>
                  <DelivaryInfoName>{item.name}: </DelivaryInfoName>
                  <DelivaryInfoData>
                    {item.data ? item.data : 'Pendente'}
                  </DelivaryInfoData>
                </DelivaryInfo>
              ))}
            </Delivary>

            <MessageContainer>
              <TitleMessage>Track</TitleMessage>
              <Line />
            </MessageContainer>

            {trackRealTime.map(item => (
              <Delivary>
                <DelivaryTitle>{item.name}</DelivaryTitle>
                <DelivarySubTitle>
                  {item.date ? item.date : 'Não concluído.'}
                </DelivarySubTitle>
                {(item.date && item.date.includes('Aguardando desembarque')) ||
                item.date.includes('Preparando volumes') ? (
                  <Ionicons name="ios-albums" color="#004e9a" size={30} />
                ) : item.date ? (
                  <Ionicons name="ios-checkmark" color="#48a868" size={40} />
                ) : (
                  <Ionicons name="ios-close" color="#c02d2e" size={40} />
                )}
              </Delivary>
            ))}
          </Delivaries>
        </Scroll>
      )}
    </Container>
  );
}

export default Tracking;
