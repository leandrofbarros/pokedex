import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PokedexScreen from "../screen/Pokedex";
import PokemonScreen from "../screen/Pokemon";
import EvolutionScreen from "../screen/Evolution";

const Stack = createNativeStackNavigator();

export default function PokedexNavigation() {
  return (
    <Stack.Navigator initialRouteName="Pokedex">
      <Stack.Screen name="Pokedex" component={PokedexScreen} />
      <Stack.Screen
        options={{
          headerTransparent: true,
          title: "",
          headerTintColor: "#000000",
          headerShadowVisible: false,
        }}
        name="Pokemon"
        component={PokemonScreen}
      />
      <Stack.Screen
        options={{
          headerTransparent: true,
          title: "",
          headerTintColor: "#000000",
          headerShadowVisible: false,
        }}
        name="Evolution"
        component={EvolutionScreen}
      />
    </Stack.Navigator>
  );
}
