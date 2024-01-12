import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import Constants from "expo-constants";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

interface ProductData {
  id: number;
  title: string;
  description: string;
  image: string;
}

export const InfoScreen = () => {
  const [data, setData] = useState<ProductData | null>(null);
  const route = useRoute();
  const params: any = route.params;
  const aid = params.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ProductData>(
          `https://fakestoreapi.com/products/${aid}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [aid]);

  return (
    <View style={styles.container}>
      {data ? (
        <View style={styles.content}>
          <Image
            style={styles.productImage}
            source={{
              uri: `${data.image}`,
            }}
          />
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.description}>{data.description}</Text>
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    maxWidth: "80%",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#777",
  },
});
