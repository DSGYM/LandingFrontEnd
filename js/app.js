/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 */

const surnames = ["Tremblay", "Gagnon", "Roy", "Morin", "Lavoie", "Fortin"];
const firstnames = ["James", "John", "Susan", "Robert", "Gary"];
const positions = ["Mechanic", "Engineer", "Pilot", "Firefighter"];

const navbar = document.getElementById("navbar__list");
const main = document.querySelector("main");

const today = new Date();
const date =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
const time =
  today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

/**
 * End Global Variables
 * Start Helper Functions
 *
 */
const getRandomArbitrary = (min, max) => {
  return Math.round(Math.random() * (max - min) + min, 0);
};

const availableRobots = getRandomArbitrary(4, 8);

const createSequence = num => {
  let arr = [];
  for (let i = 1; i < num + 1; i++) {
    arr.push(i);
  }
  return arr;
};

const scrollToID = e => {
  e.preventDefault();
  // Only trigger when a href is clicked
  if (e.target.tagName === "A") {
    let section = e.target.outerHTML.split('"')[1];
    let section_id = document.querySelector(section);
    section_id.scrollIntoView({
      behavior: "smooth"
    });
  }
};

const pickRandom = items => {
  let item = items[Math.floor(Math.random() * items.length)];
  return item;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

const creatDesc = () => {
  let surname = pickRandom(surnames);
  let firstname = pickRandom(firstnames);
  let position = pickRandom(positions);
  return [surname, firstname, position];
};

// Build count for available robots

const countRobots = (selector, num) => {
  let selected = document.querySelector(selector);
  let elem = document.createElement("h3");
  elem.innerHTML = `On ${date} at ${time} we have ${num} robots available for your job.`;
  selected.appendChild(elem);
};

// build the nav

const createNav = variable => {
  for (elem of variable) {
    let text = elem.querySelector("h2");
    if (text === null) {
      text = "NoSectionID";
    } else {
      text = text.innerHTML;
    }
    let li = document.createElement("li");
    li.innerHTML = `<a href="#${elem.id}">${text}</a>`;
    navbar.appendChild(li);
  }
};

// build the section

const createSection = i => {
  let person = creatDesc();
  let robot = getRandomArbitrary((min = 1), (max = 200));
  let years = getRandomArbitrary((min = 1), (max = 10));
  let section = document.createElement("section");
  section.id = `section${i}`;
  section.innerHTML = `
    <div class="landing__container">
      <h2>Robot ${i}</h2>
      <div class="container">
        <div class="card">
          <img src="https://robohash.org/${robot}" alt="" />
        </div>
        <div class="content">
          <div class="name">
            <h3>Name</h3>
            <p>${person[0]} ${person[1]}</p>
          </div>
          <div class="position">
            <h3>Position</h3>
            <p>${person[2]}</p>
          </div>
          <div class="experience">
            <h3>Years of experience</h3>
            <p>${years}</p>
          </div>
        </div>
      </div>
    </div>
  `;
  main.appendChild(section);
};

// Add class 'active' to section when near top of viewport

// Scroll to anchor ID using scrollTO event
navbar.addEventListener("click", scrollToID);
/**
 * End Main Functions
 * Begin Events
 *
 */

const arr = createSequence(availableRobots);

for (num of arr) {
  createSection(num);
}

// Scrollopbutton

const scrollbtn = document.getElementById("scrolltop");

scrollbtn.addEventListener("click", () => {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
});

window.onscroll = () => {
  if (window.pageYOffset > 500) {
    scrollbtn.classList.remove("btn__invisible");
    scrollbtn.classList.add("btn__visible");
  } else {
    scrollbtn.classList.remove("btn__visible");
    scrollbtn.classList.add("btn__invisible");
  }
};

// Build menu

const navtexts = document.querySelectorAll("section");

createNav(navtexts);
countRobots(`.main__hero`, availableRobots);

// Scroll to section on link click

// Set sections as active
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      let elem = document.getElementById(entry.target.id);
      let header = document.querySelector(`[href='#${entry.target.id}']`);
      if (entry.intersectionRatio === 1) {
        header.classList.add("active");
        elem.classList.add("your-active-class");
      } else {
        header.classList.remove("active");
        elem.classList.remove("your-active-class");
      }
    });
  },
  (options = {
    root: null, // relative to document viewport
    rootMargin: "0px", // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 1 // visible amount of item shown in relation to root
  })
);

for (section of navtexts) {
  observer.observe(document.getElementById(section.id));
}
