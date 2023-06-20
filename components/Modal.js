import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setTimetableId } from '../store/timetableSlice.js';

export const ListModal = ({ modalVisible, setModalVisible, years, uni, program }) => {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  console.log(uni, program)

  const modalPressHandler = (code) => {
    dispatch(setTimetableId({ code: code, type: 'uni', uni: uni, program: program }));
    setModalVisible(false);
    navigation.navigate('HomeScreen');
  };

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View
            style={[
              { width: 200 },
              { backgroundColor: theme == 'light' ? 'white' : '#2c2c2f' },
              { borderColor: theme == 'light' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.18)' },
              { borderWidth: 0.5 },
            ]}>
            <View
              style={[
                styles.modalHeader,
                {
                  backgroundColor:
                    theme == 'light' ? 'rgb(191, 191, 191)' : '#181a1b',
                },
              ]}>
              <Text
                style={{
                  color:
                    theme == 'light'
                      ? 'rgba(0, 0, 0, 0.75)'
                      : 'rgb(213, 213, 213)',
                }}>
                Выберите группу
              </Text>
            </View>
            {years.map((year, i) => (
              <Pressable
                style={({ pressed }) => [
                  styles.modalItem,
                  i == 0 ? { borderTopWidth: null } : null,
                  theme == 'light' ? { backgroundColor: '#e3e3e3' } : null,
                  theme == 'light' ? { borderTopColor: '#d2d2d2' } : null,
                  pressed ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' } : null,
                ]}
                onPress={() => modalPressHandler(year.code)}>
                <Text
                  style={{
                    color:
                      theme == 'light'
                        ? 'rgba(0, 0, 0, 0.75)'
                        : 'rgb(213, 213, 213)',
                  }}>
                  {year.year} курс
                </Text>
              </Pressable>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalItem: {
    backgroundColor: '#2c2c2f',
    color: 'white',
    padding: 10,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(248, 247, 247, 0.10)',
  },
  modalHeader: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
