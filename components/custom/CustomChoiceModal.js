import React from "react";
import { Modal, View, Pressable, Text, StyleSheet } from "react-native";

const CustomPickModal = ({ visible, onRequestClose, onSelectAction }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="none"
      transparent={true}
    >
      <Pressable style={styles.modalOverlay} onPress={() => onRequestClose()}>
        <View style={styles.modalContainer}>
          <View style={styles.leftActionContainer}>
            <Pressable
              style={styles.actionButton}
              onPress={() => onRequestClose()}
            >
              <Text style={styles.buttonText}>Отмена</Text>
            </Pressable>
          </View>
          <View style={styles.rightActionContainer}>
            <Pressable
              style={styles.actionButton}
              onPress={() => onSelectAction("delete")}
            >
              <Text style={styles.buttonText}>Удалить</Text>
            </Pressable>
            <Pressable
              style={styles.actionButton}
              onPress={() => onSelectAction("change")}
            >
              <Text style={styles.buttonText}>Изменить</Text>
            </Pressable>
          </View>
        </View>
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
    justifyContent: "center",
  },
  modalContainer: {
    backgroundColor: "#181a1b",
    width: 300,
    paddingHorizontal: 15,
    height: 60,
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
    flexDirection: "row",
  },
  rightActionContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginLeft: 60,
  },
});

export default CustomPickModal;
