import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import ProfileModal from '../components/ProfileModal';
import BottomNavigation from '../components/BottomNavigation';
import ProductCard from '../components/ProductCard';
import CustomDrawer from '../components/CustomDrawer';

interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  sale_price: string;
  description: string;
}

const ProductScreen = ({navigation}: any) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]); 
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://60cc791971b73400171f7d68.mockapi.io/api/v1/products',
      );
      setAllProducts(response.data.slice(0, 25)); // Store all data in memory
      setProducts(response.data.slice(0, 10)); // Initially show only 10 items
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to load more products when scrolling
  const loadMoreProducts = () => {
    if (loadingMore || products.length >= allProducts.length) return;
    
    setLoadingMore(true);
    setTimeout(() => {
      const newProducts = allProducts.slice(0, products.length + 5); // Load 5 more
      setProducts(newProducts);
      setLoadingMore(false);
    }, 1000); // Simulate network delay
  };

  return (
    <View style={styles.container}>
      {/* Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Icon name="menu" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="person" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#2196F3" />
        ) : (
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <ProductCard product={item} navigation={navigation} />
            )}
            onEndReached={loadMoreProducts} // Trigger when reaching end of list
            onEndReachedThreshold={0.5} // Trigger when 50% of the list is seen
            ListFooterComponent={loadingMore ? <ActivityIndicator size="small" color="#2196F3" /> : null}
            contentContainerStyle={{paddingBottom: 80}}
          />
        )}
      </View>

      {/* Profile Modal */}
      <ProfileModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* Custom Drawer */}
      <CustomDrawer isVisible={drawerVisible} onClose={() => setDrawerVisible(false)} />

      {/* Bottom Navigation */}
      <BottomNavigation />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 15,
    paddingTop: 20,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
    padding: 10,
  },
});