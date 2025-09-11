import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAudioRecorder } from "../hooks/useAudioRecorder";
import ScreenWrapper from "../components/ScreenWrapper";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";

const RecordScreen = () => {
  const { recording, startRecording, stopRecording } = useAudioRecorder();
  const navigation = useNavigation();
  const handleBackToList = () => {
    if (recording) {
      stopRecording();
    } else {
      navigation.navigate("ListScreen" as never);
      //   navigation.goBack();
    }
  };

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>{recording ? "Recording in progress..." : "Tap to start recording"}</Text>
        <TouchableOpacity
          style={[styles.recordButton, recording && styles.stopButton]}
          onPress={recording ? stopRecording : startRecording}
          activeOpacity={0.7}
        >
          <Text style={styles.recordText}>{recording ? "■" : "●"}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listButton}
          onPress={handleBackToList}
          activeOpacity={0.7}
        >
          <Text style={styles.listButtonText}>Go to Recordings List</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default RecordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: responsiveFontSize(2),
    marginBottom: responsiveHeight(5),
    color: "#333",
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: "#0373FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  stopButton: {
    backgroundColor: "#E53935",
  },
  recordText: {
    fontSize: responsiveFontSize(5),
    color: "#fff",
  },
  listButton: {
    marginTop: responsiveHeight(5),
    paddingVertical: responsiveWidth(3),
    paddingHorizontal: responsiveHeight(4),
    borderRadius: 25,
    backgroundColor: "#333",
  },
  listButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(1.8),
  },
});
