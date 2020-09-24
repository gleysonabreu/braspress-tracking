import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#004e9a',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 93,
  },
  arrowBack: {
    alignItems: 'flex-start',
    marginLeft: 20,
  },
  logo: {
    resizeMode: 'contain',
    height: '100%',
    flex: 1,
  },
});

export default styles;
