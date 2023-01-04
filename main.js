const table = document.querySelector("#table-calendar");
const calendarWeek = document.querySelector(".calendar-weeks");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");
const footer = document.querySelector(".footer");
const listCalendarContent = document.querySelectorAll("#table-calendar li");

const calendarDays = document.querySelector(".calendar-days");
const currentHeadingDate = document.querySelector(".heading-date");
const currentHeaderDate = document.querySelector(".header-date");

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

  currentHeadingDate.innerHTML = `${day_name}, ${
    months[date.getMonth()]
  } ${currentDate}`;

  currentHeaderDate.addEventListener("click", () => {
    if (screenState < 3) {
      screenState++;

      renderCalendar();
    } else {
      return;
    }
  });

  table.addEventListener("click", function (e) {
    const calendarNode = e.target.closest(".calendar-content");
    if (calendarNode) {
      if (screenState === 3) {
        currentYear = Number(calendarNode.dataset.year);
        screenState--;
      } else if (screenState === 2) {
        currentMonth = Number(calendarNode.dataset.month);
        currentYear = Number(calendarNode.dataset.year);
        screenState--;
      }
      renderCalendar();
    }
  });

  const renderCalendar = () => {
    if (screenState === 1) {
      // -----day-----
      currentHeaderDate.innerText = `${months[currentMonth]} ${currentYear}`;

      // calendarWeek.style.display = "grid";
      // table.classList.remove("grid-cols-4");
      // table.classList.add("grid-cols-7");

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
        days += `<li
        data-year=${currentYear} 
                        data-month=${currentMonth - 1} 
                        data-day=${lastDateofLastMonth - i + 1} 
        class="inactive calendar-content">${lastDateofLastMonth - i + 1}</li>`;
      }

      for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday =
          i === date.getDate() &&
          currentMonth === new Date().getMonth() &&
          currentYear === new Date().getFullYear()
            ? "active"
            : "";

        days += `<li
        data-year=${currentYear} 
                        data-month=${currentMonth} 
                        data-day=${i} 
         class="${isToday} calendar-content">${i}</li>`;
      }

      const rangeOfDay = 42 - (firstDayofMonth + lastDateofMonth);

      for (let i = 1; i <= rangeOfDay; i++) {
        days += `<li 
        data-year=${currentYear} 
                        data-month=${currentMonth + 1} 
                        data-day=${i} 
        class="inactive calendar-content">${i}</li>`;
      }

      table.innerHTML = days;
    } else if (screenState === 2) {
      // -----month -----
      calendarWeek.style.display = "none";
      footer.style.display = "none";

      // calendarWeek.style.display = "none";
      // table.classList.remove("grid-cols-7");
      // table.classList.add("grid-cols-4");

      currentHeaderDate.innerText = `${currentYear}`;

      let month = "";

      for (let i = 0; i <= 11; i++) {
        let isMonth =
          currentMonth === i && currentYear === new Date().getFullYear()
            ? "active"
            : "";

        month += `<li data-month=${i} data-year=${currentYear} class="${isMonth} calendar-content grid">${months[
          i
        ].slice(0, 3)}</li>`;
      }

      for (let i = 0; i <= 3; i++) {
        month += `<li data-year=${currentYear + 1} 
        data-month=${i}  class="inactive calendar-content grid">${months[
          i
        ].slice(0, 3)}</li>`;
      }

      table.innerHTML = month;
    } else if (screenState === 3) {
      // -----year-----
      footer.style.display = "none";

      currentHeaderDate.innerText = `${rangeOfYear[0]} - ${rangeOfYear[1]}`;
      let year = "";

      if (Math.floor((rangeOfYear[0] % 100) / 10) % 2 === 0) {
        for (let i = 2; i > 0; i--) {
          const isYear = currentYear === rangeOfYear[0] - i;
          year += `<li data-year=${
            rangeOfYear[0] - i
          } class="inactive calendar-content grid">${rangeOfYear[0] - i}</li>`;
        }

        for (let i = rangeOfYear[0]; i <= rangeOfYear[1]; i++) {
          const isYear = currentYear == i ? "active" : "";

          year += `<li data-year=${i} class="${isYear} calendar-content grid">${i}</li>`;
        }

        for (let i = 1; i <= 4; i++) {
          year += `<li data-year=${
            rangeOfYear[1] + i
          } class="inactive calendar-content grid">${rangeOfYear[1] + i}</li>`;
        }
      } else {
        for (let i = rangeOfYear[0]; i <= rangeOfYear[1]; i++) {
          const isYear = currentYear == i;

          year += `<li data-year=${i} class="${isYear} calendar-content grid">${i}</li>`;
        }
        for (let i = 1; i <= 6; i++) {
          year += `<li data-year=${
            rangeOfYear[1] + i
          } class="inactive calendar-content grid">${rangeOfYear[1] + i}</li>`;
        }
      }
      table.innerHTML = year;
    }
  };
  renderCalendar();

  btnPrev.addEventListener("click", () => {
    if (screenState === 1) {
      currentMonth -= 1;
      if (currentMonth === -1) {
        currentYear -= 1;
        currentMonth = 11;
      }
    } else if (screenState === 2) {
      currentYear -= 1;
    } else if (screenState === 3) {
      rangeOfYear = [rangeOfYear[0] - 10, rangeOfYear[1] - 10];
    }
    renderCalendar();
  });

  btnNext.addEventListener("click", () => {
    if (screenState === 1) {
      currentMonth += 1;
      if (currentMonth === 12) {
        currentYear += 1;
        currentMonth = 0;
      }
    } else if (screenState === 2) {
      currentYear += 1;
    } else if (screenState === 3) {
      rangeOfYear = [rangeOfYear[0] + 10, rangeOfYear[1] + 10];
    }
    renderCalendar();
  });
};
calendar();
