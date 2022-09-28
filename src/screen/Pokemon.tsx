import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/routers";
import { getPokemonSpeciesApi, getEvolutionChainApi } from "../api/pokemon";
import { PokemonEntity, PokemonEvolutionEntity } from "../util/pokemonTypes";
import Header from "../components/Header";
import Types from "../components/Types";
import Evolution from "../components/Evolution";
import { ScrollView } from "react-native-gesture-handler";


export default function PokemonScreen({
  route,
}: NativeStackScreenProps<ParamListBase>) {

  const [evoChain, setEvoChain] = useState<PokemonEvolutionEntity[]>([]);

  const pokemon: PokemonEntity = route.params! as PokemonEntity;
  const evoChainTemp: PokemonEvolutionEntity[] = [];

  const fetchEvolution = async () => {
    try {

      const pokemonSpecies = await getPokemonSpeciesApi(pokemon.id)

      if (pokemonSpecies.url !== "") {
        const evolutionChain = await getEvolutionChainApi(pokemonSpecies.url!)
        getEvo(evolutionChain.chain.evolves_to)

        const filtered = evoChainTemp.filter(function (ev) { return ev.name != pokemonSpecies.name; });
        setEvoChain((prev) => [...prev, ...filtered]);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const getEvo = (evolutions: any) => {
    if (evolutions.length > 0) {
      if (evolutions[0].evolves_to.length > 0) {
        evoChainTemp.push({ name: evolutions[0].species.name, url: evolutions[0].species.url })
        getEvo(evolutions[0].evolves_to);
      } else {
        evoChainTemp.push({ name: evolutions[0].species.name, url: evolutions[0].species.url });
        return 0;
      }
    }
  }

  useEffect(() => {
    (async () => await fetchEvolution())();
  }, []);

  return (
    <ScrollView>
      <Header pokemon={pokemon} />
      <Types types={pokemon.types} />
      <Evolution pokemon={pokemon} evolution={evoChain} />
    </ScrollView>

  );
}
