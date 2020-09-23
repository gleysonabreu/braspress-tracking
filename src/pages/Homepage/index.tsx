import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import braspressLogo from '../../images/braspress.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { saveOrders, getOrders, removeOrder } from '../../services/StorageAPI';
import AsyncStorage from '@react-native-community/async-storage';
import { Ionicons } from '@expo/vector-icons';

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
    }else{
      setOrders([]);
    }
  }

  const handleAddTracking = () => {
    navigate('AddTracking');
  }

  const handleTracking = ({ docIdentify, typeDoc, numberIdentify }: IOrders) => {
    navigate('Tracking', { docIdentify, typeDoc, numberIdentify });
  }


  return (
    
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
        <ScrollView style={styles.scroll}>
        <View style={styles.orders}>
        {
          orders.map((order) => (
            <RectButton
            onPress={() => { handleTracking(order) }}
            style={styles.order} key={order.uuid}>
              <View style={styles.orderHeader}>
                <Text style={styles.titleOrder}>{order.title}</Text>
                <RectButton
                onPress={() => removeOrder(order.uuid)}
                >
                  <Ionicons name="ios-close" size={35} color="#c02d2e" />
                </RectButton>
              </View>
              <Text style={styles.titleCpnj}>CPNJ: <Text style={styles.cpnj}>{order.docIdentify}</Text></Text>
              <Text style={styles.titleCpnj}>Número encomenda: <Text style={styles.cpnj}>{order.numberIdentify}</Text></Text>
            </RectButton>
          ))
        }
        </View>
        </ScrollView>
    </View>
    
  );
}

const styles = StyleSheet.create({
  orderHeader: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
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
    flex: 1,
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
    marginBottom: 50
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
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