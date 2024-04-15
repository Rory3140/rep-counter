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
  const { updateProfile, logout, userData, userTocken } =
    useContext(AuthContext);

  const [weight, setWeight] = useState(userData.weight);
  const [height, setHeight] = useState(userData.height);

  return (
    <ScreenContainer>
      <Container>
        <Text>Welcome: {userData.displayName}</Text>
        <InputField
          label={"Weight"}
          value={weight}
          onChangeText={(text) => setWeight(text)}
          keyboardType="email-address"
        />

        <InputField
          label={"Height"}
          value={height}
          onChangeText={(text) => setHeight(text)}
          keyboardType="email-address"
        />
        <CustomButton
          label={"Update"}
          onPress={() => {
            updateProfile(userTocken, height, weight);
          }}
        />
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
