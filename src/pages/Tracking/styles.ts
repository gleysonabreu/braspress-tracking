import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  subTitleRealTime: {
    fontWeight: 'bold',
    color: '#d58500',
    textAlign: 'center',
  },
  titleRealTime: {
    fontSize: 16,
    fontWeight: '300',
  },
  track: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#d58500',
    marginTop: 20,
  },
  tracking: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  notFoundText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#004e9a',
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoOwnerOrder: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  infoText: {
    textAlign: 'center',
    width: '80%',
  },
  orderTitle: {
    fontSize: 15,
  },
  itemOrder: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  orderTextInfo: {
    fontSize: 18,
    color: '#d58500',
    fontWeight: 'bold',
  },
  order: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderInfo: {
    backgroundColor: '#e8e8e8',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#d58500',
    marginTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Constants.statusBarHeight,
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
});

export default styles;
