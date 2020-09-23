import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
  orderHeader: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  cpnj: {
    color: "#d58500",
    fontWeight: 'bold',
  },
  titleCpnj: {
    fontSize: 15,
    textAlign: 'center',
  },
  titleOrder: {
    fontSize: 18,
    textAlign: 'center',
    color: '#004e9a',
    fontWeight: 'bold',
    flex: 1,
  },
  order: {
    backgroundColor: "#eeeeee",
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginTop: 20
  },
  orders: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 50
  },
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginTop: 20
  },
  subTitle: {
    color: "#333",
  },
  line: {
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
    alignItems: 'center',
    marginTop: 30,
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

export default styles;