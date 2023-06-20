import * as React from "react";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { Entypo } from "@expo/vector-icons";

const PanelContainer = styled.View`
  background-color: rgba(24, 26, 27, 1);
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TimeView = styled.Pressable`
  background-color: rgba(24, 26, 27, 1);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(200, 200, 200);
  padding-bottom: 3px;
`;

const MiddleContainer = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(200, 200, 200);
  padding-bottom: 3px;
`;

const SearchBarContainer = styled.View`
  background-color: rgba(87, 87, 87, 0.11);
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 5px;
  border-radius: 3px;
`;

const SearchInput = styled.TextInput`
  height: 100%;
  flex: 1;
  color: rgb(179, 179, 179);
`;

const styles = StyleSheet.create({
  middleTableview: {
    borderBottomWidth: 1,
  },
  middleTableview_light: {
    backgroundColor: "rgba(185, 185, 185, 0)",
    borderBottomColor: "rgba(0, 0, 0, 1)",
  },
  middleTableview_dark: {
    backgroundColor: "rgba(24, 26, 27, 1)",
    borderBottomColor: "rgb(179, 179, 179)",
  },
});

export const HeadPanelHome = ({
  visible,
  route,
  searchValue,
  setSearchValue,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const timetableId = useSelector((state) => state.timetableId.code);
  const [searchBarActive, setSearchBarActive] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const [searchLimit, setSearchLimit] = React.useState(false);
  const theme = useSelector((state) => state.theme.value);

  const toggle = () => {
    setSearchBarActive(!searchBarActive);
    setSearchValue("");
  };

  const handleTouch = () => {};

  const focusHandler = () => {
    setIsFocused(true);
  };

  const blurHandler = () => {
    setIsFocused(false);
  };

  const onChangeHandler = (text) => {
    if (text.length == 0) {
      setSearchBarActive(false);
    }
    if (text.length == 30) {
      setSearchLimit(true);
    } else {
      setSearchLimit(false);
    }
    setSearchValue(text);
  };

  const cancelPressHandler = () => {
    setSearchValue("");
    setSearchBarActive(false);
  };

  return (
    <PanelContainer
      style={{
        paddingTop: insets.top + 5,
        paddingBottom: insets.bottom + 5,
        paddingLeft: insets.left + 20,
        paddingRight: insets.right + 20,
        height: 80,
        backgroundColor:
          theme == "dark" ? "rgba(24, 26, 27, 1)" : "rgba(185, 185, 185, 0.24)",
      }}
    >
      {searchBarActive && <View style={[{ width: 180 }, { height: 40 }]} />}
      {searchBarActive && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SearchBarContainer
            style={[
              { width: 255, height: 35 },
              {
                backgroundColor:
                  theme == "dark"
                    ? "rgba(87, 87, 87, 0.11)"
                    : "rgba(204, 204, 204, 0.67)",
              },
              searchLimit
                ? {
                    borderColor: "rgba(174, 32, 32, 0.24)",
                    borderWidth: 1,
                  }
                : null,
            ]}
          >
            <SearchInput
              keyboardType="default"
              onFocus={() => focusHandler()}
              onBlur={() => blurHandler()}
              value={searchValue}
              onChangeText={(text) => onChangeHandler(text)}
              maxLength={30}
              style={{
                color: theme == "dark" ? "color: rgb(179, 179, 179)" : "black",
              }}
            />
            {searchValue && (
              <Entypo
                name="cross"
                size={24}
                color={
                  theme == "dark" ? "rgb(179, 179, 179)" : "rgba(0, 0, 0, 0.8)"
                }
                onPress={() => cancelPressHandler()}
              />
            )}
          </SearchBarContainer>
        </View>
      )}
      {!searchBarActive && (
        <View
          style={searchBarActive ? { opacity: 0, pointerEvents: "none" } : null}
        >
          <FontAwesome
            name="bars"
            size={35}
            color={
              theme == "dark" ? "rgb(179, 179, 179)" : "rgba(0, 0, 0, 0.8)"
            }
            onPress={() =>
              navigation.navigate(route[0] ? route[0] : "Settings")
            }
            style={{ display: visible[0] ? null : "none" }}
          />
        </View>
      )}

      {!searchBarActive && (
        <MiddleContainer
          style={[
            { width: 180, height: 40 },
            searchBarActive ? { opacity: 0, pointerEvents: "none" } : null,
          ]}
        >
          {visible[1] ? (
            <TimeView
              style={({ pressed }) => [
                styles.middleTableview,
                theme == "dark"
                  ? styles.middleTableview_dark
                  : styles.middleTableview_light,
                pressed ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null,
              ]}
              onPress={() =>
                navigation.navigate(route[1] ? route[1] : "Timetables")
              }
            >
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 18,
                  color:
                    theme == "dark"
                      ? "rgb(179, 179, 179)"
                      : "rgba(0, 0, 0, 0.9)",
                }}
              >
                {timetableId ? timetableId : "410"}
              </Text>
            </TimeView>
          ) : (
            <View>
              <Text
                style={{
                  color:
                    theme == "dark"
                      ? "rgb(179, 179, 179)"
                      : "rgba(0, 0, 0, 0.9)",
                  fontSize: 20,
                  marginRight: 30,
                }}
              >
                Настройки
              </Text>
            </View>
          )}
        </MiddleContainer>
      )}

      <View>
        <FontAwesome5
          name="search"
          size={27}
          color={theme == "dark" ? "rgb(179, 179, 179)" : "rgba(0, 0, 0, 0.9)"}
          onPress={() => toggle()}
          style={{ display: visible[2] ? null : "none" }}
        />
      </View>
    </PanelContainer>
  );
};
