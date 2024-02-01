import React, {useState} from 'react';
import {View, TextInput, Button, Alert, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      // Validate that both email and password are entered
      if (!email || !password) {
        Alert.alert('Invalid Input', 'Please enter both email and password.');
        return;
      }

      // Password validation: Minimum 6 characters, at least one uppercase letter
      const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(password)) {
        Alert.alert(
          'Invalid Password',
          'Password must be at least 6 characters long and contain at least one uppercase letter.',
        );
        return;
      }

      // Simulate a successful login
      // In a real-world scenario, you would make an API request to authenticate the user
      const response = {data: {success: true}};

      if (response.data.success) {
        // Log here to check if it reaches this point
        console.log('Login successful. Navigating to HomeScreen.');

        // Pass user details to HomeScreen
        navigation.navigate('Home', {username: email, password});
      } else {
        // Handle authentication failure
        Alert.alert(
          'Authentication Failed',
          'Invalid credentials. Please try again.',
        );
      }
    } catch (error) {
      console.error('API request failed', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!showPassword}
      />
      {password.length > 0 && (
        <Text style={styles.passwordDisclaimer}>
          Password must be at least 6 characters long and contain at least one
          uppercase letter.
        </Text>
      )}
      <Button
        title={showPassword ? 'Hide Password' : 'Show Password'}
        onPress={() => setShowPassword(!showPassword)}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  passwordDisclaimer: {
    color: 'gray',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginScreen;
