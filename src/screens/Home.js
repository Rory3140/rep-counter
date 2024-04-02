import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { colors } from "../utils/colors";
import { sizes, fontSizes } from "../utils/spacing";

export const Home = () => {
    return (
        <View style={styles.container}>
        <Text>Home</Text>
        </View>
    );
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
});