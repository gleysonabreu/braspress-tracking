import React, { useState } from 'react';
import { ToastAndroid } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { saveOrders } from '../../services/StorageAPI';
import { IOrders } from '../Homepage';
import {
  Container,
  Line,
  MessageContainer,
  TitleMessage,
  NewTrack,
  FormTrack,
  InputForm,
  TitleButton,
} from './styles';
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
    <Container>
      <PageHeader arrowBack />
      <MessageContainer>
        <TitleMessage>Adicionar encomenda.</TitleMessage>
        <Line />
      </MessageContainer>

      <NewTrack>
        <FormTrack>
          <InputForm
            value={titleOrder}
            onChangeText={(text: string) => {
              setTitleOrder(text);
            }}
            placeholder="Titulo da encomenda"
          />
          <InputForm
            value={docIdentify}
            onChangeText={(text: string) => {
              setDocIndentify(text);
            }}
            placeholder="CPF/CPNJ"
          />
          <Picker
            style={{ width: 200 }}
            selectedValue={typeDoc}
            onValueChange={(typeSelected, _index) => {
              setTypeDoc(String(typeSelected));
            }}
          >
            <Picker.Item value="" label="---Selecione---" />
            <Picker.Item value="PEDIDO" label="Pedido" />
            <Picker.Item value="CONHECIMENTO" label="Conhecimento" />
            <Picker.Item value="NOTAFISCAL" label="Nota Fiscal" />
          </Picker>
          <InputForm
            value={numberIdentify}
            onChangeText={(text: string) => {
              setNumberIdentify(text);
            }}
            placeholder="Número"
          />
          <RectButton
            onPress={handleSubmit}
            style={{
              backgroundColor: '#d58500',
              width: 250,
              padding: 13,
              borderRadius: 8,
              marginTop: 10,
              alignItems: 'center',
            }}
          >
            <TitleButton>Adicionar</TitleButton>
          </RectButton>
        </FormTrack>
      </NewTrack>
    </Container>
  );
}

export default AddTracking;
