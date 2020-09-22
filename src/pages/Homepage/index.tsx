import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import braspressLogo from '../../images/braspress.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { saveOrders, getOrders } from '../../services/StorageAPI';
import AsyncStorage from '@react-native-community/async-storage';

export interface IOrders {
  title: string;
  docIdentify: string;
  numberIdentify: string;
  typeDoc: string;
  uuid: string;
}

function Homepage() {

  const { navigate } = useNavigation();
  const [orders, setOrders] = useState<IOrders[]>([]);

  useEffect(() => {
    getItems();
  });

  const getItems = async (): Promise<void> => {
    const orders = await getOrders();
    if(orders){
      setOrders(orders);
    }
  }

  const handleAddTracking = () => {
    navigate('AddTracking');
  }

  const handleTracking = ({ docIdentify, typeDoc, numberIdentify }: IOrders) => {
    navigate('Tracking', { docIdentify, typeDoc, numberIdentify });
  }


  return (
    <ScrollView style={styles.scroll}>
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topbar}>
          <Image style={styles.logo} source={braspressLogo} />
        </View>
      </View>

     
        <View style={styles.content}>
          <RectButton
          onPress={handleAddTracking}
          style={styles.button}>
            <Text style={styles.buttonText}>Adicionar Encomenda</Text>
          </RectButton>
          <Text style={styles.titlePage}>Suas encomendas</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.orders}>
        {
          orders.map((order) => (
            <RectButton
            onPress={() => { handleTracking(order) }}
            style={styles.order} key={order.uuid}>
              <Text style={styles.titleOrder}>{order.title}</Text>
              <Text style={styles.titleCpnj}>CPNJ: <Text style={styles.cpnj}>{order.docIdentify}</Text></Text>
              <Text style={styles.titleCpnj}>Número encomenda: <Text style={styles.cpnj}>{order.numberIdentify}</Text></Text>
            </RectButton>
          ))
        }
        </View>
      
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cpnj: {
    color: "#d58500",
    fontWeight: 'bold',
  },
  titleCpnj: {
    fontSize: 15,
    textAlign: 'center',
  },
  titleOrder: {
    fontSize: 18,
    textAlign: 'center',
    color: '#004e9a',
    fontWeight: 'bold',
  },
  order: {
    backgroundColor: "#eeeeee",
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginTop: 20
  },
  orders: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
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
  topbar: {
    flexDirection: 'row',
    justifyContent: 'center',
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
    marginTop: 20
  },
  subTitle: {
    color: "#333",
  },
  line: {
    width: 90,
    height: 3,
    backgroundColor: "#d58500",
  },
  form: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 200,
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#D58500',
    width: 200,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 17,
    color: "#FFF"
  },
  picker: {
    width: 200,
    padding: 10,
  }
});

export default Homepage;