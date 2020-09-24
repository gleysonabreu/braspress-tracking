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

export const NewTrack = styled.View`
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 50px;
  flex: 1;
`;

export const FormTrack = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const InputForm = styled.TextInput`
  width: 250px;
  height: 60px;
  padding: 20px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #ccc;
  margin-bottom: 20px;
`;

export const TitleButton = styled.Text`
  font-size: 18px;
  color: #fff;
`;
