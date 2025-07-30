import { useAuth } from "@/lib/auth-context";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function AccountScreen() {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Hallo Login</Text>
      <Button onPress={signOut} icon={"logout"}>
        Sign Out
      </Button>
    </View>
  );
}
