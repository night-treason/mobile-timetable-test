import React from 'react';
import { Modal, View, Pressable, Text, StyleSheet } from 'react-native';

function getTime(lessonNumber) {
  switch (lessonNumber) {
    case 1:
      return '(09:00 - 10:30)';
    case 2:
      return '(10:40 - 12:10)';
    case 3:
      return '(12:40 - 14:10)';
    case 4:
      return '(14:20 - 15:50)';
    case 5:
      return '(16:00 - 17:30)';
  }
}

const CustomPickModal = ({ visible, onRequestClose, onSelectNumber }) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={onRequestClose}
      animationType="none"
      transparent={true}>
      <Pressable style={styles.modalOverlay} onPress={() => onSelectNumber()}>
        <View style={styles.modalContainer}>
          {[1, 2, 3, 4, 5].map((number) => (
            <Pressable
              key={number}
              style={[
                styles.modalItem,
                number == 1 ? { borderTopWidth: 0 } : null,
              ]}
              onPress={() => onSelectNumber(number)}>
              <Text style={styles.buttonText}>
                <Text style={{ fontWeight: 'bold' }}>{number}</Text>{' '}
                {getTime(number)}
              </Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    width: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.65,
    shadowRadius: 3.84,
  },
  modalItem: {
    padding: 10,
    backgroundColor: '#181a1b',
    borderTopWidth: 1,
    borderTopColor: 'rgba(179, 179, 179, 0.6)',
  },
  buttonText: {
    textAlign: 'center',
    color: '#c2c2c2',
  },
});

export default CustomPickModal;
