import { API_BASE } from "../util/constants";
import axios from "axios";
import {
  OriginalPokemonDetailEntity,
  OriginalPokemonEntity,
  PokemonEntity,
  PokemonSpecieEntity
} from "../util/pokemonTypes";

// Get the pokemon list and some details
export const getFormattedPokemonInfoApi = async (
  nextUrl?: string
): Promise<[PokemonEntity[], string]> => {
  const { pokemons, next } = await getPokemonsApi(nextUrl);
  const pokemonsDetail = await Promise.all(
    pokemons.map(async ({ url }): Promise<PokemonEntity> => {
      const originalDetail = await getPokemonByUrlApi(url);
      return formatPokemonInfo(originalDetail); 
    })
  );
  return [pokemonsDetail, next];
};

// Get the first 20 pokemons and the link to the next 20
export const getPokemonsApi = async (nextUrl?: string) => {
  try {
    const url = nextUrl || `${API_BASE}/pokemon?limit=20&offset=0`;
    const {
      data,
    }: { data: { results: OriginalPokemonEntity[]; next: string } } =
      await axios.get(url);
    const pokemons = data.results;
    const next = data.next;
    return { pokemons, next };
  } catch (e) {
    throw e;
  }
};

// Get the pokemon details
export const getPokemonByUrlApi = async (url: string) => {
  try {
    const { data }: { data: OriginalPokemonDetailEntity } = await axios.get(
      url
    );
    return data;
  } catch (e) {
    throw e;
  }
};  

// Get the url of the species evolution chain
export async function getPokemonSpeciesApi(id: string) {
  try {
    const url = `${API_BASE}/pokemon-species/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    let specie: PokemonSpecieEntity = {
      name: data.name,
      url: data.evolution_chain.url ? data.evolution_chain.url : '',
    }
    return specie;

  } catch (error) {
    throw error;
  }
}

// Get the evolution chain pokemons
export async function getEvolutionChainApi(url: string) { 
  try {
    const response = await fetch(url);
    const chain = await response.json();
    return chain;
  } catch (error) {
    throw error;
  }
}

// Get the details of a pokemon
export async function getPokemonDetailsApi(name: string) {
  try {
    const url = `${API_BASE}/pokemon/${name}`;
    const response = await fetch(url);
    const result = await response.json();
    return formatPokemonInfo(result);
  } catch (error) {
    throw error;
  }
}

// Format the data for the PokemonEntity
const formatPokemonInfo = (
  originalDetail: OriginalPokemonDetailEntity
): PokemonEntity => {
  const { id, name, order } = originalDetail;
  const image = originalDetail.sprites.other["official-artwork"].front_default;
  const types = originalDetail.types.map(({ type }) => type);
  const number = String(id).padStart(3, "0");
  return {
    id,
    name,
    order,
    image,
    types,
    number,
  };
};
