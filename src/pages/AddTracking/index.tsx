import React, { useState } from 'react';
import { Text, View, Image, TextInput, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { saveOrders } from '../../services/StorageAPI';
import { IOrders } from '../Homepage';
import braspressLogo from '../../images/braspress.png';
import styles from './styles';

function AddTracking() {
  const { goBack, navigate } = useNavigation();

  const [typeDoc, setTypeDoc] = useState<string>('');
  const [docIdentify, setDocIndentify] = useState<string>('');
  const [numberIdentify, setNumberIdentify] = useState<string>('');
  const [titleOrder, setTitleOrder] = useState<string>('');

  async function handleSubmit() {
    if (
      typeDoc === '' ||
      docIdentify === '' ||
      numberIdentify === '' ||
      titleOrder === ''
    ) {
      ToastAndroid.show('Preencha todos os campos', ToastAndroid.SHORT);
      return;
    }

    const order: IOrders = {
      docIdentify,
      numberIdentify,
      title: titleOrder,
      typeDoc,
      uuid: String(numberIdentify + docIdentify + typeDoc + titleOrder),
    };

    await saveOrders(order);
    ToastAndroid.show('Encomenda adicionada', ToastAndroid.SHORT);
    navigate('Homepage');
  }

  const handleBack = () => {
    goBack();
  };

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

      <View style={styles.content}>
        <Text style={styles.titlePage}>Adicionar encomenda</Text>
        <View style={styles.line} />
        <Text style={styles.subTitle}>
          Preencha corretamente os campos abaixo:
        </Text>
      </View>

      <View style={styles.form}>
        <TextInput
          value={titleOrder}
          onChangeText={text => {
            setTitleOrder(text);
          }}
          style={styles.input}
          placeholder="Titulo da encomenda"
        />

        <TextInput
          value={docIdentify}
          onChangeText={text => {
            setDocIndentify(String(text));
          }}
          style={styles.input}
          placeholder="CPF/CPNJ"
        />
        <Picker
          selectedValue={typeDoc}
          style={styles.picker}
          onValueChange={(typeSelected, _index) => {
            setTypeDoc(String(typeSelected));
          }}
        >
          <Picker.Item value="" label="---Selecione---" />
          <Picker.Item value="PEDIDO" label="Pedido" />
          <Picker.Item value="CONHECIMENTO" label="Conhecimento" />
          <Picker.Item value="NOTAFISCAL" label="Nota Fiscal" />
        </Picker>
        <TextInput
          value={numberIdentify}
          onChangeText={text => {
            setNumberIdentify(String(text));
          }}
          style={styles.input}
          placeholder="Número"
        />
        <RectButton onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </RectButton>
      </View>
    </View>
  );
}

export default AddTracking;
