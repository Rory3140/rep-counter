import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { useFonts } from "expo-font";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

import Profile from "../../assets/icons/profile";
import { Title } from "./Title";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const TitleBar = ({ showBackButton, showProfileButton = true }) => {
  const { image } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    norwester: require("../../assets/fonts/norwester.ttf"),
  });

  const navigation = useNavigation();

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backButtonWrapper}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={24}
            color={colors.darkGrey}
          />
        </TouchableOpacity>
      )}
      <Title />
      {showProfileButton && (
        <TouchableOpacity
          style={styles.profileIconWrapper}
          onPress={() => navigation.navigate("Profile")}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          ) : (
            <Profile width={50} height={50} fill={colors.darkGrey} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.white,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGrey,
    paddingTop: Platform.OS === "ios" ? 50 : 0,
    height: Platform.OS === "ios" ? 120 : 80,
  },

  backButtonWrapper: {
    position: "absolute",
    left: 20,
    top: Platform.OS === "ios" ? 75 : 30,
  },

  profileIconWrapper: {
    position: "absolute",
    right: 10,
    top: Platform.OS === "ios" ? 60 : 20,
  },
});
