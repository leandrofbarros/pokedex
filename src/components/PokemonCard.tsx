import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getColorByPokemonType } from "../util/pokemonUtil";
import { PokemonEntity } from "../util/pokemonTypes";
interface PokemonCardProps {
  pokemon: PokemonEntity;
}

const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const navigation = useNavigation();

  const cardStyles = {
    borderColor: getColorByPokemonType(pokemon.types),
    ...styles.card,
  };

  const handlePress = () => {
    navigation.navigate("Pokemon" as never, pokemon as never);
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={cardStyles}>
        <Text style={styles.name}>{pokemon.name?.toUpperCase()}</Text>
        <Text style={styles.name}>#{String(pokemon.id).padStart(3, "0")}</Text>
        <Image source={{ uri: pokemon.image }} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
    margin: 5,
    borderRadius: 15,
    padding: 8,
    backgroundColor: "white",
    borderWidth: 3,
  },
  image: {
    position: "absolute",
    right: 2,
    bottom: 0,
    height: 90,
    width: 90,
  },
  name: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
  },
});

export default React.memo(PokemonCard);
