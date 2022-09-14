// console.log("Serving js from web");

// fetch("http://puzzle.mead.io/puzzle").then((response) =>
//   response.json().then((data) => console.log(data))
// );
// http://localhost:3000/weather?address=shimla

// fetch("http://localhost:3000/weather?address=boston").then((response) =>
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data);
//     }
//   })
// );

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";
  const location = searchElement.value;

  const url = `/weather?address=${location}`;

  if (!location) {
    console.log("Please enter the location");
  } else {
    fetch(url).then((response) =>
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          messageOne.textContent = data.error;
        } else {
          console.log(data);
          messageOne.textContent = data.foreCast;
          messageTwo.textContent = data.location;
        }
      })
    );
  }
});
