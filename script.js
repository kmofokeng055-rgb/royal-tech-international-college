// Royal Tech International College - Demo JavaScript

function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
  button.textContent = input.type === "password" ? "Show" : "Hide";
}

function normaliseEmail(email) {
  return email.trim().toLowerCase();
}

function studentKey(email) {
  return "royalTechStudent_" + normaliseEmail(email);
}

function getCurrentStudent() {
  const data = localStorage.getItem("loggedInStudent");
  return data ? JSON.parse(data) : null;
}

document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");
  const loginForm = document.getElementById("loginForm");
  const contactForm = document.getElementById("contactForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = document.getElementById("signupName").value.trim();
      const email = normaliseEmail(document.getElementById("signupEmail").value);
      const password = document.getElementById("signupPassword").value;
      const course = document.getElementById("signupCourse").value;
      const message = document.getElementById("signupMessage");

      if (password.length < 6) {
        message.textContent = "Password must be at least 6 characters.";
        message.className = "message error";
        return;
      }

      if (!course) {
        message.textContent = "Please choose a course.";
        message.className = "message error";
        return;
      }

      if (localStorage.getItem(studentKey(email))) {
        message.textContent = "An account with this email already exists.";
        message.className = "message error";
        return;
      }

      const student = { name, email, password, course };
      localStorage.setItem(studentKey(email), JSON.stringify(student));

      message.textContent = "Account created successfully. Redirecting to sign in...";
      message.className = "message success";
      signupForm.reset();

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1200);
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = normaliseEmail(document.getElementById("loginEmail").value);
      const password = document.getElementById("loginPassword").value;
      const message = document.getElementById("loginMessage");
      const stored = localStorage.getItem(studentKey(email));

      if (!stored) {
        message.textContent = "Account not found. Please create an account first.";
        message.className = "message error";
        return;
      }

      const student = JSON.parse(stored);

      if (student.password !== password) {
        message.textContent = "Incorrect password. Please try again.";
        message.className = "message error";
        return;
      }

      localStorage.setItem("loggedInStudent", JSON.stringify(student));
      message.textContent = "Login successful. Opening your dashboard...";
      message.className = "message success";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 700);
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const result = document.getElementById("contactResult");
      result.textContent = "Thank you! Your demo message has been received.";
      result.className = "message success";
      contactForm.reset();
    });
  }

  const dashboard = document.getElementById("studentDashboard");
  if (dashboard) {
    const student = getCurrentStudent();

    if (!student) {
      window.location.href = "login.html";
      return;
    }

    const name = document.getElementById("studentName");
    const dashboardName = document.getElementById("dashboardName");
    const dashboardEmail = document.getElementById("dashboardEmail");
    const dashboardCourse = document.getElementById("dashboardCourse");

    if (name) name.textContent = student.name;
    if (dashboardName) dashboardName.textContent = student.name;
    if (dashboardEmail) dashboardEmail.textContent = student.email;
    if (dashboardCourse) dashboardCourse.textContent = student.course;
  }
});

function logout() {
  localStorage.removeItem("loggedInStudent");
  window.location.href = "login.html";
}

function showResources() {
  const box = document.getElementById("resourceMessage");
  if (!box) return;

  box.innerHTML = `
    <h3>📚 Demo Student Resources</h3>
    <ul>
      <li>Course learning materials</li>
      <li>Student study guide</li>
      <li>Technology practice exercises</li>
      <li>Course announcements</li>
    </ul>
    <p>These resources are demo content for this website project.</p>
  `;
  box.className = "resource-message visible";
}
