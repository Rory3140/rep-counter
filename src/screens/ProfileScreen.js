import React, { useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import { ScreenContainer } from "../components/ScreenContainer";
import { Container } from "../components/Container";
import { CustomButton } from "../components/CustomButton";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const ProfileScreen = () => {
  const { logout } = useContext(AuthContext);

  return (
    <ScreenContainer>
      <CustomButton
        label={"logout"}
        onPress={() => {
          logout();
        }}
      />
    </ScreenContainer>
  );
};
