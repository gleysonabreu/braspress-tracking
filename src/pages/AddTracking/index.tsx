import React, { useState } from 'react';
import { Text, View, TextInput, ToastAndroid } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { saveOrders } from '../../services/StorageAPI';
import { IOrders } from '../Homepage';
import styles from './styles';
import PageHeader from '../../components/PageHeader';

function AddTracking() {
  const { navigate } = useNavigation();

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

  return (
    <View style={styles.container}>
      <PageHeader arrowBack />

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
