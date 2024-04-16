import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const CustomButton = ({ label, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        {
          backgroundColor: colors.primary,
          padding: 20,
          borderRadius: 10,
          margin: 10,
          width: "95%",
        },
      ]}
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
