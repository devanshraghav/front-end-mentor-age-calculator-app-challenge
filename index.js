const form = document.getElementById("form");

const day = document.getElementById("day");

const month = document.getElementById("month");

const year = document.getElementById("year");

let validData = false;

const getCurrentDateData = () => {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const currentDay = new Date().getDate();

  return [currentDay, currentMonth + 1, currentYear];
};

const getDayMonthYearValue = () => {
  const dayValue = day.value;
  const monthValue = month.value;
  const yearValue = year.value;

  return [dayValue, monthValue, yearValue];
};

// show error message
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");

  validData = false;
};

//  remove error message
const removeError = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.remove("error");

  validData = true;
};

// give error if fields are empty
const validateEmptyFields = (field) => {
  let fieldData = field.target.value;
  let targetfield = field.target;
  if (fieldData == "") {
    setError(targetfield, "Field required");
  }
};

const validateYear = (yearField) => {
  let inputYear = yearField.target.value;
  let field = yearField.target;

  const currentYear = new Date().getFullYear();
  if (inputYear < 1 || inputYear > currentYear) {
    setError(field, "Must be in the past");
  } else {
    removeError(field);
  }
};

const validateMonth = (monthField) => {
  let inputMonth = monthField.target.value;
  let field = monthField.target;

  if (inputMonth < 1 || inputMonth > 12) {
    setError(field, "Must be a valid month");
  } else {
    removeError(field);
  }
};

const validateDate = (dayField) => {
  let inputDay = dayField.target.value;
  let field = dayField.target;

  if (inputDay < 1 || inputDay > 31) {
    setError(field, "Must be a valid date");
  } else {
    removeError(field);
  }
};

const isLeapYear = (year) => {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
};

const dateCheckForSameMonthAndYear = (day, month, year) => {
  const [currentDay, currentMonth, currentYear] = getCurrentDateData();

  return day > currentDay && month == currentMonth && year == currentYear;
};

const isValidDate = (dayField, monthField, yearField) => {
  const [day, month, year] = getDayMonthYearValue();

  let leapYear = isLeapYear(year);
  let checkDate = dateCheckForSameMonthAndYear(day, month, year);

  if (
    (day >= 31 && [4, 6, 9, 11].includes(parseInt(month))) ||
    (day >= 29 && month == 2 && !leapYear) ||
    checkDate
  ) {
    setError(dayField, "Invalid Date");
  }
};

const validateInputs = () => {
  isValidDate(day);
  validateEmptyFields({ target: day });
  validateEmptyFields({ target: month });
  validateEmptyFields({ target: year });

  if (validData == false) return;
  validateDate({ target: day });
  if (validData == false) return;
  validateMonth({ target: month });
  if (validData == false) return;
  validateYear({ target: year });
  if (validData == false) return;
};

const calculateAge = () => {
  const [dayValue, monthValue, yearValue] = getDayMonthYearValue();

  const [currentDay, currentMonth, currentYear] = getCurrentDateData();

  let ageYears = currentYear - yearValue;
  let ageMonths = currentMonth - monthValue;
  let ageDays = currentDay - dayValue;

  if (ageMonths < 0) {
    ageMonths = 12 + ageMonths;
  }
  if (ageDays < 0) {
    ageDays = 30 + ageDays;
  }
  if (
    currentYear > yearValue &&
    currentMonth == monthValue &&
    currentDay < dayValue
  ) {
    ageYears -= 1;
    ageMonths = currentMonth;
  }
  if (
    (currentYear > yearValue || currentYear == yearValue) &&
    currentMonth != monthValue &&
    currentDay < dayValue
  ) {
    ageMonths -= 1;
  }

  let htmlyears = document.getElementById("years-out");
  let htmlmonths = document.getElementById("months-out");
  let htmldays = document.getElementById("days-out");

  htmldays.innerText = ageDays;
  htmlyears.innerText = ageYears;
  htmlmonths.innerText = ageMonths;
};

day.addEventListener("blur", validateEmptyFields);
month.addEventListener("blur", validateEmptyFields);
year.addEventListener("blur", validateEmptyFields);

// input event listners
day.addEventListener("input", validateDate);
month.addEventListener("input", validateMonth);
year.addEventListener("input", validateYear);

// submit event listner

function validateAndCalculate() {
  validateInputs();
  if (validData) {
    calculateAge();
  }
}
