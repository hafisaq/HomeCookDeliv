import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./HomePage/HomePage";
import PostPage from "./PostPage/PostPage";
import CartPage from "./components/CartPage";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{
            headerStyle: {
              backgroundColor: "#F1F8E9", // Set your desired color
            },
            headerTintColor: "black", // Set the color of header text
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="PostPage"
          component={PostPage}
          options={{
            headerStyle: {
              backgroundColor: "#F1F8E9", // Set your desired color
            },
            headerTintColor: "black", // Set the color of header text
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="CartPage"
          component={CartPage}
          options={{
            headerStyle: {
              backgroundColor: "#F1F8E9", // Set your desired color
            },
            headerTintColor: "black", // Set the color of header text
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
