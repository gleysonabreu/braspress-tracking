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

export const Delivaries = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
`;
