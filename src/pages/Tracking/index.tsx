import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
import styles from './styles';

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
      console.log(ownerResult);
      setOwnerOrder(ownerResult);
      setTrackgRealTime(realTimeResult);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <PageHeader arrowBack />

      {loading ? (
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Loading tracking....</Text>
          <View style={styles.line} />
        </View>
      ) : (
        <ScrollView style={styles.scroll}>
          <View style={styles.content}>
            <Text style={styles.titlePage}>Tracking - Minhas Encomendas</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.infoOwnerOrder}>
            <Text style={styles.infoText}>{ownerOrder[0]}</Text>
            <Text style={styles.infoText}>{ownerOrder[1]}</Text>
          </View>

          <View style={styles.order}>
            <View style={styles.orderInfo}>
              {order.map(item => (
                <View key={item.name} style={styles.itemOrder}>
                  <Text style={styles.orderTitle}>{item.name}: </Text>
                  <Text style={styles.orderTextInfo}>
                    {item.data ? item.data : 'Pendente'}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.tracking}>
            <View style={styles.content}>
              <Text style={styles.titlePage}>Tracking</Text>
              <View style={styles.line} />
            </View>
            {trackRealTime.map(item => (
              <View style={styles.track} key={item.name}>
                <Text style={styles.titleRealTime}>{item.name}</Text>
                <Text style={styles.subTitleRealTime}>
                  {item.date ? item.date : 'Não concluído.'}
                </Text>
                {item.date ? (
                  <Ionicons name="ios-checkmark" color="#48a868" size={40} />
                ) : (
                  <Ionicons name="ios-close" color="#c02d2e" size={40} />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default Tracking;
