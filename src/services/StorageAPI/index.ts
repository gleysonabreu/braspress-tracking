import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { IOrders } from '../../pages/Homepage';

const saveOrders = async (order: IOrders) => {

  const storage = await AsyncStorage.getItem('@orders');

  if(storage){
    const ordersStorage: Array<IOrders> = await JSON.parse(storage);
    ordersStorage.push(order);
    await AsyncStorage.setItem('@orders', JSON.stringify(ordersStorage));
  }else{
    await AsyncStorage.setItem('@orders', JSON.stringify([order]));
  }
  
}

const getOrders = async () => {
  const storage = await AsyncStorage.getItem('@orders');
  if(storage){
    const orders: Array<IOrders> = await JSON.parse(storage);
    return orders;
  }
}

const removeOrder = async (uuid: string) => {
  const orders = await getOrders();
  let removedOrders;
  if(orders) removedOrders = orders.filter(item => item.uuid !== uuid);
  await AsyncStorage.setItem("@orders", JSON.stringify(removedOrders));
}

export { saveOrders, getOrders, removeOrder };