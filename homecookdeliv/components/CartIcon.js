// CartIcon.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CartIcon = ({ count, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.cartIcon, style]} onPress={onPress}>
      <AntDesign name="shoppingcart" size={24} color="black" />
      {count > 0 && (
        <View style={styles.counter}>
          <Text>{count}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cartIcon: {
    position: "absolute",
    top: 25,
    right: 25,
  },
  counter: {
    position: "absolute",
    top: -10,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CartIcon;
