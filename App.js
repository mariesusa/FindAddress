import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

const initial = {
  latitude: 60.200692,
  longitude: 24.934302,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0221
};

const [address, setAddress] = useState('');
const [geolocation, setGeolocation] = useState(initial);

/*
Code I can't make work because data is undefined and I don't understand why

const findAddress = () => {
  fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=r0vb5J2B0gkhcNQ7YyQfNAk8fKMqFBsa&location=${address}`)
  .then(response => response.json())
  .then(json => json.results[0].locations[0].latLng)
  console.log(data)

  setGeolocation({ latitude: `${responseJson.lat}`, longitude: `${responseJson.lng}` })

  .catch(error => {
    Alert.alert('Error', error);
  });
}*/

const findAddress = async (address) => {
  try {
    const response = await fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=r0vb5J2B0gkhcNQ7YyQfNAk8fKMqFBsa&location=${address}`);
    const data = await response.json();

    const { lat, lng } = data.results[0].locations[0].latLng;
    setGeolocation({ ...geolocation, latitude: lat, longitude: lng })
  } catch (error) {
    Alert.alert('Error', error);
  }
  Keyboard.dismiss();
}

  return (
    <View style={styles.container}>

      <MapView
        style={ styles.map }
        region={ geolocation }
        >

      <Marker
        coordinate={ geolocation }
        />
      </MapView>
      
      <View>
        <TextInput
          style={ styles.input }
          keyboardType='default'
          onChangeText={ text => setAddress(text) }
          value={ address }
          />
      </View>

      <View style={ styles.button }>
        <Button title='SHOW'
          onPress={ () => findAddress(address) } />
      </View>
      
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },
  input : {
    width: 200,
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 3,
    marginTop: 3,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
button : {
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    width: '20%',
    height: 40
  },
text : {
  color: 'black',
  fontSize: 20,
  marginBottom: 4,
  },
  map: {
    flex: 1,
    width: '95%',
    height: '95%'
  }
});

