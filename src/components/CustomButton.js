import React from "react";
import { Text, TouchableOpacity } from "react-native";

import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";
//I added a textColor prop, this was to change the color of the text when I changed the background color of the button
export const CustomButton = ({ label, onPress, style, textColor }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          backgroundColor: colors.primary,
          padding: 20,
          borderRadius: 10,
          margin: 10,
          width: "95%",
        },
        style,
        //This stylle was initially above this curly brace, I move it after because the
        //color i was changing using the style prop was beingh overriden by the inline after it
      ]}
    >
      <Text
        style={[
          {
            textAlign: "center",
            fontWeight: "700",
            fontSize: 16,
            color: textColor || "#fff",
            //by default it will stay white, with the prop you can acces the color
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
