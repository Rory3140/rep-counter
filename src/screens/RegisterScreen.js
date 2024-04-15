import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

import { CustomButton } from "../components/CustomButton";
import { InputField } from "../components/InputField";
import { Loading } from "../components/Loading";
import { AuthContext } from "../context/AuthContext";

import { colors } from "../utils/colors";

export const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, justifyContent: "center" }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: "#333",
            marginBottom: 30,
          }}
        >
          Register
        </Text>

        <InputField
          label={"Email"}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
        />

        <InputField
          label={"Display Name"}
          icon={
            <MaterialIcons
              name="person-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={displayName}
          onChangeText={(text) => setDisplayName(text)}
          keyboardType="email-address"
        />

        <InputField
          label={"Password"}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={password}
          onChangeText={(text) => setPassword(text)}
          inputType="password"
        />

        <InputField
          label={"Confirm Password"}
          icon={
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          inputType="password"
        />

        <CustomButton
          label={"Sign Up"}
          onPress={() => {
            if (password !== confirmPassword) {
              alert("Passwords do not match");
              setPassword("");
              setConfirmPassword("");
              return;
            } else {
              signup(
                email,
                displayName,
                password,
                setPassword,
                setConfirmPassword
              );
            }
          }}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
