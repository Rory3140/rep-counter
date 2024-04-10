import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const CustomButton = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.primary,
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        width: "95%",
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontWeight: "700",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
