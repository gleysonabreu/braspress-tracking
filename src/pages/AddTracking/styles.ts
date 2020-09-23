import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  arrowBack: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    backgroundColor: '#004e9a',
    width: '100%',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 93,
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titlePage: {
    textAlign: 'center',
    fontSize: 20,
    padding: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#004e9a',
  },
  subTitle: {
    color: '#333',
  },
  line: {
    marginBottom: 20,
    width: 90,
    height: 3,
    backgroundColor: '#d58500',
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
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: '#FFF',
  },
  picker: {
    width: 200,
    padding: 10,
  },
});

export default styles;
