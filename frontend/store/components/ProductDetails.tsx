import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { ProductDetails } from '@/types';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

const ProductDetailsScreen = ({ route }: any) => {
  const { product } = route.params;
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null); // Initialize with null or initial state

  useEffect(() => {
    console.log(product.sku[0])
    fetchProductDetails(product.sku[0].code);
  }, []);

  const fetchProductDetails = async (sku: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/stock-price/${sku}`);
      setProductDetails(response.data); // Assuming response.data matches ProductDetails interface
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch product details');
    }
  };

  return (
    <View style={styles.container}>
      {productDetails ? (
        <ThemedView style={styles.details}>
          <ThemedText>Name: {productDetails.productName}</ThemedText>
          <ThemedText>Price: ${productDetails.price / 100}</ThemedText>
          <ThemedText>Stock: {productDetails.stock}</ThemedText>
          <ThemedText>variant Code: {productDetails.variantCode}</ThemedText>
          <ThemedText>variant Name: {productDetails.variantName}</ThemedText>
        </ThemedView>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default ProductDetailsScreen;