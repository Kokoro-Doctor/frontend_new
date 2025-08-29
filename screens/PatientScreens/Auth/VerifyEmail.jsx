import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import * as Linking from 'expo-linking';
import { API_URL } from "../../../env-vars";

const VerifyEmail=({navigation}) => {
  const [status, setStatus] = useState('verifying'); // verifying | success | failed

  useEffect(() => {
    const handleUrl = async () => {
      const url = await Linking.getInitialURL();

      if (url) {
        const { queryParams } = Linking.parse(url);
        const { email, token } = queryParams;

        if (email && token) {
          fetch(`${API_URL}/auth/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, token })
          })
            .then(res => res.ok ? setStatus('success') : setStatus('failed'))
            .catch(() => setStatus('failed'));
        } else {
          setStatus('failed');
        }
      } else {
        setStatus('failed');
      }
    };

    handleUrl();
  }, []);

  return (
    <View style={styles.container}>
      {status === 'verifying' && (
        <>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.text}>Verifying your email...</Text>
        </>
      )}
      {status === 'success' && (
        <>
          <Text style={styles.success}>✅ Email Verified</Text>
          <Text>You can now log in.</Text>
        </>
      )}
      {status === 'failed' && (
        <>
          <Text style={styles.error}>❌ Verification Failed</Text>
          <Text>The link may be invalid or expired.</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginTop: 20,
    fontSize: 16
  },
  success: {
    fontSize: 20,
    color: 'green',
    marginBottom: 10
  },
  error: {
    fontSize: 20,
    color: 'red',
    marginBottom: 10
  }
});

export default VerifyEmail;