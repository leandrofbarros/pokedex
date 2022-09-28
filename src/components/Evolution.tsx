import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image} from "react-native";
import { getColorByPokemonType } from "../util/pokemonUtil";
import { useNavigation } from "@react-navigation/native";
import {
  PokemonEntity,
  PokemonEvolutionEntity,
} from "../util/pokemonTypes";
import { getPokemonDetailsApi } from "../api/pokemon";

export default function Evolution({
  pokemon,
  evolution,
}: {
  pokemon: PokemonEntity;
  evolution: PokemonEvolutionEntity[];
}) {
  const navigation = useNavigation();

  const backgroundColor = getColorByPokemonType(pokemon.types);

  const bgEvolutionItem = {
    ...styles.item,
    backgroundColor,
  };

  const handlePress = async (name: string) => {
    try {
      const pokemonDetail = await getPokemonDetailsApi(name);
      
      navigation.navigate("Evolution" as never, pokemonDetail as never);
    } catch (error) {
      console.error(error);
    }
  }; 

  return (
    <View style={styles.container}>

      {evolution.map(({ name }) => (   
        <TouchableWithoutFeedback onPress={() => handlePress(name)} key={name}>
          <View style={bgEvolutionItem}>
            <Text style={styles.text}>{name.toUpperCase()}</Text>
            <Image style={styles.image} source={require('../assets/icons/right-chevron.png')}/>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: 4,
    marginTop: 20,
  },
  text: {
    marginTop: 4,
    color: "#FEFEFE",
    fontSize: 18,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    height: 50,
    margin: 8,
    borderRadius: 15,
    padding: 8,
    backgroundColor: "red",
    justifyContent:"space-between",
    opacity: 0.8,
  },
  image: {
    marginTop: 8,
    width: 20,
    height: 20,
  },
});
