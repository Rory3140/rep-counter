import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";

export const Button = ({ label, onPress, style, textColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.primary,
          padding: sizes.md,
          borderRadius: sizes.sm,
          margin: sizes.sm,
          width: "95%",
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            textAlign: "center",
            fontWeight: "bold",
            fontSize: fontSizes.md,
            color: textColor || colors.white,
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
