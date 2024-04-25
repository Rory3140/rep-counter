import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

import Profile from "../../assets/icons/profile";
import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { Button } from "../components/Button";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const ProfileScreen = () => {
  const { updateProfile, logout, userInfo, userData, image, setImage } =
    useContext(AuthContext);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScreenContainer isScrollable>
      <View style={styles.profilePictureWrapper}>
        <TouchableOpacity
          style={styles.profilePictureContainer}
          onPress={pickImage}
        >
          {userData.photoURL || image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150, borderRadius: 75 }}
            />
          ) : (
            <Profile width={150} height={150} fill={colors.darkGrey} />
          )}
          <View style={styles.editProfileIcon}>
            <MaterialIcons name="edit" size={30} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View>
      <Container>
        <Container>
          <Text style={styles.text}>Display Name: {userData.displayName}</Text>
          <Text style={styles.text}>Email: {userInfo.user.email}</Text>
        </Container>
        <Container style={styles.textbox}>
          <Text style={styles.text}>Weight: {userData.weight}</Text>
          <TextInput
            style={styles.textInput}
            value={weight}
            onChangeText={(text) => setWeight(text)}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholder="Change Weight"
            maxLength={3}
          />
        </Container>

        <Container style={styles.textbox}>
          <Text style={styles.text}>Height: {userData.height}</Text>
          <TextInput
            style={styles.textInput}
            value={height}
            onChangeText={(text) => setHeight(text)}
            keyboardType="number-pad"
            returnKeyType="done"
            placeholder="Change Height"
            maxLength={3}
          />
        </Container>

        {height === "" && weight === "" ? (
          <View style={styles.textbox}>
            <Text style={styles.text}>
              Please enter your height and weight to update your profile
            </Text>
          </View>
        ) : (
          <Button
            label={"Update"}
            onPress={() => {
              const data = {
                height: height === "" ? userData.height : height,
                weight: weight === "" ? userData.weight : weight,
              };
              updateProfile(data, setHeight, setWeight);
            }}
          />
        )}
      </Container>
      <Button
        label={"logout"}
        onPress={() => {
          logout();
        }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  profilePictureWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 200,
  },

  profilePictureContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.lightGrey,
  },

  editProfileIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 20,
    width: 40,
    height: 40,
  },

  text: {
    fontSize: fontSizes.md,
    color: colors.black,
    marginLeft: 10,
    marginRight: 10,
  },

  textbox: {
    display: "flex",
    flexDirection: "row",
    boarderwidth: 1,
    width: "98%",
    height: 50,
    margin: 5,
    marginBottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
  },

  textInput: {
    height: 40,
    width: 150,
    margin: 10,
    padding: 10,
  },

  textButton: {
    color: colors.primary,
    textAlign: "center",
    fontSize: fontSizes.md,
    margin: 10,
  },
});
