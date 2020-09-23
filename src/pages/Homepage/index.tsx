import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { getOrders, removeOrder } from '../../services/StorageAPI';
import braspressLogo from '../../images/braspress.png';
import styles from './styles';

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
    const ordersStorage = await getOrders();
    if (ordersStorage) {
      setOrders(ordersStorage);
    } else {
      setOrders([]);
    }
  };

  const handleAddTracking = () => {
    navigate('AddTracking');
  };

  const handleTracking = ({
    docIdentify,
    typeDoc,
    numberIdentify,
  }: IOrders) => {
    navigate('Tracking', { docIdentify, typeDoc, numberIdentify });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topbar}>
          <Image style={styles.logo} source={braspressLogo} />
        </View>
      </View>

      <View style={styles.content}>
        <RectButton onPress={handleAddTracking} style={styles.button}>
          <Text style={styles.buttonText}>Adicionar Encomenda</Text>
        </RectButton>
        <Text style={styles.titlePage}>Suas encomendas</Text>
        <View style={styles.line} />
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.orders}>
          {orders.map(order => (
            <RectButton
              onPress={() => {
                handleTracking(order);
              }}
              style={styles.order}
              key={order.uuid}
            >
              <View style={styles.orderHeader}>
                <Text style={styles.titleOrder}>{order.title}</Text>
                <RectButton onPress={() => removeOrder(order.uuid)}>
                  <Ionicons name="ios-close" size={35} color="#c02d2e" />
                </RectButton>
              </View>
              <Text style={styles.titleCpnj}>
                CPNJ: <Text style={styles.cpnj}>{order.docIdentify}</Text>
              </Text>
              <Text style={styles.titleCpnj}>
                <Text>Número encomenda:</Text>
                <Text style={styles.cpnj}>{order.numberIdentify}</Text>
              </Text>
            </RectButton>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Homepage;
