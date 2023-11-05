import './style.css';

import { handleRegistration } from './js/registerForm';

const initMainPage = () => {
  // Now we will listen for a button click
  const registerButton = document.querySelector(".main__section--container--form-submit");

  // Attach the registration handler to the "Register" button click event
  registerButton?.addEventListener("click", handleRegistration);
}

initMainPage();