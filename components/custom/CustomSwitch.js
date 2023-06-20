import React, { useState, useRef } from "react";
import { Text, View, Pressable, StyleSheet, Animated } from "react-native";

const SquareSwitch = ({ value, onValueChange }) => {
  const thumbPosition = new Animated.Value(value == 2 ? 20 : 0);

  const handlePress = () => {
    onValueChange(value == 2 ? 1 : 2);
    Animated.timing(thumbPosition, {
      toValue: value == 2 ? 0 : 20,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const switchStyle = value == 2 ? styles.switchOn : styles.switchOff;

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.switchContainer, switchStyle]}
    >
      <Animated.View
        style={[styles.switchThumb, { marginLeft: thumbPosition }]}
      >
        <Text style={{ color: "rgb(204, 204, 204)" }}>
          {value == 2 ? "Чет" : "Нечет"}
        </Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    height: 45,
    width: 100,
    justifyContent: "center",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  switchOn: {
    backgroundColor: "gray",
  },
  switchOff: {
    backgroundColor: "gray",
  },
  switchThumb: {
    height: 45,
    width: 80,
    backgroundColor: "#242428",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SquareSwitch;
