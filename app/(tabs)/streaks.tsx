import { useAuth } from "@/lib/auth-context";
import { Text, View } from "react-native";

export default function StreaksScreen() {
  const { signOut } = useAuth();
  return (
    <View>
      <Text>Hallo Login</Text>
    </View>
  );
}
