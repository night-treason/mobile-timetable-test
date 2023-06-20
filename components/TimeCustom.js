import * as React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import { SearchContext } from "../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import CustomChoiceModal from "./custom/CustomChoiceModal";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setTimetableId } from "../store/timetableSlice";

const fetchData = async () => {
  try {
    const data = await AsyncStorage.getItem("custom");
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

export const TimeCustom = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [chosenTimetable, setChosenTimetable] = React.useState([]);
  const isInitialMount = React.useRef(true);
  const searchValue = React.useContext(SearchContext);
  const theme = useSelector((state) => state.theme.value);
  const [data, setData] = React.useState([]);
  const [showAlert, setShowAlert] = React.useState(false);
  const [selectedCustomTimetable, setSelectedCustomTimetable] =
    React.useState("");
  const [refreshKey, setRefreshKey] = React.useState(0);
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      fetchData().then((fetchedData) => setData(fetchedData));
    }, [data])
  );

  const onClickTimetableHandler = (years) => {
    setChosenTimetable(years);
    setModalVisible(true);
  };

  const handlePopupOptionSelect = (option) => {
    if (option === "delete") {
      removeElementById(selectedCustomTimetable);
    } else if (option === "change") {
      navigation.navigate("TimetableCreator", {
        timetable: selectedCustomTimetable,
      });
    }
    setShowAlert(false);
    setSelectedCustomTimetable("");
  };

  const handleLongPress = (name) => {
    setSelectedCustomTimetable(name);
    setShowAlert(true);
  };

  const handlePress = (name) => {
    dispatch(setTimetableId({ code: name, type: "custom" }));
    navigation.navigate("HomeScreen");
  };

  const removeElementById = async (nameToRemove) => {
    try {
      const dataJSON = await AsyncStorage.getItem("custom");
      const dataArray = JSON.parse(dataJSON);

      const updatedArray = dataArray.filter(
        (item) => item.name !== nameToRemove
      );

      await AsyncStorage.setItem(
        "custom",
        JSON.stringify(updatedArray)
      ).setRefreshKey(refreshKey + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const renderContent = (section) => {
    if (searchValue) {
      return (
        <View>
          {section.programs
            .filter((program) =>
              program.name.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((program, i) => (
              <Pressable
                onPress={() => onClickTimetableHandler(program.years)}
                style={({ pressed }) => [
                  styles.content,
                  i == 0 ? { borderTopWidth: null } : null,
                  theme == "light"
                    ? {
                        borderTopColor: "rgba(19, 19, 19, 0.1)",
                        backgroundColor: "rgba(217, 217, 217, 0.72)",
                      }
                    : null,
                  pressed ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null,
                ]}
              >
                <Text
                  style={{
                    color:
                      theme == "light"
                        ? "rgba(0, 0, 0, 0.75)"
                        : "rgb(179, 179, 179)",
                  }}
                >
                  {program.name}
                </Text>
              </Pressable>
            ))}
        </View>
      );
    } else {
      return (
        <View>
          {section.programs.map((program, i) => (
            <Pressable
              onPress={() => onClickTimetableHandler(program.years)}
              style={({ pressed }) => [
                styles.content,
                i == 0 ? { borderTopWidth: null } : null,
                theme == "light"
                  ? {
                      borderTopColor: "rgba(19, 19, 19, 0.1)",
                      backgroundColor: "rgba(217, 217, 217, 0.72)",
                    }
                  : null,
                pressed ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null,
              ]}
            >
              <Text
                style={{
                  color:
                    theme == "light"
                      ? "rgba(0, 0, 0, 0.75)"
                      : "rgb(179, 179, 179)",
                }}
              >
                {program.name}
              </Text>
            </Pressable>
          ))}
        </View>
      );
    }
  };

  return (
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme == "light" ? "white" : "#242428",
        }}
      >
        {data.map((item, index) => (
          <Pressable
            key={index}
            style={[
              styles.content,
              index == 0 ? { borderTopWidth: 0 } : null,
              index + 1 == data.length ? styles.shadow : null,
            ]}
            onLongPress={() => handleLongPress(item.name)}
            onPress={() => handlePress(item.name)}
          >
            <Text
              style={{
                color:
                  theme == "light"
                    ? "rgba(0, 0, 0, 0.75)"
                    : "rgb(179, 179, 179)",
                fontSize: 16,
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
        <View style={{ flex: 1, alignItems: "center", marginTop: 15 }}>
          <Pressable
            onPress={() =>
              navigation.navigate({
                name: "TimetableCreator",
              })
            }
            style={styles.addButton}
          >
            <AntDesign name="plus" size={25} color="rgb(210, 208, 208)" />
          </Pressable>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>

      <CustomChoiceModal
        visible={showAlert}
        onRequestClose={() => setShowAlert(!showAlert)}
        onSelectAction={handlePopupOptionSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: "rgba(228, 228, 228, 0.04)",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(248, 247, 247, 0.10)",
  },
  addButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: "rgba(49, 49, 49, 0.3)",
    borderColor: "rgba(58, 57, 57, 0.3)",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
});
