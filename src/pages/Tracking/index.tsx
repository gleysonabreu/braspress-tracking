import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import {
  track,
  orderOwner,
  trackingRealTime,
  ITrackingRealTime,
} from '../../services/BraspressAPI';
import braspressLogo from '../../images/braspress.png';
import { RootStackParamList } from '../../routes';
import styles from './styles';

type TrackingScreenRouteProp = RouteProp<RootStackParamList, 'Tracking'>;

function Tracking() {
  const { docIdentify, numberIdentify, typeDoc } = useRoute<
    TrackingScreenRouteProp
  >().params;
  const [order, setOrder] = useState<Array<string>>([]);
  const [ownerOrder, setOwnerOrder] = useState<Array<string>>([]);
  const [trackRealTime, setTrackgRealTime] = useState<ITrackingRealTime[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { goBack } = useNavigation();

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

  function handleBack() {
    goBack();
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topbar}>
          <RectButton onPress={handleBack} style={styles.arrowBack}>
            <Ionicons name="ios-arrow-back" size={40} color="#d58500" />
          </RectButton>
          <Image style={styles.logo} source={braspressLogo} />
        </View>
      </View>

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
            <Text>{ownerOrder[0]}</Text>
            <Text>{ownerOrder[1]}</Text>
          </View>

          <View style={styles.order}>
            <View style={styles.orderInfo}>
              <View style={styles.itemOrder}>
                <Text style={styles.orderTitle}>Previsão de entrega: </Text>
                <Text style={styles.orderTextInfo}>{order[0]}</Text>
              </View>
            </View>

            <View style={styles.orderInfo}>
              <View style={styles.itemOrder}>
                <Text style={styles.orderTitle}>Nota Fiscal: </Text>
                <Text style={styles.orderTextInfo}>{order[1]}</Text>
              </View>
              <View style={styles.itemOrder}>
                <Text style={styles.orderTitle}>Pedido: </Text>
                <Text style={styles.orderTextInfo}>{order[2]}</Text>
              </View>
              <View style={styles.itemOrder}>
                <Text style={styles.orderTitle}>Nº do Conhecimento: </Text>
                <Text style={styles.orderTextInfo}>{order[3]}</Text>
              </View>
              <View style={styles.itemOrder}>
                <Text style={styles.orderTitle}>Data Emissão: </Text>
                <Text style={styles.orderTextInfo}>{order[4]}</Text>
              </View>
              <View style={styles.itemOrder}>
                <Text style={styles.orderTitle}>Previsão de Entrega: </Text>
                <Text style={styles.orderTextInfo}>{order[0]}</Text>
              </View>
              <View style={styles.itemOrder}>
                <Text style={styles.orderTitle}>Origem: </Text>
                <Text style={styles.orderTextInfo}>{order[6]}</Text>
              </View>
              <View style={styles.itemOrder}>
                <Text style={styles.orderTitle}>Filial de destino: </Text>
                <Text style={styles.orderTextInfo}>{order[7]}</Text>
              </View>
              <View style={styles.itemOrder}>
                <Text style={styles.orderTitle}>Volumes: </Text>
                <Text style={styles.orderTextInfo}>{order[8]}</Text>
              </View>
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
