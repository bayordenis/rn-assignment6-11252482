import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

// Dummy product list
const products = [
  { id: '1', name: 'Office Wear' },
  { id: '2', name: 'Black' },
  { id: '3', name: 'Church Wear' },
  { id: '4', name: 'Lamerei' },
  { id: '5', name: '21WN' },
  { id: '6', name: 'Lopo' },
  { id: '7', name: '21WN' },
  { id: '8', name: 'Lame' },
];

// Mapping of product IDs to image paths
const imageMap = {
  '1': require('./assets/dress1.png'),
  '2': require('./assets/dress2.png'),
  '3': require('./assets/dress3.png'),
  '4': require('./assets/dress4.png'),
  '5': require('./assets/dress5.png'),
  '6': require('./assets/dress6.png'),
  '7': require('./assets/dress7.png'),
  '8': require('./assets/dress3.png'),
};

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };
    fetchCart();
  }, []);

  const addToCart = async (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.smallImage} source={require('./assets/Menu.png')} />
        <View style={styles.headerRight}>
          <Image style={styles.smallImage} source={require('./assets/Logo.png')} />
          <Image style={styles.smallImage} source={require('./assets/Search.png')} />
          <Image style={styles.smallImage} source={require('./assets/shoppingBag.png')} />
        </View>
      </View>
      <Text style={styles.title}>OUR STORY</Text>
      <View style={styles.header1}>
        <Image style={styles.smallImage1} source={require('./assets/Listview.png')} />
        <View style={styles.header1Right}>
          <Image style={styles.smallImage1} source={require('./assets/Filter.png')} />
          
        </View>
      </View>
      <View style={styles.productGrid}>
        {products.map((product, index) => (
          index % 2 === 0 && (
            <View key={product.id} style={styles.productPair}>
              <View style={styles.product}>
                <View style={styles.productTop}>
                  <Image style={styles.largeImage} source={imageMap[product.id]} />
                  <Image style={styles.addCircleImage} source={require('./assets/add_circle.png')} />
                </View>
                <Text style={[styles.description, styles.textColor1]}>{product.name}</Text>
                <Text style={[styles.description, styles.textColor2]}>Reversible angora cardigan</Text>
                <Text style={[styles.description, styles.textColor3]}>$120</Text>
              </View>
              {products[index + 1] && (
                <View key={products[index + 1].id} style={styles.product}>
                  <View style={styles.productTop}>
                    <Image style={styles.largeImage} source={imageMap[products[index + 1].id]} />
                    <Image style={styles.addCircleImage} source={require('./assets/add_circle.png')} />
                  </View>
                  <Text style={[styles.description, styles.textColor1]}>{products[index + 1].name}</Text>
                  <Text style={[styles.description, styles.textColor2]}>Reversible angora cardigan</Text>
                  <Text style={[styles.description, styles.textColor3]}>$120</Text>
                </View>
              )}
            </View>
          )
        ))}
        <Button title="Go to Cart" onPress={() => navigation.navigate('CartScreen', { cart })} />
      </View>
      
    </ScrollView>
  );
};

const CartScreen = ({ route, navigation }) => {
  const [cart, setCart] = useState(route.params.cart || []);

  useEffect(() => {
    const fetchCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) setCart(JSON.parse(storedCart));
    };
    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image style={styles.smallImage2} source={require('./assets/Logo.png')} />
    <View style={styles.headerRight}>
      <Image style={styles.smallImage2} source={require('./assets/Search.png')} />
    </View>
  </View>
  <Text style={styles.title}>CHECKOUT</Text>
      <FlatList
      
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image style={styles.largeImage} source={imageMap[item.id]} />
            <View style={styles.cartItemDescription}>
              <Text style={[styles.description, styles.textColor1]}>{item.name}</Text>
              <Text style={[styles.description, styles.textColor2]}>Recycle Boucle Knit Cardigan Pink</Text>
              <Text style={[styles.description, styles.textColor3]}>$120</Text>
              <Image style={styles.addCircleImage} source={require('./assets/remove.png')} />
            </View>
            
          </View>
          
        )}
         
      />
      <Text style={[styles.description, styles.textColor2]}>EST. TOTAL</Text>
              <Text style={[styles.description, styles.textColor3]}>$240</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ title: 'Cart' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  productGrid: {
    flexDirection: 'column',
  },
  productPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  product: {
    flex: 1,
    marginBottom: 24,
  },
  productTop: {
    position: 'relative',
  },
  largeImage: {
    width: 150,
    height: 200,
  },
  smallImage: {
    width: 50,
    height: 50,
    padding: 20,
    marginRight:50
  },
  smallImage1: {
    width: 50,
    height: 50,
    padding: 20,
    marginRight: 50,
  },
  smallImage2: {
    width: 50,
    height: 50,
    padding: 20,
    marginRight: 100,
    alignItems: 'left',
  },
  addCircleImage: {
    position: 'absolute',
    bottom: 8,
    right: 50,
    width: 30,
    height: 30,
  },
  description: {
    marginTop: 8,
  },
  textColor1: {
    color: 'black',
  },
  textColor2: {
    color: 'grey',
  },
  textColor3: {
    color: 'red',
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  cartItemDescription: {
    flex: 1,
    alignItems: 'left',
    marginLeft: 16,
  },
});

export default App;