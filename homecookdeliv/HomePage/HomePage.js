import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  RefreshControl,
} from "react-native";
import PostItem from "../components/PostItem";
import { AntDesign } from "@expo/vector-icons";
import CartIcon from "../components/CartIcon";

const HomePage = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [cart, setCart] = useState([]);
  const [likes, setLikes] = useState({});

  const fetchPosts = async () => {
    setRefreshing(true);
    try {
      const response = await fetch("https://retoolapi.dev/EfTNJs/data");
      if (!response.ok) {
        throw new Error("Error fetching posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    setRefreshing(false);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const handleLike = (category) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [category]: (prevLikes[category] || 0) + 1,
    }));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostItem
            name={item.name}
            ingredients={item.ingredients}
            additional={item.additional}
            category={item.category}
            address={item.address}
            addToCart={() => addToCart(item)}
            onLike={handleLike}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
        }
      />
      <CartIcon
        count={cart.length}
        onPress={() => navigation.navigate("CartPage", { cart, updateCart })}
        style={styles.cartIcon}
      />
      <TouchableOpacity
        style={styles.createPostButton}
        onPress={() => navigation.navigate("PostPage")}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8E9",
  },
  cartIcon: {
    position: "absolute",
    top: 750,
    right: 100,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFD54F",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  createPostButton: {
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#FFD54F",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  listContent: {
    paddingBottom: 90, // Added padding to prevent posts from going under the buttons
    paddingTop: 20,
  },
});

export default HomePage;
