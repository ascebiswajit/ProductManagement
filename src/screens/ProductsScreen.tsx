import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, Modal, TextInput, Button, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addProductRequest, editProductRequest, deleteProductRequest, fetchProductsRequest } from '../redux/actions/productActions';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import { uploadImage } from '../utils/uploadImage';

interface Product {
  id: string;
  name: string;
  userId: string;
  description: string;
  created_at: Date;
  updated_at: Date;
  image: string;
}

const ProductsScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [image, setImage] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const dispatch = useDispatch();
  const products = useSelector((state: any) => state.products.products);
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId('');
      }
    });

    return unsubscribe;
  }, []);

  const isloggedin = !auth()?.currentUser?.isAnonymous;

  useEffect(() => {
    if (!isloggedin) {
      navigation.navigate('Auth', { screen: 'Login' });
    }
  }, [isloggedin, navigation]);


  useEffect(() => {
    dispatch(fetchProductsRequest(userId));
  }, [dispatch, userId]);

  const handleImagePicker = async () => {
    if (products) {
      try {

        const result = await ImagePicker.launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 1,
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        });

        if (result.assets && result.assets.length > 0 && result.assets[0].uri) {
          setSelectedImage(result.assets[0].uri);
        }
      } catch (error) {
        console.error('Error picking image:', error);
      }
    } else {
    }
  };


  const handleAddProduct = async () => {
    try {
      const url = await uploadImage(selectedImage);
      setImage(url);
      if (editingProduct) {
        dispatch(editProductRequest({ ...editingProduct, name, description, image }));
        setModalVisible(false);
        setSelectedImage('');
        setName('');
        setDescription('');
      } else {
        if (name.length > 0 && description.length > 0) {
          dispatch(addProductRequest({ name, userId, description, created_at: new Date(), updated_at: new Date(), image }));
          setModalVisible(false);
          setSelectedImage('');
          setName('');
          setDescription('');
        }
        else {
          Alert.alert('Please fill all the fields');
        }
      }

      setEditingProduct(null);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditProduct = (product: Product) => {
    setName(product.name);
    setDescription(product.description);
    setImage(product.image);
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleDeleteProduct = (productId: string) => {
    Alert.alert(
      'Logout',
      'Are you sure you want to delete that product?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            dispatch(deleteProductRequest(productId));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.navigate('Auth', { screen: 'Login' }))
              .catch((error) => console.error('Error logging out:', error));
          },
        },
      ],
      { cancelable: false }
    );
  };


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchAndAddContainer}>
        <TextInput
          style={[styles.searchbar, { width: '70%' }]}
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
        <TouchableOpacity style={[styles.addButton, { width: '28%' }]} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {products ? (
        <FlatList
          data={products?.filter((product: Product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))}
          keyExtractor={(item: Product) => item.id}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <View style={styles.productImageContainer}>
                {item.image ? (
                  <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                  />
                ) : (
                  <View style={styles.productImagePlaceholder} />
                )}
              </View>
              <Text style={styles.productName}>{item.name}</Text>
              <Text>{item.description}</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => handleEditProduct(item)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeleteProduct(item.id)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Product Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Product Description"
            value={description}
            onChangeText={setDescription}
          />
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.image} />
          )}
          <TouchableOpacity style={{ padding: 5, borderWidth: 1, borderColor: 'gray', marginBottom: 10 }} onPress={handleImagePicker}><Text>choose image</Text></TouchableOpacity>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <Button title={editingProduct ? 'Edit Product' : 'Add Product'} onPress={handleAddProduct} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    padding: 10,
  },
  logoutButtonText: {
    color: 'red',
    fontSize: 16,
  },
  searchAndAddContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchbar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  productContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  editButton: {
    backgroundColor: '#0394fc',
    padding: 5,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 10,
    padding: 5,
    borderRadius: 5,
  },
  productImageContainer: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productImagePlaceholder: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  modalView: {
    flex: 0,
    justifyContent: 'center',
    backgroundColor: 'white',
    height: '50%',
    padding: 20,
    marginVertical: 250,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ProductsScreen;