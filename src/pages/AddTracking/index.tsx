import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import braspressLogo from '../../images/braspress.png';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { saveOrders } from '../../services/StorageAPI';
import { Ionicons } from '@expo/vector-icons';
import { IOrders } from '../Homepage';
import * as Random from 'expo-random';

function AddTracking() {

  const { goBack, navigate } = useNavigation();

  const [typeDoc, setTypeDoc] = useState<string>('');
  const [docIdentify, setDocIndentify] = useState<string>('');
  const [numberIdentify, setNumberIdentify] = useState<string>('');
  const [titleOrder, setTitleOrder] = useState<string>('');

  async function handleSubmit(){

    if(typeDoc === '' || docIdentify === '' || numberIdentify === '' || titleOrder === ''){
      ToastAndroid.show("Preencha todos os campos", ToastAndroid.SHORT);
      return;
    }

    const order: IOrders = {
      docIdentify,
      numberIdentify,
      title: titleOrder,
      typeDoc,
      uuid: String(numberIdentify+docIdentify+typeDoc+titleOrder),
    }

    await saveOrders(order);
    ToastAndroid.show("Encomenda adicionada", ToastAndroid.SHORT);
    navigate("Homepage");  
  }

  const handleBack = () => {
    goBack();
  }

  return (
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

     
        <View style={styles.content}>
          <Text style={styles.titlePage}>Adicionar encomenda</Text>
          <View style={styles.line} />
          <Text style={styles.subTitle}>Preencha corretamente os campos abaixo:</Text>
        </View>


        <View style={styles.form}>

          <TextInput
          value={titleOrder}
          onChangeText={(text) => {setTitleOrder(text)}}
          style={styles.input}
          placeholder="Titulo da encomenda"
          />
          
          <TextInput
          value={docIdentify}
          onChangeText={(text) => { setDocIndentify(String(text)) }} 
          style={styles.input} placeholder="CPF/CPNJ" />
          <Picker
          selectedValue={typeDoc}
          style={styles.picker}
          onValueChange={(typeSelected, index) => {
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
          onChangeText={(text) => { setNumberIdentify(String(text)) }}
          style={styles.input} placeholder="Número" />
          <RectButton
          onPress={handleSubmit}
          style={styles.button}>
            <Text style={styles.buttonText}>Adicionar</Text>
          </RectButton>
        </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
  arrowBack: {
    alignItems: 'flex-start',
    marginLeft: 20
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
    alignItems: 'center'
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

export default AddTracking;