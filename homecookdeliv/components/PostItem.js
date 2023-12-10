    import React, { useState,useRef} from "react";
    import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Animated,
    } from "react-native";
    import { AntDesign } from "@expo/vector-icons";

    const PostItem = ({
    name,
    ingredients,
    additional,
    category,
    address,
    addToCart,
    onLike,
    }) => {
    const [liked, setLiked] = useState(false);
    const [enlarged, setEnlarged] = useState(false);
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handleAddToCart = () => {
        const item = { name, ingredients, additional, category, address };
        addToCart(item);
    };

    const handlePressHeart = () => {
        setLiked(!liked);
        if (!liked) {
        onLike(category);
        }
    };

    const handlePressPost = () => {
        setEnlarged(!enlarged);
        Animated.spring(scaleValue, {
        toValue: enlarged ? 1 : 1.05,
        friction: 3,
        useNativeDriver: true,
        }).start();
    };

    return (
        <TouchableOpacity onPress={handlePressPost}>
        <Animated.View
            style={[styles.postPreview, { transform: [{ scale: scaleValue }] }]}
        >
            <Text style={styles.postTitle}>{name}</Text>
            <Text style={styles.postDescription}>Ingredients: {ingredients}</Text>
            <Text style={styles.postDescription}>Additional: {additional}</Text>
            <Text style={styles.postCategory}>{category}</Text>
            <Text style={styles.postDescription}>Address: {address}</Text>
            <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
            <TouchableOpacity onPress={handlePressHeart}>
                <AntDesign name="heart" size={24} color={liked ? "red" : "grey"} />
            </TouchableOpacity>
            </Animated.View>
            {enlarged && (
            <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}
            >
                <Text>Add to Cart</Text>
            </TouchableOpacity>
            )}
        </Animated.View>
        </TouchableOpacity>
    );
    };

    const styles = StyleSheet.create({
    postPreview: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        marginHorizontal: 15,
        borderWidth: 2,
        borderColor: "#4FC3F7",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 6,
    },
    postTitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#9575CD",
        marginBottom: 10,
    },
    postDescription: {
        fontSize: 16,
        color: "#616161",
    },
    postCategory: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF", // White text color
        backgroundColor: "#4FC3F7", // A distinct background color for the category
        borderColor: "#007bff", // Border color // Border width, // Rounded corners
        paddingVertical: 4, // Vertical padding
        paddingHorizontal: 8, // Horizontal padding
        marginTop: 4, // Margin from the previous element
        alignSelf: "flex-start", // Align to the start of the row
    },
    addToCartButton: {
        marginTop: 10,
        backgroundColor: "#4FC3F7",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    });

    export default PostItem;
