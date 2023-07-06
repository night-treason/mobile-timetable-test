import React from "react";
import { Modal, View, Pressable, StyleSheet } from "react-native";

const CustomChangeModal = ({ visible, onRequestClose, onSelectAction }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="none"
      transparent={true}
    >
      <Pressable style={styles.modalOverlay} onPress={() => onRequestClose()}>
        <View style={styles.modalContainer}></View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  buttonText: {
    fontSize: 14,
    color: "rgb(179, 179, 179)",
  },
  actionButton: {
    backgroundColor: "#181a1b",
    margin: 2,
  },
  modalContainer: {
    backgroundColor: "#181a1b",
    width: 250,
    padding: 15,
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.65,
    shadowRadius: 3.84,
    flexDirection: "row",
  },
  leftActionContainer: {
    flex: "30% 1 0",
  },
  rightActionContainer: {
    flex: "70% 1 0",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default CustomChangeModal;
