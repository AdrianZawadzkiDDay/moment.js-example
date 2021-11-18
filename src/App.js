import React from "react";
import "./styles.css";
import moment from "moment";

class App extends React.Component {
  state = {
    selectedDate: "09/22/2019"
  };

  render() {
    return (
      <div className="App">
        <h1>Hello jQuery UI + momentJs!</h1>
        <h2>
          {this.state.selectedDate
            ? this.state.selectedDate
            : "Please select date"}
        </h2>
        <DatePicker
          initialDate={this.state.selectedDate}
          onDateChange={(date) => this.setState({ selectedDate: date })}
        />
        {this.state.selectedDate ? (
          <DateDetails date={this.state.selectedDate} format="MM/DD/YYYY" />
        ) : null}
      </div>
    );
  }
}

function DateDetails({ date, format }) {
  const theDate = moment(date, format);
  const now = moment().hour(0).minute(0).seconds(0);
  const nextValentines = moment([theDate.year(), 1, 14]);
  if (theDate.isSameOrAfter(nextValentines)) {
    nextValentines.add(1, "year");
  }

  const summerStart = theDate
    .clone()
    .startOf("year")
    .add(5, "months")
    .add(20, "days");

  const summerEnd = moment(summerStart).months(8).date(23);

  const programmersDay = moment(theDate).startOf("year").dayOfYear(256);

  const nextFridayDate = moment(theDate);

  //  if (theDate.isoWeekday() >= 5) {
  //    nextFridayDate.add(12 - theDate.isoWeekday(), "days").add(2, "weeks");
  //  } else if (theDate.isoWeekday() < 5) {
  //    nextFridayDate.add(5 - theDate.isoWeekday(), "days").add(2, "weeks");
  //  }

  nextFridayDate
    .add(5 - theDate.isoWeekday(), "days")
    .add(theDate.isoWeekday() >= 5 ? 3 : 2, "weeks");

  const lastDayOfMonth = moment(theDate).clone().endOf("month");

  return (
    <div className="DateDetails">
      <h2>Fun facts about this date</h2>
      <ol>
        <li>The date is: {theDate.format("LLLL")}</li>
        <li>
          Counting from now ({now.format("LL")}), it would be{" "}
          {theDate.from(now)}.
        </li>
        <li>
          Next valentine's day ({nextValentines.format("ll")}) will be{" "}
          {"in 3 weeks"}
        </li>
        <li>
          It {theDate.isLeapYear() ? "falls" : "does not fall"} within a leap
          year.
        </li>
        <li>
          It{" "}
          {theDate.isBetween(summerStart, summerEnd, "day", "[]")
            ? "is"
            : "is not"}{" "}
          a summer day (it's between {summerStart.format("ll")} and{" "}
          {summerEnd.format("ll")}).
        </li>
        <li>
          It {theDate.isSame(programmersDay, "day") ? "is" : "is not"} the
          Programmer's Day ({programmersDay.format("ll")}).
        </li>
        <li>
          The next, third Friday will be on ({nextFridayDate.format("ll")}).
        </li>
        <li>
          The last day of month is {lastDayOfMonth.format("dddd")} (
          {lastDayOfMonth.format("ll")}).
        </li>
        <li>
          It is {theDate.format("DDDo")} day of {theDate.format("YYYY")} year.
        </li>
      </ol>
    </div>
  );
}

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.datepickerContainer = React.createRef();
  }

  componentDidMount() {
    window.$(this.datepickerContainer.current).datepicker({
      onSelect: this.props.onDateChange,
      defaultDate: this.props.initialDate
    });
  }

  componentWillUnmount() {
    window.$(this.datepickerContainer.current).datepicker("destroy");
  }

  render() {
    return <div ref={this.datepickerContainer} />;
  }
}

export default App;
