const eventform = document.getElementById("eventForm");

const inputtitle = document.getElementById("eventTitle");

const inputLocation = document.getElementById("eventlocation");

const inputdate = document.getElementById("eventdate");

const eventPriority = document.getElementById("eventPriority");

const btncont = document.getElementById("contbtn");

const eventdate = document.getElementById("eventdate");

const darkmodebtn = document.getElementById("darkmodebtn");

const locationSearch = document.getElementById("locationSearch");

const locationQuery = document.getElementById("locationsearch");

const today = new Date();

const day = today.getDate();

const month = today.getMonth() + 1;

const year = today.getFullYear();

let Idevent = 157831;

const todaydate = `${year}-${month}-${day}`;

let events = [
  {
    title: "Meeting",
    location: "Hama",
    date: "2028-12-05",
    priority: "work",
    id: Idevent++,
  },
  {
    title: "Visit My teacher Zakaria (:",
    location: "Lattakia",
    date: "2026-11-7",
    priority: "work",
    id: Idevent++,
  },
  {
    title: "interview",
    location: "Damascus",
    date: "2026-10-6",
    priority: "personal",
    id: Idevent++,
  },
  {
    title: "Go to resturant",
    location: "Homs",
    date: "2030-10-6",
    priority: "personal",
    id: Idevent++,
  },
];

const getPropirty = (property) => {
  if (property === "personal") return "priority-personal";
  if (property === "work") return "priority-work";
  if (property === "social") return "priority-social";
};

const getEventDate = (eventDate) => {
  if (eventDate === "upcaming") return "eventdate-upcaming";
  if (eventDate === "past") return "eventdate-past";
  if (eventDate === "today") return "eventdate-today";
};

const getEventstatus = (event) => {
  const eventDate = new Date(`${event.date}T00:00:00`);
  const currentDate = new Date();

  currentDate.setHours(0, 0, 0, 0);

  if (eventDate.getTime() === currentDate.getTime()) return "today";
  if (eventDate > currentDate) return "upcaming";
  return "past";
};

const createEvent = (event, index) => {
  const priorityClass = getPropirty(event.priority);

  const date = getEventstatus(event);

  let eventday = 0;
  if (event.priority === "upcaming") {
    eventday = returnDay(event);
  }
  return `
    <div class="event-card ${priorityClass}" data-index="${index}" id="eventid">
      <h3>${event.title}</h3>
      <p>Location: ${event.location}</p>
      <p>Date: ${event.date}</p>
      <p class="dateEvent ${getEventDate(date)} ">${date}</p>
      <p>Priority: ${event.priority}</p>
      <button type="submit" class="deletebtn" id="btnDelete"  data-index="${index}">❌</button>
      <p>Priority: ${eventday}</p>
    </div>
  `;
};

const filtering = (type, events) => {
  let newevents = events.filter((ev) => ev.priority === type);
  return newevents;
};

btncont.addEventListener("click", (e) => {
  const clickedbtn = e.target;
  if (e.target.tagName !== "BUTTON") return;

  const allButtons = btncont.querySelectorAll("button");
  allButtons.forEach((el) => {
    el.classList.remove("active");
  });

  clickedbtn.classList.add("active");

  if (e.target.dataset.filter !== "all") {
    let filtertype = e.target.dataset.filter;
    let result = filtering(filtertype, events);
    render(result);
    TotalsHandle(Total(result));
  } else {
    render(events);
    TotalsHandle(Total(events));
  }
});

const validationinput = (input1, input2) => {
  if (input1 == "" || input2 == "") {
    showMessage("you should write a correct info!", "error");
    return false;
  } else {
    showMessage("The event has been successfully entered", "success");
    return true;
  }
};

const render = (events) => {
  const container = document.querySelector(".event-list");
  let html = "";
  for (let i = 0; i < events.length; i++) {
    html += createEvent(events[i], i);
  }
  container.innerHTML = "<h2>My Events</h2>" + html;
};
const Total = (events) => {
  let sumwork = 0;
  let sumpersonal = 0;
  let sumsocial = 0;
  for (let event of events) {
    if (event.priority == "work") sumwork++;
    if (event.priority == "social") sumsocial++;
    if (event.priority == "personal") sumpersonal++;
  }

  return {
    SumWork: sumwork,
    SumPersonal: sumpersonal,
    SumSocial: sumsocial,
    All: sumwork + sumpersonal + sumsocial,
  };
};

const TotalsHandle = (Total) => {
  document.getElementById("worktotal").textContent = Total.SumWork;
  document.getElementById("personlatotal").textContent = Total.SumPersonal;
  document.getElementById("socialtotal").textContent = Total.SumSocial;
  document.getElementById("Allproperity").textContent = Total.All;
};
const showMessage = (mes, type) => {
  const text = document.getElementById("formMessage");
  text.textContent = mes;
  text.classList.add(type);
};

const submitbtn = document.getElementById("submit");
submitbtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (validationinput(inputtitle.value, inputLocation.value)) {
    let event = {
      title: inputtitle.value,
      location: inputLocation.value,
      date: inputdate.value,
      priority: eventPriority.value,
      id: Idevent++,
    };

    events.push(event);
    let total = Total(events);
    TotalsHandle(total);
    render(events);
  }
});

const deletebtn = document.getElementById("eventtid");
deletebtn.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  if (e.target.classList.contains("deletebtn")) {
    const index = parseInt(e.target.getAttribute("data-index"));
    events.splice(index, 1);
    TotalsHandle(Total(events));
    render(events);
  }
});

darkmodebtn.addEventListener("click", () => {
  document.body.classList.toggle("darkmode");
});

locationSearch.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = locationQuery.value.trim().toLowerCase();
  const equallocattion = query
    ? events.filter((event) => event.location.toLowerCase().includes(query))
    : events;

  render(equallocattion);
});

TotalsHandle(Total(events));
render(events);
