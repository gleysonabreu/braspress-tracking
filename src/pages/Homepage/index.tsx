import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Constants from 'expo-constants';
import braspressLogo from '../../images/braspress.png';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';

function Homepage() {

  const { navigate } = useNavigation();

  const [typeDoc, setTypeDoc] = useState<string>('');
  const [docIdentify, setDocIndentify] = useState<string>('');
  const [numberIdentify, setNumberIdentify] = useState<string>('');

  function handleSubmit(){

    if(typeDoc === '' || numberIdentify === '' || docIdentify === ''){
      ToastAndroid.show("Preencha todos os campos", ToastAndroid.SHORT);
    }else{
      navigate('Tracking', { typeDoc, docIdentify, numberIdentify });
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topbar}>
          <Image style={styles.logo} source={braspressLogo} />
        </View>
      </View>

     
        <View style={styles.content}>
          <Text style={styles.titlePage}>Rastreie sua encomenda</Text>
          <View style={styles.line} />
          <Text style={styles.subTitle}>Preencha corretamente os campos abaixo:</Text>
        </View>


        <View style={styles.form}>
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
            <Text style={styles.buttonText}>Buscar</Text>
          </RectButton>
        </View>

      
    </View>
  );
}

const styles = StyleSheet.create({
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

export default Homepage;