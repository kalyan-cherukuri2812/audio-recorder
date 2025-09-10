import { View, Text } from "react-native";
import React from "react";
import ScreenWrapper from "../components/ScreenWrapper";
import { AudioList } from "../components/AudioList";

export default function ListScreen() {
  const sampleRecordings: RecordingItem[] = [
    {
      uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      createdAt: "2025-09-09 10:15:00",
    },
    {
      uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      createdAt: "2025-09-09 10:20:00",
    },
    {
      uri: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
      createdAt: "2025-09-09 10:25:00",
    },
  ];
  return (
    <ScreenWrapper>
      <AudioList
        recordings={sampleRecordings}
        onDelete={() => {}}
      />
    </ScreenWrapper>
  );
}
