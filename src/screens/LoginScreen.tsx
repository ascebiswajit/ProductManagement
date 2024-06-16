import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Dimensions, StyleSheet, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginRequest } from '../redux/actions/loginActions';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const LoginScreen = ({ props }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginStatus = useSelector((state: any) => state.login);
  const loginLoading = useSelector((state: any) => state.login.loading);
  const loginError = useSelector((state: any) => state.login.error);

  useEffect(() => {
    if (loginError) {
      const errorString = String(loginError);
      if (errorString.includes('[auth/user-not-found]')) {
        setMessage('User not found. Please check your email and password.');
      } else if (errorString.includes('[auth/wrong-password]')) {
        setMessage('Incorrect password. Please try again.');
      } else if (errorString.includes('[auth/invalid-email]')) {
        setMessage('invalid email. Please try again.');
      } else if (errorString.includes('[auth/invalid-credential]')) {
        setMessage('The supplied credential is incorrect');
      } else {
        setMessage('something went wrong. Please try again');
      }
    } else {
      setMessage('');
    }
  }, [loginError])

  useEffect(() => {
    if (loginStatus?.isSuccess) {
      setMessage('');
      setEmail('');
      setPassword('');
      navigation.navigate('APP', { screen: 'Products' });
    }
  }, [loginStatus, navigation]);


  const handleLogin = async () => {
    try {
      if (email.length > 0 && password.length > 0) {
        dispatch(loginRequest({ email, password }));
      } else {
        Alert.alert("Please fill all the required fields")
      }
    } catch (err: any) {
      console.log("error occured while login ", err);
    }
  };

  return (
    <View style={styles.cantainer}>
      <Text style={styles.headerTxt}>WELCOME</Text>
      <View style={styles.subView}>
        <Text style={styles.subTxt}>Login</Text>
        <TextInput style={styles.nameInput} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.nameInput} placeholder="Password" value={password} onChangeText={setPassword} />
        {message && (
          <Text style={{ color: 'red', justifyContent: 'center', alignItems: 'center' }}>
            {message}
          </Text>
        )}
        <TouchableOpacity style={styles.btn} onPress={() => handleLogin()}
        >
          <Text style={styles.btnTxt}>Login</Text>
        </TouchableOpacity>
        <View style={styles.endView}>
          <Text style={styles.endTxt}>Create an account?</Text>
          <TouchableOpacity
            style={styles.endBtn}
            onPress={() => {
              navigation.navigate('Auth', { screen: 'SignUp' });
            }}
          >
            <Text style={styles.loginTxt} >SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  cantainer: {
    backgroundColor: '#521be3',
    height: 700,
  },
  subView: {
    backgroundColor: 'white',
    height: 430,
    marginTop: 240,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  headerTxt: {
    fontSize: 40,
    marginLeft: 40,
    fontWeight: 'bold',
    color: 'white',
    position: 'absolute',
    marginTop: 140,
  },
  subTxt: {
    color: 'black',
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 40,
  },
  nameInput: {
    height: 40,
    width: 270,
    marginLeft: 40,
    borderBottomWidth: 1,
    marginTop: 30,
  },
  btn: {
    height: 50,
    width: 200,
    backgroundColor: 'blue',
    borderRadius: 80,
    borderWidth: 2,
    marginLeft: 70,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  endView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  endTxt: {
    fontSize: 15,
    marginTop: 30,
    marginLeft: 60,
    fontWeight: 'bold',
  },
  endBtn: {
    marginRight: 80,
  },
  loginTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
  },
});

export default LoginScreen;