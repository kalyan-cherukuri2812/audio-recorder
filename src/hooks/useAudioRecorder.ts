import { useEffect, useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RecordingItem = {
  uri: string;
  createdAt: string;
};

const STORAGE_KEY = "recordings";

export function useAudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);

  // Load saved recordings
  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setRecordings(JSON.parse(data));
      }
    })();
  }, []);

  const saveRecordings = async (list: RecordingItem[]) => {
    setRecordings(list);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (!permission.granted) {
        alert("Permission required to record audio");
        return;
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);

      setRecording(recording);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      const sourceUri = recording.getURI();
      setRecording(null);

      if (sourceUri) {
        const fileName = `recording_${Date.now()}.m4a`; // default format
        const newPath = FileSystem.documentDirectory + fileName;
        await FileSystem.moveAsync({ from: sourceUri, to: newPath });

        const newRecord = { uri: newPath, createdAt: new Date().toLocaleString() };
        const updated = [...recordings, newRecord];
        await saveRecordings(updated);
      }
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const deleteRecording = async (uri: string) => {
    try {
      await FileSystem.deleteAsync(uri, { idempotent: true });
      const updated = recordings.filter((rec) => rec.uri !== uri);
      await saveRecordings(updated);
    } catch (err) {
      console.error("Failed to delete recording", err);
    }
  };

  return {
    recording,
    recordings,
    startRecording,
    stopRecording,
    deleteRecording,
  };
}
