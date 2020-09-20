import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import braspressLogo from '../../images/braspress.png';
import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { track, orderOwner } from '../../services/BraspressAPI';
import { Ionicons } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';

function Tracking({ route, navigation }){
  const { typeDoc, docIdentify, numberIdentify } = route.params;

  const [order, setOrder] = useState<Array<string>>([]);
  const [ownerOrder, setOwnerOrder] = useState<Array<string>>([]);

  const { navigate, goBack } = useNavigation();

  useEffect(() => {
    tracking();
  }, [])

  const tracking = async () => {
    const response = await Axios.get(`https://blue.braspress.com/site/w/tracking/search?cnpj=${docIdentify}&documentType=${typeDoc}&numero=${numberIdentify}&isSite=true`);
    const trackResult = track(response.data);
    const ownerResult = orderOwner(response.data);
    setOwnerOrder(ownerResult);
    setOrder(trackResult);
  };

  function handleBack(){
    goBack();
  }
  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topbar}>
          <RectButton
          onPress={handleBack}
          style={styles.arrowBack}>
            <Ionicons name="md-arrow-back" size={40} color="#d58500" />
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

      </View>
      ) : 
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Tracking not found</Text>
        <View style={styles.line}/>
        </View>}

    </View>
  );
}

const styles = StyleSheet.create({
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
    borderBottomColor: '#004e9a',
    marginTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
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