import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const CartPage = ({ route, navigation }) => {
  const { cart, updateCart } = route.params;
  const [groupedCartItems, setGroupedCartItems] = useState([]);
  const [expandedItems, setExpandedItems] = useState(new Set()); // Set to track expanded items

  useEffect(() => {
    setGroupedCartItems(groupCartItems(cart));
  }, [cart]);

  const groupCartItems = (cartItems) => {
    const groupedItems = {};
    cartItems.forEach((item) => {
      const key = item.name; // Assuming 'name' can uniquely identify items
      if (!groupedItems[key]) {
        groupedItems[key] = { ...item, count: 1 };
      } else {
        groupedItems[key].count += 1;
      }
    });
    return Object.values(groupedItems);
  };

  const handleDelete = (name) => {
    const newCart = cart.filter((item) => item.name !== name);
    updateCart(newCart); // Update global cart
    setGroupedCartItems(groupCartItems(newCart)); // Update local grouped items
    setExpandedItems(
      (current) => new Set([...current].filter((item) => item !== name))
    ); // Update expanded items
  };

  const toggleExpandedItem = (name) => {
    setExpandedItems((currentExpandedItems) => {
      const newExpandedItems = new Set(currentExpandedItems);
      if (newExpandedItems.has(name)) {
        newExpandedItems.delete(name);
      } else {
        newExpandedItems.add(name);
      }
      return newExpandedItems;
    });
  };

  const renderItem = ({ item }) => {
    const isExpanded = expandedItems.has(item.name);

    return (
      <TouchableOpacity
        onPress={() => toggleExpandedItem(item.name)}
        style={styles.card}
      >
        <View style={styles.cardContent}>
          <Text style={styles.itemTitle}>
            {item.name} (x{item.count})
          </Text>
          {isExpanded && (
            <View style={styles.expandedView}>
              <Text style={styles.detailText}>
                Ingredients: {item.ingredients}
              </Text>
              <Text style={styles.detailText}>
                Additional: {item.additional}
              </Text>
              <Text style={styles.detailText}>Category: {item.category}</Text>
              <Text style={styles.detailText}>Address: {item.address}</Text>
            </View>
          )}
          <TouchableOpacity
            onPress={() => handleDelete(item.name)}
            style={styles.deleteButton}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={groupedCartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F8E9", // Match the background color of HomePage
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  cardContent: {
    padding: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9575CD", // Assuming this is a primary color in HomePage
    marginBottom: 8,
  },
  expandedView: {
    backgroundColor: "#ECEFF1", // A light secondary color
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 4,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#FF5252", // A highlight color for delete buttons
    padding: 8,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default CartPage;
