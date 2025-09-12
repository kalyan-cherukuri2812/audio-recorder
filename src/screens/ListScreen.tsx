import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { AudioList } from "../components/AudioList";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import { Plus } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { responsiveHeight } from "react-native-responsive-dimensions";

export default function ListScreen() {
  const navigation = useNavigation();
  const { recordings, deleteRecording, loadRecordings } = useAudioRecorder();
  console.log("kjhgyujhgyujhbgyuhgh", recordings);

  useFocusEffect(
    useCallback(() => {
      loadRecordings();
    }, [loadRecordings]),
  );
  return (
    <ScreenWrapper>
      <AudioList
        recordings={recordings}
        onDelete={deleteRecording}
      />
      <TouchableOpacity
        style={styles.floatingBtn}
        onPress={() => navigation.navigate("RecordScreen" as never)}
        activeOpacity={0.7}
      >
        <Plus
          size={28}
          color="#fff"
        />
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  floatingBtn: {
    position: "absolute",
    bottom: responsiveHeight(8),
    alignSelf: "center",
    backgroundColor: "#0373FF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
});
