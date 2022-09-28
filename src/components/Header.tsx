import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getColorByPokemonType } from "../util/pokemonUtil";
import { PokemonEntity } from "../util/pokemonTypes";

export default function Header({ pokemon }: { pokemon: PokemonEntity }) {
  const borderBottomColor = getColorByPokemonType(pokemon.types);

  const separatorStyles = {
    ...styles.separator,
    borderBottomColor,
  };

  return (
    <>
      <View style={styles.bg} />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{String(pokemon.name).toUpperCase()}</Text>
          <Text style={styles.number}>#{pokemon.number}</Text>
        </View>
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: pokemon.image }} />
        </View>
        <View style={separatorStyles}></View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 400,
    position: "absolute",
    borderBottomLeftRadius: 300,
    borderBottomRightRadius: 300,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  separator: {
    paddingHorizontal: 20,
    paddingTop: 0,
    borderBottomWidth: 4,
    opacity: 0.4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  name: {
    fontSize: 24,
    color: "#000000",
    fontWeight: "bold",
  },
  number: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "bold",
  },
  imgContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  image: {
    height: 300,
    width: 300,
  },
});
