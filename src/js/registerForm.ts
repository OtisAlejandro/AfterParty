// Create a function to get all of the input's values (didn't feel like using a <form> tag but that's more efficient)
export const handleRegistration = async () => {
  // Collect input values
  const firstNameInput = document.getElementById("first-name") as HTMLInputElement;
  const lastNameInput = document.getElementById("last-name") as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;
  const commentTextarea = document.getElementById("comment") as HTMLTextAreaElement;

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const comment = commentTextarea.value;

  // Create an object with the values
  const registrationData = {
    firstName,
    lastName,
    email,
    comment,
  };

  await sendResend(registrationData);

  // Reset form values
  firstNameInput.value = "";
  lastNameInput.value = "";
  emailInput.value = "";
  commentTextarea.value = "";
}

const sendResend = async (registrationData: { firstName: string; lastName: string; email: string; comment: string; }) => {
  const proxyURL = '/resend/emails';

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', proxyURL, true);

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(response);
        resolve(response);
      } else {
        console.log('An error occurred while forwarding an email:', xhr.statusText);
        reject(xhr.statusText);
      }
    };

    xhr.onerror = () => {
      console.log('An error occurred while forwarding an email:', xhr.statusText);
      reject(xhr.statusText);
    };

    // Add Authorization header
    // xhr.setRequestHeader('Authorization', 'Bearer re_LwSN1H3q_GqwugtkRnDhb9U7EMpKAAKQp');

    // Set Content-Type header to indicate JSON data
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(JSON.stringify({
      from: 'Resend <onboarding@resend.dev>',
      to: ['otis@otisai.dev'],
      subject: 'OpenAI Dev Day Afterparty RSVP',
      html: `Name: ${registrationData.firstName} ${registrationData.lastName}\nEmail: ${registrationData.email}\nComment: ${registrationData.comment}`,
    }));
  });
}