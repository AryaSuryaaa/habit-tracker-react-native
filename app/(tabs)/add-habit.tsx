import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];
type Frequency = (typeof FREQUENCIES)[number];

export default function AddHabitScreen() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [frequency, setFrequency] = useState<string>("daily");
  const [error, setError] = useState<string>("");

  const { user } = useAuth();
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await databases.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description,
          streak_count: 0,
          last_completed: new Date().toISOString(),
          frequency: frequency,
          created_at: new Date().toISOString(),
        }
      );

      router.back();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError("There was an error creating the habit");
    }
  };
  return (
    <View style={style.container}>
      <TextInput
        label="title"
        mode="outlined"
        style={style.input}
        onChangeText={setTitle}
      />
      <TextInput
        label="description"
        mode="outlined"
        style={style.input}
        onChangeText={setDescription}
      />
      <View style={style.freqContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => setFrequency(value as Frequency)}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
          }))}
          style={style.segmenButtons}
        />
      </View>
      <Button
        mode="contained"
        style={style.button}
        disabled={!title || !description}
        onPress={handleSubmit}
      >
        Add Habit
      </Button>

      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 16,
  },
  freqContainer: {
    marginBottom: 24,
  },
  segmenButtons: {
    marginBottom: 16,
  },
  button: {},
});
