import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import braspressLogo from '../../images/braspress.png';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { track, orderOwner, trackingRealTime, ITrackingRealTime } from '../../services/BraspressAPI';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

function Tracking({ route, navigation }){
  const { typeDoc, docIdentify, numberIdentify } = route.params;

  const [order, setOrder] = useState<Array<string>>([]);
  const [ownerOrder, setOwnerOrder] = useState<Array<string>>([]);
  const [trackRealTime, setTrackgRealTime] = useState<ITrackingRealTime[]>([]);

  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    tracking();
  }, [])

  const tracking = async () => {
    try {
      const response = await Axios.get(`https://blue.braspress.com/site/w/tracking/search?cnpj=${docIdentify}&documentType=${typeDoc}&numero=${numberIdentify}&isSite=true`);
      const trackResult = track(response.data);
      const ownerResult = orderOwner(response.data);
      const realTimeResult = trackingRealTime(response.data);
      setOrder(trackResult);
      setOwnerOrder(ownerResult);
      setTrackgRealTime(realTimeResult);
    } catch (error) {
      console.log(error);
    }
  };

  function handleBack(){
    goBack();
  }
  return(
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topbar}>
          <RectButton
          onPress={handleBack}
          style={styles.arrowBack}>
            <Ionicons name="ios-arrow-back" size={40} color="#d58500" />
          </RectButton>
          <Image style={styles.logo} source={braspressLogo} />
        </View>
      </View>
      
      {order.length > 0 ? (
        <View>
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
        {
          trackRealTime.map((item) => (
            <View style={styles.track} key={item.name}>
              <Text style={styles.titleRealTime}>{item.name}</Text>
              <Text style={styles.subTitleRealTime}>{item.date ? item.date : 'Não concluído.'}</Text>
              {
                item.date ? <Ionicons name="ios-checkmark" color="#48a868" size={40} /> : <Ionicons name="ios-close" color="#c02d2e" size={40} />
              }
            </View>
          ))
        }
        </View>
      </View>
      ) : 
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Tracking not found</Text>
        <View style={styles.line}/>
      </View>
      }

    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subTitleRealTime: {
    fontWeight: 'bold',
    color: '#d58500',
  },
  titleRealTime: {
    fontSize: 16,
    fontWeight: '300',
  },
  track: {
    backgroundColor: "#e8e8e8",
    padding: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#d58500',
    marginTop: 20
  },
  tracking: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notFoundText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: "#004e9a",
    textTransform: 'uppercase',
    marginBottom: 20
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoOwnerOrder: {
    alignItems: "center",
    justifyContent: 'center'
  },
  orderTitle: {
    fontSize: 15,
  },
  itemOrder: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  orderTextInfo: {
    fontSize: 18,
    color: '#d58500',
    fontWeight: 'bold',
  },
  order: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  orderInfo: {
    backgroundColor: "#e8e8e8",
    padding: 10,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#d58500',
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
    marginBottom: 50
  },
  header: {
    backgroundColor: "#004e9a",
    width: "100%", 
  },
  arrowBack: {
    alignItems: 'flex-start',
    marginLeft: 20
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 93,
  },
  logo: {
    resizeMode: 'contain',
    height: "100%",
  },
  content: {
    alignItems: "center",
    justifyContent: 'center'
  },
  titlePage: {
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: "#004e9a",
  },
  subTitle: {
    color: "#333",
  },
  line: {
    marginBottom: 20,
    width: 90,
    height: 3,
    backgroundColor: "#d58500",
  },
});

export default Tracking;