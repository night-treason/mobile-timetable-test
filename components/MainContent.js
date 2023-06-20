import styled from "styled-components/native";
import * as React from "react";
import { Text, View } from "react-native";
import { SearchContext } from "../App.js";

const TableContainer = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: ${(props) => props.borderColor};
`;

const TableTime = styled.View`
  flex: 20% 1 0;
  padding: 5px 0px;
  background-color: ${(props) => props.backgroundColorLesson};
  justify-content: center;
`;

const TableLesson = styled.View`
  background-color: ${(props) => props.backgroundColorLesson};
  flex: 80% 1 0;
  border-left-width: 1px;
  border-left-color: ${(props) => props.borderColor};
`;

const Lesson = styled.View`
  border-top-color: ${(props) => props.borderColor};
  padding: 6px;
  min-height: 30px;
`;

function getTime(lessonNumber) {
  switch (lessonNumber) {
    case 1:
      return "09:00\n10:30";
    case 2:
      return "10:40\n12:10";
    case 3:
      return "12:40\n14:10";
    case 4:
      return "14:20\n15:50";
    case 5:
      return "16:00\n17:30";
  }
}

function getDayOfMonth(weekday) {
  const today = new Date();
  const weekdays = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ];
  const monthNames = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря",
  ];
  const dayOfWeekIndex = weekday;

  const currentDayOfWeekIndex = today.getDay();
  const difference = dayOfWeekIndex - currentDayOfWeekIndex;
  const targetDate = new Date(today.setDate(today.getDate() + difference));

  let dayOfMonth = targetDate.getDate();
  let monthName = monthNames[targetDate.getMonth()];

  return `${weekdays[weekday - 1]}, ${dayOfMonth} ${monthName}`;
}

function getCurrentPeriod() {
  const periods = [
    { start: 9 * 60, end: 10 * 60 + 30 },
    { start: 10 * 60 + 40, end: 12 * 60 + 10 },
    { start: 12 * 60 + 40, end: 14 * 60 + 10 },
    { start: 14 * 60 + 20, end: 15 * 60 + 50 },
    { start: 16 * 60, end: 17 * 60 + 30 },
  ];

  const now = new Date();

  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  let currentPeriod = null;

  for (let i = 0; i < periods.length; i++) {
    if (
      currentTimeInMinutes >= periods[i].start &&
      currentTimeInMinutes <= periods[i].end
    ) {
      currentPeriod = i + 1;
      break;
    }
  }

  const currentWeekday = now.getDay() === 0 ? 7 : now.getDay();

  return [currentPeriod, currentWeekday];
}

export const MainContent = (props) => {
  const [activeLesson, setActiveLesson] = React.useState(getCurrentPeriod());
  const searchValue = React.useContext(SearchContext);
  const theme = props.theme;

  React.useEffect(() => setActiveLesson(getCurrentPeriod()), []);

  const borderColor =
    theme == "light" ? "#939393" : "rgba(248, 247, 247, 0.22)";
  const backgroundColorLesson =
    theme == "light"
      ? "rgba(172, 172, 172, 0.47)"
      : "rgba(255, 255, 255, 0.05)";

  const renderItem = (item, index) => {
    return (
      <TableContainer
        borderColor={borderColor}
        style={index == 0 ? { borderTopWidth: 0 } : null}
      >
        <TableTime
          backgroundColorLesson={backgroundColorLesson}
          style={
            activeLesson[0] == item.lessonNumber &&
            activeLesson[1] == props.day && { backgroundColor: "#454548" }
          }
        >
          <Text
            style={{
              color:
                theme == "light" ? "rgba(0, 0, 0, 0.75)" : "rgb(179, 179, 179)",
              fontSize: 16,
              textAlign: "center",
            }}
          >
            {getTime(item.lessonNumber)}
          </Text>
        </TableTime>

        <TableLesson
          borderColor={borderColor}
          backgroundColorLesson={backgroundColorLesson}
        >
          <Lesson
            style={
              activeLesson[0] == item.lessonNumber &&
              activeLesson[1] == props.day && { backgroundColor: "#454548" }
            }
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
            <Text
              style={{
                color:
                  theme == "light"
                    ? "rgba(0, 0, 0, 0.75)"
                    : "rgb(179, 179, 179)",
                fontSize: 16,
                fontStyle: "italic",
              }}
            >
              {item.lecturer}
              {item.room && "\nауд. " + item.room}
            </Text>
          </Lesson>

          {item.compound && (
            <Lesson
              borderColor={borderColor}
              style={[
                { borderTopWidth: 1 },
                activeLesson[0] == item.lessonNumber &&
                  activeLesson[1] == props.day && {
                    backgroundColor: "#454548",
                  },
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
                {item.compound.name}
              </Text>
              <Text
                style={{
                  color:
                    theme == "light"
                      ? "rgba(0, 0, 0, 0.75)"
                      : "rgb(179, 179, 179)",
                  fontSize: 16,
                  fontStyle: "italic",
                }}
              >
                {item.compound.lecturer}
                {item.compound.room && "\nауд. " + item.compound.room}
              </Text>
            </Lesson>
          )}
        </TableLesson>
      </TableContainer>
    );
  };
  if (
    props.lessons.some(
      (lesson) =>
        Object.keys(lesson).some((prop) =>
          lesson[prop]
            .toString()
            .toLowerCase()
            .includes(searchValue.toString().toLowerCase())
        ) ||
        (lesson.compound
          ? Object.keys(lesson.compound).some((prop) =>
              lesson.compound[prop]
                .toString()
                .toLowerCase()
                .includes(searchValue.toString().toLowerCase())
            )
          : false)
    )
  ) {
    return (
      <View>
        <Text
          style={{
            color:
              theme == "light" ? "rgba(0, 0, 0, 0.75)" : "rgb(179, 179, 179)",
            fontSize: 16,
            fontStyle: "italic",
            marginTop: 10,
          }}
        >
          {getDayOfMonth(props.day)}
        </Text>
        <View
          style={{
            marginTop: "2%",
            width: 320,
            boxShadow: "rgba(4, 4, 4, 0.27) 0px 0px 3px 0px",
          }}
        >
          <View
            style={{
              boxShadow: "rgba(0, 0, 0, 0.35) 1px 5px 5px -4px",
            }}
          >
            {props.lessons
              .filter(
                (lesson) =>
                  Object.keys(lesson).some((prop) =>
                    lesson[prop]
                      .toString()
                      .toLowerCase()
                      .includes(searchValue.toString().toLowerCase())
                  ) ||
                  (lesson.compound
                    ? Object.keys(lesson.compound).some((prop) =>
                        lesson.compound[prop]
                          .toString()
                          .toLowerCase()
                          .includes(searchValue.toString().toLowerCase())
                      )
                    : false)
              )
              .map((lesson, index) => renderItem(lesson, index))}
          </View>
        </View>
      </View>
    );
  }
};
