const screenDay = document.querySelector(".screen-day");
const screenMonth = document.querySelector(".screen-month");
const screenYear = document.querySelector(".screen-year");

const calendarDays = document.querySelector(".calendar-days");
const currentHeadingDate = document.querySelector(".heading-date");
const currentHeaderDate = document.querySelector(".header-date");
const btnPrevNextMonth = document.querySelectorAll(".header-btn-click");

// ----month-----
const calendarMonths = document.querySelector(".month-calendar-list");
const currentHeaderMonth = document.querySelector(".month-header-date");
const btnPrevNextYear = document.querySelectorAll(".month-header-btn-click");

// -----year-----
const calendarYears = document.querySelector(".year-calendar-list");
const currentHeaderYear = document.querySelector(".year-header-date");
const btnPrevNextTenYear = document.querySelectorAll(".year-header-btn-click");

let date = new Date();
let currentYear = date.getFullYear();
let currentMonth = date.getMonth();
let currentWeek = date.getDay();
let currentDate = date.getDate();

// ------year------
let rangeOfYear = [
  currentYear - (currentYear % 10),
  currentYear - (currentYear % 10) + 9,
];
// -----------

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const calendar = () => {
  let day_name = "";
  switch (currentWeek) {
    case 0:
      day_name = "Sunday";
      break;
    case 1:
      day_name = "Monday";
      break;
    case 2:
      day_name = "Tuesday";
      break;
    case 3:
      day_name = "Wednesday";
      break;
    case 4:
      day_name = "Thursday";
      break;
    case 5:
      day_name = "Friday";
      break;
    case 6:
      day_name = "Saturday";
      break;
  }

  let screenState = 1;

  currentHeaderDate.addEventListener("click", () => {
    if (screenState === 1) {
      screenState++;
      screenDay.style.display = "none";
      screenMonth.style.display = "block";
      screenYear.style.display = "none";

      renderCalendar();
    } else {
      return;
    }
  });

  // --click header---
  currentHeaderMonth.addEventListener("click", () => {
    if (screenState === 2) {
      screenState++;
      screenDay.style.display = "none";
      screenMonth.style.display = "none";
      screenYear.style.display = "block";

      renderCalendar();
    } else {
      return;
    }
  });

  currentHeadingDate.innerHTML = `${day_name}, ${
    months[date.getMonth()]
  } ${currentDate}`;

  calendarMonths.addEventListener("click", () => {
    screenDay.style.display = "block";
    screenMonth.style.display = "none";
    screenYear.style.display = "none";
    screenState--;

    renderCalendar();
  });

  calendarYears.addEventListener("click", () => {
    screenDay.style.display = "none";
    screenMonth.style.display = "block";
    screenYear.style.display = "none";
    screenState--;

    renderCalendar();
  });

  const renderCalendar = () => {
    if (screenState === 1) {
      // -----day-----
      currentHeaderDate.innerHTML = `${months[currentMonth]} ${currentYear}`;

      let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay();

      let lastDateofMonth = new Date(
        currentYear,
        currentMonth + 1,
        0
      ).getDate();
      let lastDayofMonth = new Date(
        currentYear,
        currentMonth,
        lastDateofMonth
      ).getDay();
      let lastDateofLastMonth = new Date(
        currentYear,
        currentMonth,
        0
      ).getDate();

      let days = "";

      for (let i = firstDayofMonth; i > 0; i--) {
        days += `<li class="inactive calendar-content">${
          lastDateofLastMonth - i + 1
        }</li>`;
      }

      for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday =
          i === date.getDate() &&
          currentMonth === new Date().getMonth() &&
          currentYear === new Date().getFullYear()
            ? "active"
            : "";

        days += `<li class="${isToday} calendar-content">${i}</li>`;
      }

      const rangeOfDay = 42 - (firstDayofMonth + lastDateofMonth);

      for (let i = 1; i <= rangeOfDay; i++) {
        days += `<li class="inactive calendar-content">${i}</li>`;
      }

      calendarDays.innerHTML = days;
    } else if (screenState === 2) {
      // -----month -----
      currentHeaderMonth.innerHTML = `${currentYear}`;

      let month = "";

      for (let i = 0; i <= 11; i++) {
        let isMonth =
          currentMonth === i && currentYear === new Date().getFullYear()
            ? "active"
            : "";

        month += `<li class="${isMonth} calendar-content">${months[i].slice(
          0,
          3
        )}</li>`;
      }

      for (let i = 0; i <= 3; i++) {
        month += `<li class="inactive calendar-content">${months[i].slice(
          0,
          3
        )}</li>`;
      }

      calendarMonths.innerHTML = month;

      // ----------------
    } else if (screenState === 3) {
      // -----year-----
      currentHeaderYear.innerHTML = `${rangeOfYear[0]} - ${rangeOfYear[1]}`;
      let year = "";

      if (Math.floor((rangeOfYear[0] % 100) / 10) % 2 === 0) {
        for (let i = 2; i > 0; i--) {
          let isYear = currentYear === rangeOfYear[0] - i;
          year += `<li class="inactive calendar-content">${
            rangeOfYear[0] - i
          }</li>`;
        }

        for (let i = rangeOfYear[0]; i <= rangeOfYear[1]; i++) {
          let isYear = currentYear == i ? "active" : "";

          year += `<li class="${isYear} calendar-content">${i}</li>`;
        }

        for (let i = 1; i <= 4; i++) {
          year += `<li class="inactive calendar-content">${
            rangeOfYear[1] + i
          }</li>`;
        }
      } else {
        for (let i = rangeOfYear[0]; i <= rangeOfYear[1]; i++) {
          let isYear = currentYear == i;

          year += `<li class="${isYear} calendar-content">${i}</li>`;
        }
        for (let i = 1; i <= 6; i++) {
          year += `<li class="inactive calendar-content">${
            rangeOfYear[1] + i
          }</li>`;
        }
      }
      calendarYears.innerHTML = year;
    }
  };
  renderCalendar();

  btnPrevNextMonth.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentMonth = btn.id === "prev" ? currentMonth - 1 : currentMonth + 1;

      if (currentMonth < 0 || currentMonth > 11) {
        date = new Date(currentYear, currentMonth);
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
      } else {
        date = new Date();
      }
      renderCalendar();
    });
  });

  btnPrevNextYear.forEach((btnMonth) => {
    btnMonth.addEventListener("click", () => {
      currentYear =
        btnMonth.id === "month-prev" ? currentYear - 1 : currentYear + 1;

      renderCalendar();
    });
  });

  btnPrevNextTenYear.forEach((btnTenMonth) => {
    btnTenMonth.addEventListener("click", () => {
      rangeOfYear =
        btnTenMonth.id === "year-prev"
          ? [rangeOfYear[0] - 10, rangeOfYear[1] - 10]
          : [rangeOfYear[0] + 10, rangeOfYear[1] + 10];

      renderCalendar();
    });
  });
};
calendar();
