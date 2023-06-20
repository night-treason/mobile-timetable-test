import styled from "styled-components/native";
import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  timetableView: {
    display: "flex",
    backgroundColor: "rgba(102, 102, 102, 0.12)",
    width: "100%",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    justifyContent: "space-around",
    height: 120,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(248, 247, 247, 0.10)",
  },
  light_theme: {
    backgroundColor: "rgba(172, 172, 172, 0.47)",
    borderTopColor: "rgba(19, 19, 19, 0.07)",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

const TimetableList = styled.View`
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 10px 25px;
  align-items: center;
  justify-content: center;
`;

const Description = styled.Text`
  width: 60%;
  flex-grow: 2;
`;

const DescriptionTimetable = styled.Pressable`
  width: 60%;
  text-align: center;
  border: 1px solid rgba(248, 247, 247, 0.22);
`;

export const Timetables = ({ navigation, route }) => {
  const [timetableArray, setTimetableArray] = React.useState(0);
  const [timetableVisibility, setTimetableVisibility] = React.useState(0);
  const [currentTimetable, setCurrentTimetable] = React.useState("410");
  const theme = useSelector((state) => state.theme.value);

  const [isOpen, setIsOpen] = React.useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme == "light" ? "white" : "#242428",
      }}
    >
      <Pressable
        style={({ pressed }) => [
          styles.timetableView,
          theme == "light" ? styles.light_theme : null,
          { borderTopWidth: theme == "light" ? 0.5 : null },
          pressed ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null,
        ]}
        onPress={() =>
          navigation.navigate({
            name: "TimeUni",
          })
        }
      >
        <Description
          style={{
            color:
              theme == "light" ? "rgba(0, 0, 0, 0.75)" : "rgb(179, 179, 179)",
            fontSize: 20,
          }}
        >
          Расписание
          {"\n"}
          по курсу
        </Description>
        <Fontisto
          name="persons"
          size={65}
          color={theme == "light" ? "rgba(0, 0, 0, 1)" : "white"}
          style={{ opacity: theme == "light" ? 0.3 : 0.1, flexGrow: 1 }}
        />
      </Pressable>

      <Pressable
        style={[
          styles.timetableView,
          theme == "light" ? styles.light_theme : null,
        ]}
      >
        <Description
          style={{
            color:
              theme == "light" ? "rgba(0, 0, 0, 0.75)" : "rgb(179, 179, 179)",
            fontSize: 20,
          }}
        >
          Расписание
          {"\n"}
          по преподавателю
        </Description>
        <Fontisto
          name="person"
          size={65}
          color={theme == "light" ? "rgba(0, 0, 0, 1)" : "white"}
          style={{ opacity: theme == "light" ? 0.3 : 0.1, flexGrow: 1 }}
        />
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.timetableView,
          theme == "light" ? styles.light_theme : null,
          pressed ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null,
          styles.shadow,
        ]}
        onPress={() =>
          navigation.navigate({
            name: "TimeCustom",
          })
        }
      >
        <Description
          style={{
            color:
              theme == "light" ? "rgba(0, 0, 0, 0.75)" : "rgb(179, 179, 179)",
            fontSize: 20,
          }}
        >
          Расписание
          {"\n"}
          пользователя
        </Description>
        <MaterialCommunityIcons
          name="pen"
          size={65}
          color={theme == "light" ? "rgba(0, 0, 0, 1)" : "white"}
          style={{ opacity: theme == "light" ? 0.3 : 0.1, flexGrow: 1 }}
        />
      </Pressable>
    </View>
  );
};
