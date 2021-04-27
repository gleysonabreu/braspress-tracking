/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import Axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import {
  track,
  trackError,
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
  Deliveries,
  Delivery,
  DeliveryInfoName,
  DeliveryInfoData,
  DeliveryInfo,
  DeliveryTitle,
  DeliverySubTitle,
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
  const [trackRealTime, setTrackRealTime] = useState<ITrackingRealTime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorTrack, setErrorTrack] = useState<boolean>(false);

  useEffect(() => {
    tracking();
  }, []);

  const tracking = async () => {
    try {
      const response = await Axios.get(
        `https://blue.braspress.com/site/w/tracking/search?cnpj=${docIdentify}&documentType=${typeDoc}&numero=${numberIdentify}&isSite=true`,
      );
      const trackResult = track(response.data);
      const realTimeResult = trackingRealTime(response.data);

      setOrder(trackResult);
      setTrackRealTime(realTimeResult);

      const error = trackError(response.data);

      if (error) {
        setLoading(true);
        setErrorTrack(true);
      } else {
        setLoading(false);
        setErrorTrack(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <PageHeader arrowBack />
      {loading ? (
        <NotFound>
          <TitleMessage>
            {errorTrack ? 'TRACK NOT FOUND' : 'LOADING'}
          </TitleMessage>
          <Line />
        </NotFound>
      ) : (
        <Scroll>
          <MessageContainer>
            <TitleMessage>Tracking - Minhas encomendas</TitleMessage>
            <Line />
          </MessageContainer>

          <Deliveries>
            <Delivery>
              {order.map(item => (
                <DeliveryInfo key={`${item.name}${item.data}`}>
                  <DeliveryInfoName>{item.name}: </DeliveryInfoName>
                  <DeliveryInfoData
                    ellipsizeMode="tail"
                    numberOfLines={2}
                    style={{ width: 100 }}
                  >
                    {item.data ? item.data.trim() : 'Pendente'}
                  </DeliveryInfoData>
                </DeliveryInfo>
              ))}
            </Delivery>

            <MessageContainer>
              <TitleMessage>Track</TitleMessage>
              <Line />
            </MessageContainer>

            {trackRealTime.map(item => (
              <Delivery key={item.name}>
                <DeliveryTitle>{item.name}</DeliveryTitle>
                <DeliverySubTitle>
                  {item.date ? item.date : 'Não concluído.'}
                </DeliverySubTitle>
                {(item.date && item.date.includes('Aguardando desembarque')) ||
                item.date.includes('Preparando volumes') ? (
                  <Ionicons name="ios-albums" color="#004e9a" size={30} />
                ) : item.date ? (
                  <Ionicons name="ios-checkmark" color="#48a868" size={40} />
                ) : (
                  <Ionicons name="ios-close" color="#c02d2e" size={40} />
                )}
              </Delivery>
            ))}
          </Deliveries>
        </Scroll>
      )}
    </Container>
  );
}

export default Tracking;
