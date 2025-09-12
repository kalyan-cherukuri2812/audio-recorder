import { useCallback, useEffect, useState } from "react";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Vibration } from "react-native";

export type RecordingItem = {
  uri: string;
  createdAt: string;
  title: string;
};

const STORAGE_KEY = "recordings";
export function useAudioRecorder() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [recordings, setRecordings] = useState<RecordingItem[]>([]);

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
      Vibration.vibrate(200);
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
      Vibration.vibrate(200);
      await recording.stopAndUnloadAsync();
      const sourceUri = recording.getURI();
      setRecording(null);

      if (sourceUri) {
        const fileName = `unlox_recording_${Date.now()}.mp3`;
        const newPath = FileSystem.documentDirectory + fileName;
        await FileSystem.moveAsync({ from: sourceUri, to: newPath });
        const now = new Date();
        const timestamp = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        const newRecord = { uri: newPath, createdAt: new Date().toLocaleString(), title: `Recording ${timestamp}` };
        const updated = [newRecord, ...recordings];
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

  const loadRecordings = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setRecordings(JSON.parse(data));
      } else {
        setRecordings([]);
      }
    } catch (err) {
      console.error("Failed to load recordings", err);
    }
  }, []);

  useEffect(() => {
    loadRecordings();
  }, [loadRecordings]);

  return {
    recording,
    recordings,
    startRecording,
    stopRecording,
    deleteRecording,
    loadRecordings,
  };
}
