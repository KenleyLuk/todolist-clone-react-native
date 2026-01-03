import { useRouter } from "expo-router";
import HomeScreen from "./HomeScreen";

export default function App() {
  const router = useRouter();
  
  // 如果已經登入，可以直接導航到 tabs
  // 這裡暫時保留 HomeScreen，登入後導航到 /(tabs)/today
  
  return <HomeScreen />;
}