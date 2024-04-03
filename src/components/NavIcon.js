import React from "react";
import { SvgXml } from "react-native-svg";

export const NavIcon = ({ svg, color }) => {
  return (
    <SvgXml xml={svg} width={60} height={60} fill={color} stroke={color} />
  );
};
