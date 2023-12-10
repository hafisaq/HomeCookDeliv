import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const PostPage = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [additional, setAdditional] = useState("");
  const [leftOverSelected, setLeftOverSelected] = useState(false);
  const [homeMadeSelected, setHomeMadeSelected] = useState(false);
  const [address, setAddress] = useState("");

  const toggleLeftOver = () => setLeftOverSelected(!leftOverSelected);
  const toggleHomeMade = () => setHomeMadeSelected(!homeMadeSelected);

  const postDetails = async () => {
    try {
      const postData = {
        name: name,
        ingredients: ingredients,
        additional: additional,
        category: leftOverSelected
          ? "#LeftOver"
          : homeMadeSelected
          ? "#HomeMade"
          : "",
        address: address,
      };

      const response = await fetch("https://retoolapi.dev/EfTNJs/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error("Error posting data");
      }

      const responseData = await response.json();
      Alert.alert("Success", "Post created successfully.");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create a New Post</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Ingredients"
        value={ingredients}
        onChangeText={setIngredients}
      />
      <TextInput
        style={styles.input}
        placeholder="Additional"
        value={additional}
        onChangeText={setAdditional}
      />

      <TouchableOpacity
        style={[styles.tagButton, leftOverSelected && styles.selectedButton]}
        onPress={toggleLeftOver}
      >
        <Text>#LeftOver</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.tagButton, homeMadeSelected && styles.selectedButton]}
        onPress={toggleHomeMade}
      >
        <Text>#HomeMade</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Enter Address"
        value={address}
        onChangeText={setAddress}
      />

      <TouchableOpacity style={styles.postButton} onPress={postDetails}>
        <Text>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F1F8E9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#9575CD",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#4FC3F7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "white",
  },
  tagButton: {
    backgroundColor: "#E0E0E0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#4FC3F7",
  },
  postButton: {
    backgroundColor: "#4FC3F7",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
});

export default PostPage;
