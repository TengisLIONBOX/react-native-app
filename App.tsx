import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import Constants from "expo-constants";
import { useState, useEffect } from "react";
import axios from "axios";

export default function App() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://fakestoreapi.com/products/");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        style={{ flex: 1 }}
        ListHeaderComponent={
          <View>
            <Image
              source={{
                uri: "https://i.insider.com/650219bc1afe8f0019e9ec80?width=1066&format=jpeg",
              }}
              width={100}
              height={100}
              style={{ width: "100%" }}
            />
          </View>
        }
        data={data}
        renderItem={({ item }) => (
          <View style={styles.imagedes}>
            <Image
              width={100}
              height={100}
              source={{
                uri: `${item.image}`,
              }}
            />
            <View>
              <Text style={{ marginBottom: 10, width: "100%" }}>
                {item.title}
              </Text>
              <Text>${item.price}</Text>
            </View>
          </View>
        )}
      />

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          height: 50,
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <Button title="Home" color="#4a4a4a" />
        <Button title="Inventory" color="#4a4a4a" />
        <Button title="Info" color="#4a4a4a" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    display: "flex",
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  imagedes: {
    display: "flex",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
