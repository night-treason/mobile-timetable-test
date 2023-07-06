import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import SquareSwitch from "./custom/CustomSwitch";
import CustomPickModal from "./custom/CustomPickModal";
import CustomChoiceModal from "./custom/CustomChoiceModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SECTIONS = [
  {
    day: "Понедельник",
    lessons: [],
  },
  {
    day: "Вторник",
    lessons: [],
  },
  {
    day: "Среда",
    lessons: [],
  },
  {
    day: "Четверг",
    lessons: [],
  },
  {
    day: "Пятница",
    lessons: [],
  },
  {
    day: "Суббота",
    lessons: [],
  },
];

const lookup = {
  Понедельник: 1,
  Вторник: 2,
  Среда: 3,
  Четверг: 4,
  Пятница: 5,
  Суббота: 6,
};

function updateWeekdays(arr) {
  return arr.map((obj) => ({
    ...obj,
    day: lookup[obj.day],
  }));
}

const getTime = (lessonNumber) => {
  switch (lessonNumber) {
    case 1:
      return "09:00 - 10:30";
    case 2:
      return "10:40 - 12:10";
    case 3:
      return "12:40 - 14:10";
    case 4:
      return "14:20 - 15:50";
    case 5:
      return "16:00 - 17:30";
  }
};

export const TimetableCreator = ({ navigation, route }) => {
  const [weekday, setWeekday] = useState("");
  const [lessonNumber, setLessonNumber] = useState(1);
  const [timetableName, setTimetableName] = useState("");
  const [weekNumber, setWeekNumber] = useState(1);
  const [name, setName] = useState("");
  const [lecturer, setlecturer] = useState("");
  const [room, setroom] = useState("");
  const [activeSections, setActiveSections] = useState([0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTimetableIndex, setSelectedTimetableIndex] = useState(0);
  const [weekdays, setWeekdays] = useState(
    SECTIONS.map((section) => ({
      day: section.day,
      lessons: [],
    }))
  );
  const [editingTimetable, setEditingTimetable] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [refreshKey, setRefreshKey] = React.useState(0);

  const propTimetable = route.params?.timetable;

  const handleLongPress = (index) => {
    setSelectedTimetableIndex(index);
    setShowAlert(true);
  };

  const handlePopupOptionSelect = (option) => {
    if (option === "delete") {
      setWeekdays((prevWeekdays) => {
        const updatedWeekdays = [...prevWeekdays];
        updatedWeekdays[activeSections[0]].lessons.splice(
          selectedTimetableIndex,
          1
        );
        return updatedWeekdays;
      });
    } else if (option === "change") {
      setEditingTimetable(selectedTimetableIndex);
    }
    setShowAlert(false);
  };

  const saveTimetable = (weekday) => {
    setWeekdays((prevWeekdays) => {
      const updatedWeekdays = [...prevWeekdays];
      updatedWeekdays[activeSections[0]].lessons.splice(editingTimetable, 1, {
        lessonNumber,
        weekNumber,
        name,
        lecturer,
        room,
      });
      return updatedWeekdays;
    });
    setEditingTimetable(null);
    setWeekday("");
    setLessonNumber(1);
    setWeekNumber(1);
    setName("");
    setlecturer("");
    setroom("");
  };

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const accordionChangeHandler = (activeSections) => {
    setWeekday("");
    setLessonNumber(1);
    setWeekNumber(1);
    setName("");
    setlecturer("");
    setroom("");
    setActiveSections(activeSections);
  };
  const handleNumberSelect = (number) => {
    if (number !== undefined) {
      setLessonNumber(number);
    }
    handleModal();
  };

  const renderContent = (section, index, isActive) => {
    return (
      <View
        style={{
          backgroundColor: isActive ? "#2c2c2f" : null,
          padding: 10,
        }}
      >
        {section.lessons.map((timetable, index) =>
          editingTimetable === index ? (
            renderInputFields(section.day)
          ) : (
            <Pressable key={index} onPress={() => handleLongPress(index)}>
              <View key={index} style={styles.timetableContainer}>
                <View
                  key={index}
                  style={[
                    styles.lessonContainer,
                    index == 0 ? { borderTopWidth: 0 } : null,
                  ]}
                >
                  <View style={styles.timetableContainer}>
                    <Text
                      style={{
                        height: 35,
                        color: "rgba(179, 179, 179, 0.9)",
                        fontSize: 16,
                      }}
                    >
                      Время:{" "}
                      <Text style={{ color: "rgb(206, 206, 206)" }}>
                        {getTime(timetable.lessonNumber)}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        height: 35,
                        color: "rgba(179, 179, 179, 0.9)",
                        fontSize: 16,
                      }}
                    >
                      Неделя:{" "}
                      <Text style={{ color: "rgb(206, 206, 206)" }}>
                        {timetable.weekNumber == 1 ? "Нечетная" : "Четная"}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        height: 35,
                        color: "rgba(179, 179, 179, 0.9)",
                        fontSize: 16,
                      }}
                    >
                      Аудитория:{" "}
                      <Text style={{ color: "rgb(206, 206, 206)" }}>
                        {timetable.room}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        height: 35,
                        color: "rgba(179, 179, 179, 0.9)",
                        fontSize: 16,
                      }}
                    >
                      Название:{" "}
                      <Text style={{ color: "rgb(206, 206, 206)" }}>
                        {timetable.name}
                      </Text>
                    </Text>
                    <Text
                      style={{
                        height: 35,
                        color: "rgba(179, 179, 179, 0.9)",
                        fontSize: 16,
                      }}
                    >
                      Преподаватель:{" "}
                      <Text style={{ color: "rgb(206, 206, 206)" }}>
                        {timetable.lecturer}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </Pressable>
          )
        )}
        {isActive &&
          editingTimetable === null &&
          renderInputFields(section.day)}
      </View>
    );
  };

  const addTimetable = (weekday) => {
    const newTimetable = {
      lessonNumber,
      weekNumber,
      name,
      lecturer,
      room,
    };

    const selectedWeekdayIndex = SECTIONS.findIndex(
      (section) => section.day === weekday
    );

    if (selectedWeekdayIndex !== -1) {
      const existingTimetable = weekdays[selectedWeekdayIndex].lessons.find(
        (lesson) =>
          lesson.lessonNumber === lessonNumber &&
          lesson.weekNumber === weekNumber
      );

      if (existingTimetable) {
        ToastAndroid.show(
          "Занятие на это время уже существует!",
          ToastAndroid.SHORT
        );
      } else {
        setWeekdays((prevWeekdays) => {
          const updatedWeekdays = [...prevWeekdays];

          updatedWeekdays[selectedWeekdayIndex] = {
            ...updatedWeekdays[selectedWeekdayIndex],
            lessons: [
              ...updatedWeekdays[selectedWeekdayIndex].lessons,
              newTimetable,
            ],
          };
          return updatedWeekdays;
        });
      }
    }

    setWeekday("");
    setLessonNumber(1);
    setWeekNumber(1);
    setName("");
    setlecturer("");
    setroom("");
  };

  const storeTimetable = async (timetableName, weekdays, propTimetable) => {
    if (timetableName !== "") {
      const weekdaysUpdate = updateWeekdays(weekdays);
      const newTimetable = { name: timetableName, weekdays: weekdaysUpdate };

      try {
        const existingTimetablesJSON = await AsyncStorage.getItem("custom");
        let existingTimetables = [];
        if (existingTimetablesJSON !== null) {
          existingTimetables = JSON.parse(existingTimetablesJSON);
        }

        if (propTimetable !== undefined) {
          const timetableIndex = existingTimetables.findIndex(
            (timetable) => timetable.name === propTimetable
          );

          if (timetableIndex !== -1) {
            existingTimetables[timetableIndex] = newTimetable;
          }
        } else {
          const alreadyExists = existingTimetables.some(
            (timetable) => timetable.name === timetableName
          );

          if (alreadyExists) {
            ToastAndroid.show(
              "Расписание с таким названием уже существует!",
              ToastAndroid.SHORT
            );
          } else {
            existingTimetables.push(newTimetable);
          }
        }
        await AsyncStorage.setItem(
          "custom",
          JSON.stringify(existingTimetables)
        );
      } catch (error) {
        console.error("Error storing newTimetable:", error);
      }
    } else {
      ToastAndroid.show(
        "Название расписания не может быть пустым!",
        ToastAndroid.SHORT
      );
    }
  };

  const done = () => {
    storeTimetable(timetableName, weekdays, propTimetable);
    navigation.navigate("TimeCustom");
  };

  const renderInputFields = (weekday) => {
    return (
      <View style={[styles.timetableContainer, { marginTop: 10 }]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Pressable
            style={[
              styles.input,
              { justifyContent: "center" },
              { width: "20%" },
              { height: 45 },
            ]}
            onPress={handleModal}
          >
            <Text
              style={{
                color: "rgb(204, 204, 204)",
                textAlign: "center",
                fontSize: 16,
              }}
            >
              {lessonNumber || 1}
            </Text>
          </Pressable>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <SquareSwitch value={weekNumber} onValueChange={setWeekNumber} />
          </View>
          <TextInput
            style={[styles.input, { height: 45 }, { width: 80 }]}
            value={room}
            onChangeText={setroom}
            maxLength={4}
            placeholder={"Ауд..."}
            placeholderTextColor="rgba(179, 179, 179, 0.5)"
          />
        </View>
        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          value={name}
          onChangeText={setName}
          maxLength={40}
          placeholder={"Название..."}
          placeholderTextColor="rgba(179, 179, 179, 0.5)"
        />
        <TextInput
          style={[styles.input, { marginTop: 10 }]}
          value={lecturer}
          onChangeText={setlecturer}
          maxLength={40}
          placeholder={"Преподаватель..."}
          placeholderTextColor="rgba(179, 179, 179, 0.5)"
        />
        {editingTimetable == null && (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { marginTop: 10 },
              pressed ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null,
            ]}
            onPress={() => addTimetable(weekday)}
          >
            <Text style={styles.buttonText}>Добавить</Text>
          </Pressable>
        )}
        {editingTimetable !== null && (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { marginTop: 10 },
              pressed ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null,
            ]}
            onPress={() => saveTimetable(weekday)}
          >
            <Text style={styles.buttonText}>Сохранить</Text>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: "#242428" }}>
        <TextInput
          style={styles.input}
          value={timetableName}
          onChangeText={setTimetableName}
          placeholder="Название расписания..."
          placeholderTextColor="rgba(179, 179, 179, 0.5)"
          maxLength={40}
        />
        <Accordion
          sections={weekdays}
          activeSections={activeSections}
          renderHeader={(section, index, isActive) => (
            <Text
              style={{
                borderTopWidth: 1,
                borderTopColor: "#3A3A3A",
                backgroundColor: isActive ? "#3A3A3A" : "#2c2c2f",
                color: "rgb(204, 204, 204)",
                paddingHorizontal: 15,
                paddingVertical: 10,
                fontSize: 16,
              }}
            >
              {section.day}
            </Text>
          )}
          renderContent={renderContent}
          onChange={accordionChangeHandler}
        />
        {propTimetable ? (
          <Pressable
            style={[
              styles.button,
              { backgroundColor: "rgba(24, 26, 27, 0.4)" },
            ]}
            onPress={done}
          >
            <Text style={styles.buttonText}>Сохранить</Text>
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [
              styles.button,
              { backgroundColor: "rgba(24, 26, 27, 0.4)" },
              pressed ? { backgroundColor: "rgba(0, 0, 0, 0.2)" } : null,
            ]}
            onPress={done}
          >
            <Text style={styles.buttonText}>Готово</Text>
          </Pressable>
        )}
      </ScrollView>

      <CustomChoiceModal
        visible={showAlert}
        onRequestClose={() => setShowAlert(!showAlert)}
        onSelectAction={handlePopupOptionSelect}
      />

      <CustomPickModal
        visible={isModalVisible}
        onRequestClose={handleModal}
        onSelectNumber={handleNumberSelect}
      />
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgb(36, 36, 40)",
    color: "rgba(179, 179, 179, 1)",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
  },
  button: {
    backgroundColor: "#3A3A3A",
    padding: 8,
    alignItems: "center",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonText: {
    color: "rgb(179, 179, 179)",
    fontSize: 16,
  },
  lessonContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderTopWidth: 1,
    borderTopColor: "rgba(206, 206, 206, 0.8)",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 1,
  },
});
