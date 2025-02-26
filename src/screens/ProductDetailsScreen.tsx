import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import getImageSource from '../utils/getImageSource';

const ProductDetailScreen = ({ route }: any) => {
  const { product } = route.params || {};

  if (!product) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Product not found!</Text>
      </View>
    );
  }

  const imageSource =
    product.imageUrl && product.imageUrl.startsWith('http')
      ? { uri: product.imageUrl }
      : getImageSource(product.id);

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
      <Text style={styles.salePrice}>Sale Price: ${product.sale_price}</Text>
      <Text style={styles.purchases}>Purchases: {product.num_of_purchases}</Text>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    color: 'gray',
  },
  salePrice: {
    fontSize: 18,
    color: 'red',
  },
  purchases: {
    fontSize: 16,
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
});