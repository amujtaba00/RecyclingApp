import { registerRootComponent } from "expo";
import { AppRegistry, Platform } from "react-native";
import { name as appName } from "./app.json";
import App from "./App";
import HomeScreen from "./components/homeScreen/homeScreen";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
if (Platform.OS == "android") {
  AppRegistry.registerComponent("main", () => App);
} else {
  AppRegistry.registerComponent("main", () => App);
}
