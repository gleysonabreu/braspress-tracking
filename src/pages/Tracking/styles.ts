import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding-top: ${Constants.statusBarHeight}px;
`;

export const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const TitleMessage = styled.Text`
  font-size: 25px;
  color: #004e9a;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Line = styled.View`
  width: 100px;
  height: 3px;
  background: #d58500;
`;

export const Scroll = styled.ScrollView`
  flex: 1;
`;

export const OwnerInfo = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  margin-top: 50px;
  margin-bottom: 20px;
`;

export const OwnerText = styled.Text`
  width: 80%;
  text-align: center;
  font-size: 18px;
`;

export const Delivaries = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;

export const Delivary = styled.View`
  background: #eeeeee;
  width: 80%;
  padding: 10px;
  border-radius: 16px;
  margin-top: 10px;
  align-items: center;
  justify-content: center;
`;

export const DelivaryInfo = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DelivaryInfoName = styled.Text`
  font-size: 15px;
  text-align: center;
`;

export const DelivaryInfoData = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #d58500;
  text-align: center;
`;

export const DelivaryTitle = styled.Text`
  font-size: 17px;
  font-weight: bold;
  text-align: center;
`;

export const DelivarySubTitle = styled.Text`
  font-size: 15px;
  color: #d58500;
  text-align: center;
  font-weight: bold;
`;

export const NotFound = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
