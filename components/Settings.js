import * as React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Checkbox from 'expo-checkbox';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../store/themeSlice.js';

const styles = StyleSheet.create({
  settingView: {
    display: 'flex',
    backgroundColor: 'rgba(102, 102, 102, 0.12)',
    width: '100%',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(248, 247, 247, 0.10)',
  },
  light_theme: {
    backgroundColor: 'rgba(172, 172, 172, 0.47)',
    borderTopColor: 'rgba(19, 19, 19, 0.07)',
  },
});

export const Settings = (props) => {
  const [isPushDisabled, setPushDisabled] = React.useState(false);
  const [isLightTheme, setLightTheme] = React.useState(false);
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();

  const handleCheckboxTheme = () => {
    dispatch(changeTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme == 'light' ? 'white' : '#242428',
      }}>
      <Pressable
        style={({ pressed }) => [
          styles.settingView,
          theme == 'light' ? styles.light_theme : null,
          { borderTopWidth: theme == 'light' ? 0.5 : null },
          pressed ? { backgroundColor: 'rgba(0, 0, 0, 0.2)' } : null,
        ]}>
        <Text
          style={{
            color:
              theme == 'light' ? 'rgba(0, 0, 0, 0.75)' : 'rgb(179, 179, 179)',
            fontSize: 16,
          }}>
          О программе
        </Text>
      </Pressable>
      <Pressable
        style={[
          styles.settingView,
          theme == 'light' ? styles.light_theme : null,
        ]}>
        <Text
          style={{
            color:
              theme == 'light' ? 'rgba(0, 0, 0, 0.75)' : 'rgb(179, 179, 179)',
            fontSize: 16,
          }}>
          Отключить уведомления
        </Text>
        <Checkbox
          value={isPushDisabled}
          onValueChange={setPushDisabled}
          color={isPushDisabled ? (theme == 'light' ? 'gray' : 'rgb(24, 26, 27)') : undefined}
          style={{ width: 25, height: 25, marginRight: 30 }}
        />
      </Pressable>
      <Pressable
        style={[
          styles.settingView,
          theme == 'light' ? styles.light_theme : null,
        ]} onPress={handleCheckboxTheme}>
        <Text
          style={{
            color:
              theme == 'light' ? 'rgba(0, 0, 0, 0.75)' : 'rgb(179, 179, 179)',
            fontSize: 16,
          }}>
          Темная тема
        </Text>
        <Checkbox
          value={theme == 'light' ? false : true}
          onValueChange={handleCheckboxTheme}
          color={theme === 'dark' ? 'rgb(24, 26, 27)' : undefined}
          style={{ width: 25, height: 25, marginRight: 30 }}
        />
      </Pressable>
    </View>
  );
};
