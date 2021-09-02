import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList} from 'react-native';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';


export default function TabTwoScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getMovies = async () => {
      try {
        const response = await fetch('https://heroku-vs-bvp.herokuapp.com/get-items/all');
        const json = await response.json();
        console.log(json)
        setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>List Items ca Mère {"\n"} {"\n"}</Text>
      <Text style={styles.baseText}>Pour l'instant je peux pas fetch ton api.{"\n"} y'a toujours un probleme de cors policy</Text>
      <Text style={styles.baseText}>Des bonnes bouze made in Hollywood:
      {"\n"}{"\n"}{"\n"}</Text>

       {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id.toString()}
          renderItem={({ item }) => (
            <Text>{item.unit}   {item.name}: {item.price_per_unit} €</Text>
          )}
        />
      )}
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabTwoScreen.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseText: {
    textAlign: 'center',
    fontFamily: "Cochin"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
