function calculate() {
  const cash = Number(document.getElementById("cash").value);
  const income = Number(document.getElementById("income").value);
  const expenses = Number(document.getElementById("expenses").value);

  if (!cash || !expenses) {
    alert("Enter at least cash and expenses.");
    return;
  }

  let net = income - expenses;
  let months;

  if (net >= 0) {
    months = cash / expenses;
  } else {
    months = cash / Math.abs(net);
  }

  months = Math.max(0, months.toFixed(1));

  let levelText = "";
  let verdictText = "";
  let color = "";

  if (months > 6) {
    levelText = "🟢 SAFE";
    verdictText = "Relax. You could mess up and still recover.";
    color = "#3cff7a";
  } else if (months > 3) {
    levelText = "🟡 TENSE";
    verdictText = "You’re okay… but stop pretending you’re rich.";
    color = "#ffd93b";
  } else if (months > 1) {
    levelText = "🟠 DANGER";
    verdictText = "You’re surviving, not living.";
    color = "#ff8c00";
  } else if (months > 0.3) {
    levelText = "🔴 BROKE";
    verdictText = "One bill away from panic.";
    color = "#ff4d4d";
  } else {
    levelText = "☠️ COOKED";
    verdictText = "This isn’t broke. This is denial.";
    color = "#ff0000";
  }

  document.getElementById("level").innerText = levelText;
  document.getElementById("level").style.color = color;
  document.getElementById("months").innerText = `You can survive ~${months} month(s).`;
  document.getElementById("verdict").innerText = verdictText;

  document.getElementById("result").classList.remove("hidden");
}
