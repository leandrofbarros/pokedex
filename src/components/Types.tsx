import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getColorByPokemonType } from "../util/pokemonUtil";
import { PokemonTypeEntity } from "../util/pokemonTypes";

export default function Types({ types }: { types: PokemonTypeEntity[] }) {
  return (
    <View style={styles.container}>
      {types.map(({ name }) => (
        <Text
          key={name}
          style={{
            ...styles.text,
            backgroundColor: getColorByPokemonType([{ name }]),
          }}
        >
          {name.toUpperCase()}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 40,
    marginTop: 15,
  },
  text: {
    backgroundColor: "#fefefe",
    paddingHorizontal: 20,
    paddingVertical: 4,
    borderRadius: 10,
    color: "#FEFEFE",
    fontSize: 18,
  },
});
