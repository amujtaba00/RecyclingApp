import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "../components/homeScreen/homeScreen";
import OCRCamera from "../components/camera/camera";
import Product from "../components/product/productView";

import Barcode from "../components/camera/barcode";
const screens = {
  Home: {
    screen: Home,
  },
  OCR: {
    screen: OCRCamera,
  },
  Barcode: {
    screen: Barcode,
  },
  ProductView: {
    screen: Product,
  },
};
const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
