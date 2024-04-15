import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

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
        <Text style={styles.text}>Welcome: {userData.displayName}</Text>
        <Text style={styles.text}>Email: {userInfo.user.email}</Text>
        <Text style={styles.text}>Weight: {userData.weight}</Text>
        <InputField
          label={"Weight"}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="numeric"
        />
        <Text style={styles.text}>Height: {userData.height}</Text>
        <InputField
          label={"Height"}
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="numeric"
        />

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
    marginBottom: sizes.md,
  },
});
