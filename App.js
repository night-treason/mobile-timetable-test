import * as React from "react";
import { StatusBar, View, ScrollView } from "react-native";
import { HeadPanelHome } from "./components/HeadPanel";
import { MainContent } from "./components/MainContent";
import { Timetables } from "./components/Timetables";
import { TimeUni } from "./components/TimeUni";
import { Settings } from "./components/Settings";
import { TimeCustom } from "./components/TimeCustom";
import { TimetableCreator } from "./components/CustomTimetable";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./store";
import { useSelector } from "react-redux";
import programs from "./assets/programs.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const addCompound = (input) => {
  input.weekdays.forEach((dayObj) => {
    dayObj.lessons.forEach((lessonObj, index) => {
      if ("weekNumber" in lessonObj && "lessonNumber" in lessonObj) {
        if (lessonObj.weekNumber === 2) {
          const foundIndex = dayObj.lessons.findIndex(
            (item) =>
              item.lessonNumber === lessonObj.lessonNumber &&
              item.weekNumber !== 2
          );
          if (foundIndex !== -1) {
            dayObj.lessons[foundIndex].compound = lessonObj;
            dayObj.lessons.splice(index, 1);
          }
        }
      } else {
        return input;
      }
    });
  });
  return input;
};

function HomeScreen({ navigation, route }) {
  const [data, setData] = React.useState({});
  const theme = useSelector((state) => state.theme.value);
  const timetableCode = useSelector((state) => state.timetableId.code);
  const timetableType = useSelector((state) => state.timetableId.type);
  const timetableUni = useSelector((state) => state.timetableId.uni);
  const timetableProgram = useSelector((state) => state.timetableId.program);

  const getAsync = async (timetableCode) => {
    try {
      const dataJSON = await AsyncStorage.getItem("custom");
      const dataArray = dataJSON ? JSON.parse(dataJSON) : [];
      const foundObject = dataArray.find((item) => item.name === timetableCode);
      return foundObject;
    } catch (error) {
      console.error("Error: ", error);
      return null;
    }
  };

  React.useEffect(() => {
    if (timetableType == "custom") {
      getAsync(timetableCode).then((res) => {
        setData(addCompound(res));
      });
    } else if (timetableType == "uni") {
      const uni = programs.find((uni) => uni.name === timetableUni);
      const program = uni.programs.find(
        (program) => program.name === timetableProgram
      );
      const year = program.years.find((year) => year.code === timetableCode);
      setData(year);
    }
  }, [timetableCode]);

  return (
    <View style={{ backgroundColor: "black", minHeight: "100%" }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: theme == "light" ? "white" : "#242428",
          paddingBottom: 20,
          borderTopWidth: theme == "light" ? 0.5 : null,
          borderTopColor: theme == "light" ? "rgb(213, 211, 211)" : null,
        }}
      >
        {data.weekdays &&
          data.weekdays.map((timetable) => (
            <MainContent {...timetable} theme={theme}></MainContent>
          ))}
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </View>
  );
}

export const SearchContext = React.createContext();
let persistor = persistStore(store);
const Stack = createNativeStackNavigator();

export default function App() {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <SafeAreaProvider style={{ backgroundColor: "#242428" }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SearchContext.Provider value={searchValue}>
            <NavigationContainer>
              <StatusBar />
              <Stack.Navigator>
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options={{
                    header: () => (
                      <HeadPanelHome
                        visible={[1, 1, 1]}
                        route={["Settings", 0, 0]}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="Settings"
                  component={Settings}
                  options={{
                    header: () => (
                      <HeadPanelHome
                        visible={[1, 0, 0]}
                        route={["HomeScreen", 0, 0]}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="Timetables"
                  component={Timetables}
                  options={{
                    header: () => (
                      <HeadPanelHome
                        visible={[1, 1, 1]}
                        route={["Settings", "HomeScreen", 0]}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="TimeUni"
                  component={TimeUni}
                  options={{
                    header: () => (
                      <HeadPanelHome
                        visible={[1, 1, 1]}
                        route={["Settings", "HomeScreen", 0]}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="TimetableCreator"
                  component={TimetableCreator}
                  options={{
                    header: () => (
                      <HeadPanelHome
                        visible={[1, 1, 1]}
                        route={["Settings", "HomeScreen", 0]}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                      />
                    ),
                  }}
                />
                <Stack.Screen
                  name="TimeCustom"
                  component={TimeCustom}
                  options={{
                    header: () => (
                      <HeadPanelHome
                        visible={[1, 1, 1]}
                        route={["Settings", "HomeScreen", 0]}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                      />
                    ),
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SearchContext.Provider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
