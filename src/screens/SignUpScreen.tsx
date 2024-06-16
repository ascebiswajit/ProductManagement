import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Dimensions,Platform, StyleSheet, TouchableOpacity, StatusBar, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { signUpRequest } from '../redux/actions/signupActions';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const signUpStatus = useSelector((state: any) => state.signup);
  const signUpLoading = useSelector((state: any) => state.signup.loading);
  const signUpError = useSelector((state: any) => state.signup.error);

  useEffect(() => {
    if (signUpError) {
      const errorString = String(signUpError);
      if (errorString.includes('[auth/email-already-in-use]')) {
        setMessage('The email address is already in use by another account.');
      } else if (errorString.includes('[auth/weak-password]')) {
        setMessage('Password should be at least 6 characters');
      } else if (errorString.includes('[auth/invalid-email]')) {
        setMessage('invalid email. Please try again.');
      } else {
        setMessage('something went wrong. Please try again');
      }
    } else {
      setMessage('');
    }
  }, [signUpError])

  const handleSignUp = async () => {
    try {
      if (email.length > 0 && password.length > 0 && username.length > 0) {
        dispatch(signUpRequest({ email, password, username }));
        if (signUpStatus?.isSuccess) {
          setMessage('');
          navigation.navigate('Auth', { screen: 'Login' });
        }
      } else {
        Alert.alert("Please fill all the required fields")
      }
    } catch (err: any) {
      console.log("error occured while signup ", err);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.headerTxt}>WELCOME</Text>
          <View style={styles.subView}>
            <Text style={styles.subTxt}>Signup</Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Username"
              value={username}
              onChangeText={setUserName}
            />
            <TextInput
              style={styles.nameInput}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.nameInput}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
                    {message && (
          <Text style={{ color: 'red', justifyContent: 'center', alignItems: 'center' }}>{message}</Text>
        )}

<TouchableOpacity
          style={styles.btn}
          onPress={() => handleSignUp()}>
          {signUpLoading ? (
            <View style={{ flexDirection: 'row' }}>
              <ActivityIndicator size="small" color="#fff" /><Text style={{ color: '#fff', marginLeft: 10 }}>Signup</Text>
            </View>
          ) : (
            <Text style={{ color: '#fff' }}>Signup</Text>
          )}
        </TouchableOpacity>
            <View style={styles.endView}>
              <Text style={styles.endTxt}>Already have an account?</Text>
              <TouchableOpacity
                style={styles.endBtn}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.loginTxt}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#521be3',
    height: '100%',
  },
  subView: {
    backgroundColor: 'white',
    height: 430,
    marginTop: 240,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingBottom: 20,
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
    marginTop: 20,
    marginLeft: 40,
    fontWeight: 'bold',
  },
  endBtn: {
    marginRight: 80,
  },
  loginTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 17,
  },
});

export default SignUpScreen;