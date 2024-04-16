import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { InputField } from "../components/InputField";
import { CustomButton } from "../components/CustomButton";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const ProfileScreen = () => {
  const { updateProfile, logout, userInfo, userData } = useContext(AuthContext);

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  return (
    <ScreenContainer>
      <Container>
        <Text
          style={{
            fontSize: fontSizes.lg,
            color: colors.primary,
            marginBottom: sizes.md,
          }}
        >
          Profile
        </Text>
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
          <Text style={styles.text}>
            Please enter your height and weight to update your profile
          </Text>
        ) : (
          <CustomButton
            label={"Update"}
            onPress={() => {
              updateProfile(height, weight, setHeight, setWeight);
            }}
          />
        )}
      </Container>
      <CustomButton
        label={"logout"}
        onPress={() => {
          logout();
        }}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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
    textAlign: "center",
  },

  textButton: {
    color: colors.primary,
    textAlign: "center",
    fontSize: fontSizes.md,
    margin: 10,
  },
});
