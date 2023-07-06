import * as React from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";
import Accordion from "react-native-collapsible/Accordion";
import programs from "../assets/programs.json";
import { SearchContext } from "../App";
import { useSelector } from "react-redux";
import { ListModal } from "./Modal";

const styles = StyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: "rgba(228, 228, 228, 0.15)",
    borderTopWidth: 0.5,
    borderTopColor: "rgba(248, 247, 247, 0.10)",
  },
  timetableView: {
    display: "flex",
    backgroundColor: "rgba(102, 102, 102, 0.12)",
    width: "100%",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
    height: 70,
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
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
});

export const TimeUni = () => {
  const [state, setState] = React.useState({ activeSections: [] });
  const [modalVisible, setModalVisible] = React.useState(false);
  const [chosenTimetable, setChosenTimetable] = React.useState([]);
  const [chosenUni, setChosenUni] = React.useState("");
  const [chosenProgram, setChosenProgram] = React.useState("");
  const isInitialMount = React.useRef(true);
  const searchValue = React.useContext(SearchContext);
  const theme = useSelector((state) => state.theme.value);

  React.useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else if (searchValue == "") {
      setState({ activeSections: [] });
    } else {
      setState({
        activeSections: Array.from(
          { length: Object.keys(programs).length },
          (e, i) => i
        ),
      });
    }
  }, [searchValue]);

  function onClickTimetableHandler(years, uniName, programName) {
    setChosenProgram(programName);
    setChosenUni(uniName);
    setChosenTimetable(years);
    setModalVisible(true);
  }

  const renderHeader = (section) => {
    if (searchValue) {
      if (
        section.programs.some((program) =>
          program.name.toLowerCase().includes(searchValue.toLowerCase())
        )
      ) {
        return (
          <View
            style={[
              styles.timetableView,
              theme == "light" ? styles.light_theme : null,
            ]}
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
              {section.name}
            </Text>
          </View>
        );
      } else {
        return <></>;
      }
    } else {
      return (
        <View
          style={[
            styles.timetableView,
            theme == "light" ? styles.light_theme : null,
          ]}
        >
          <Text
            style={{
              color:
                theme == "light" ? "rgba(0, 0, 0, 0.75)" : "rgb(179, 179, 179)",
              fontSize: 16,
            }}
          >
            {section.name}
          </Text>
        </View>
      );
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
                onPress={() =>
                  onClickTimetableHandler(
                    program.years,
                    section.name,
                    program.name
                  )
                }
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
                  i + 1 == programs.length ? styles.shadow : null,
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
              onPress={() =>
                onClickTimetableHandler(
                  program.years,
                  section.name,
                  program.name
                )
              }
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
                i + 1 == programs.length ? styles.shadow : null,
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

  const updateSections = (activeSections) => {
    setState({ activeSections });
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme == "light" ? "white" : "#242428",
      }}
    >
      <Accordion
        sections={programs}
        activeSections={state.activeSections}
        renderHeader={renderHeader}
        renderContent={renderContent}
        onChange={updateSections}
        expandMultiple={true}
        underlayColor="rgba(0, 0, 0, 0.45)"
        containerStyle={{ marginTop: theme == "light" ? 0 : -1 }}
        duration={200}
      />
      <ListModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        years={chosenTimetable}
        uni={chosenUni}
        program={chosenProgram}
      />
    </ScrollView>
  );
};
