import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { Image as RNImage } from "expo-image";
import { Image } from "expo-image";

export default function HomeScreen() {
    const router = useRouter();
    
    const handleLogin = () => {
        router.push("/(tabs)/today");
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo and Brand */}
        <View style={styles.logoContainer}>
          <Ionicons name="checkmark-done" size={48} color="red" />
          <Text style={styles.title}>Todo List</Text>
        </View>

        {/* Center Logo */}
        <Image 
          source={require("@/assets/images/todolist.svg")} 
          style={styles.logo} 
          contentFit="contain"
        />

        {/* Tagline */}
        <Text style={styles.tagline}>
          Organize your work and life, finally.
        </Text>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={(handleLogin)}>
            <Ionicons name="logo-apple" size={24} color="#000" />
            <Text style={styles.buttonText}>Continue with Apple</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={(handleLogin)}>
            <Ionicons name="logo-google" size={24} color="#000" />
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={(handleLogin)}>
            <Ionicons name="mail-outline" size={24} color="#000" />
            <Text style={styles.buttonText}>Continue with Email</Text>
          </TouchableOpacity>
        </View>

        {/* Legal Text */}
        <Text style={styles.legalText}>
          By continuing you agree to Todoist's{" "}
          <Text style={styles.linkText}>Terms of Service</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
    color: "red"
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10
  },
  logo: {
    width: 240,
    height: 240,
    marginTop: 20
  },
  tagline: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginHorizontal: 20,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    marginHorizontal: 20,
    marginTop: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F2F2",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#000",
  },
  legalText: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 12,
    color: "#666666"

  },
  linkText: {
    color: "#666666",
    textDecorationLine: "underline",
  },
});
