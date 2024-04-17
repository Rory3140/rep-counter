import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/sizes";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export const Button = ({
  label,
  onPress,
  style,
  textColor,
  isVis = false,
  flexDirection,
}) => {
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
      <View
        style={[styles.arrow, { flexDirection: flexDirection || "column" }]}
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

        {isVis && (
          <MaterialIcons name="arrow-forward-ios" size={22} color="black" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrow: {
    display: "flex",
    justifyContent: "space-between",
    width: "98%",
  },
});
