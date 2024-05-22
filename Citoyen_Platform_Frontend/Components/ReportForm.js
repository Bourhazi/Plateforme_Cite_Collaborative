import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addLocation } from '../api';

const ReportForm = ({ location, navigation }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const saveReport = async () => {
    try {
      const formattedLocation = {
        type: 'Point',
        coordinates: [location.coords.longitude, location.coords.latitude],
        accuracy: location.coords.accuracy,
        altitude: location.coords.altitude,
        altitudeAccuracy: location.coords.altitudeAccuracy,
        heading: location.coords.heading,
        speed: location.coords.speed
      };

      const response = await addLocation({ location: formattedLocation, description, imageUrl: image });
      console.log('Reclamation added:', response.data);
      Alert.alert('Success', 'Reclamation added successfully!');
      navigation.replace('LocationsList');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        Alert.alert('Error', `Server responded with a status: ${error.response.status}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        Alert.alert('Error', 'No response received from the server. Please try again later.');
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Error', `Unexpected error: ${error.message}`);
      }
      console.error('Error config:', error.config);
    }
  };

  return (
    <View style={styles.container}>
      {image && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: image }} style={styles.imagePreview} />
          <Text style={styles.pictureText}>Picture taken!</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={takePicture}>
        <Text style={styles.buttonText}>Take a Picture</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        placeholderTextColor="#aaa"
      />
      <TouchableOpacity style={styles.button} onPress={saveReport} disabled={!image || !description}>
        <Text style={styles.buttonText}>Save Report</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  button: {
    height: 50,
    backgroundColor: '#6200ee',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  pictureText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ReportForm;
