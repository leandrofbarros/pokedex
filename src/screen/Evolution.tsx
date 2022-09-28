import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import { PokemonEntity } from "../util/pokemonTypes";
import Header from "../components/Header";
import Types from "../components/Types";
import { ScrollView } from "react-native-gesture-handler";

export default function EvolutionScreen({
  route,
}: NativeStackScreenProps<ParamListBase>) {

  const pokemon: PokemonEntity = route.params! as PokemonEntity;

  return (
    <ScrollView>
      <Header pokemon={pokemon} />
      <Types types={pokemon.types} />
    </ScrollView>
  );
}
