import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { Audio } from "expo-av";
import { FolderOpen, Play, Trash2 } from "lucide-react-native";

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
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Recordings</Text>
          <Text style={styles.headerSubtitle}>{recordings.length > 0 ? `${recordings.length} saved` : "No recordings yet"}</Text>
        </View>
      )}
      style={styles.fListContainer}
      data={recordings}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <View style={styles.recorderItem}>
          <View style={styles.info}>
            <Text style={styles.title}>Recording {index + 1}</Text>
            <Text style={styles.date}>{item.createdAt}</Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#1DB954" }]}
              onPress={() => playSound(item.uri)}
            >
              <Play
                size={20}
                color="#fff"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: "#E53935" }]}
              onPress={() => onDelete(item.uri)}
            >
              <Trash2
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.seperator} />}
      initialNumToRender={10}
      ListEmptyComponent={() => (
        <View style={styles.emptyContainer}>
          <FolderOpen
            size={48}
            color="#999"
          />
          <Text style={styles.emptyText}>No recordings found</Text>
          <Text style={styles.emptySubText}>Start recording to see your saved files here.</Text>
        </View>
      )}
    />
  );
};
const styles = StyleSheet.create({
  header: {
    paddingVertical: responsiveHeight(3),
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeeeff",
  },
  headerTitle: {
    fontSize: responsiveFontSize(3),
    fontWeight: "700",
    color: "#222",
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  fListContainer: {
    marginHorizontal: responsiveWidth(2),
  },
  seperator: {
    height: 1,
    backgroundColor: "#ddd",
  },

  recorderItem: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  date: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  emptyContainer: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: "600",
    color: "#333333ff",
  },
  emptySubText: {
    fontSize: responsiveFontSize(1.7),
    color: "#7f7d7dff",
    marginTop: responsiveHeight(1),
    textAlign: "center",
  },
});
