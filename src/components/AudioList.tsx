import React, { useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { Audio } from "expo-av";

type Props = {
  recordings: { uri: string; createdAt: string }[];
  onDelete: (uri: string) => void;
};

export const AudioList: React.FC<Props> = ({ recordings, onDelete }) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async (uri: string) => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    await newSound.playAsync();
  };

  return (
    <FlatList
      style={styles.fListContainer}
      data={recordings}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.recorderItem}>
          <View style={{ flex: 1 }}>
            <Text>Recording {index + 1}</Text>
            <Text>{item.createdAt}</Text>
          </View>
          <Button
            title="Play"
            onPress={() => playSound(item.uri)}
          />
          <Button
            title="Delete"
            color="red"
            onPress={() => onDelete(item.uri)}
          />
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      initialNumToRender={10}
    />
  );
};
const styles = StyleSheet.create({
  fListContainer: {
    marginHorizontal: responsiveWidth(2),
  },
  recorderItem: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seperator: {
    height: 1,
    backgroundColor: "#ddd",
  },
});
