import React from "react";
import { View, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";

export const NavIcon = ({ svg, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <SvgXml xml={svg} width={60} height={60} fill={color} stroke={color} />
    </TouchableOpacity>
  );
};
