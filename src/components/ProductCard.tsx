import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import getImageSource from '../utils/getImageSource';


const ProductCard = ({ product, navigation }: { product: any; navigation: any }) => {
  
    const imageSource =
    product.imageUrl && product.imageUrl.startsWith('http')
      ? { uri: product.imageUrl }
      : getImageSource(product.id);

  return (
    <View style={styles.card}>
      <Image source={imageSource} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Price: ${product.price}</Text>
        <Text style={styles.salePrice}>Sale: ${product.sale_price}</Text>

        {/* Detail Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ProductDetail', { product })}
        >
          <Text style={styles.buttonText}>Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  details: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  salePrice: {
    fontSize: 14,
    color: 'red',
  },
  button: {
    marginTop: 5,
    backgroundColor: '#2196F3',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
});