const cashInput = document.getElementById("cash");
const incomeInput = document.getElementById("income");
const expensesInput = document.getElementById("expenses");

function formatWithCommas(value) {
  value = value.replace(/,/g, "");
  if (isNaN(value)) return "";
  return Number(value).toLocaleString();
}

[cashInput, incomeInput, expensesInput].forEach(input => {
  input.addEventListener("input", () => {
    input.value = formatWithCommas(input.value);
  });
});

function getNumber(input) {
  return Number(input.value.replace(/,/g, "")) || 0;
}

function formatMoney(amount, currency) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(amount);
}

function calculate() {
  const cash = getNumber(cashInput);
  const income = getNumber(incomeInput);
  const expenses = getNumber(expensesInput);
  const currency = document.getElementById("currency").value;

  if (cash <= 0 || expenses <= 0) {
    alert("Enter valid cash and expenses.");
    return;
  }

  const net = income - expenses;
  let months = net >= 0 ? cash / expenses : cash / Math.abs(net);
  months = Math.max(0, months).toFixed(1);

  let level, verdict, color;

  if (months > 6) {
    level = "🟢 SAFE";
    verdict = "Relax. You could mess up and still recover.";
    color = "#3cff7a";
  } else if (months > 3) {
    level = "🟡 TENSE";
    verdict = "You’re okay… but stop pretending you’re rich.";
    color = "#ffd93b";
  } else if (months > 1) {
    level = "🟠 DANGER";
    verdict = "You’re surviving, not living.";
    color = "#ff8c00";
  } else if (months > 0.3) {
    level = "🔴 BROKE";
    verdict = "One bill away from panic.";
    color = "#ff4d4d";
  } else {
    level = "☠️ COOKED";
    verdict = "This isn’t broke. This is denial.";
    color = "#ff0000";
  }

  document.getElementById("level").innerText = level;
  document.getElementById("level").style.color = color;

  document.getElementById("months").innerText =
    `Cash: ${formatMoney(cash, currency)} • Monthly burn: ${formatMoney(expenses, currency)}
Survival: ~${months} month(s)`;

  document.getElementById("verdict").innerText = verdict;
  document.getElementById("result").classList.remove("hidden");
}
