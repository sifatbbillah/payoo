const validPin = 1234;
const transactionData = [];

// helper functions
function getInputValueNumber(id) {
  const inputField = document.getElementById(id);
  return parseInt(inputField.value) || 0;
}

function getInputValue(id) {
  const inputField = document.getElementById(id);
  return inputField.value;
}

function getInnerText(id) {
  const element = document.getElementById(id);
  return parseInt(element.innerText) || 0;
}

function setInnerText(value) {
  document.getElementById("available-balance").innerText = value;
}

// toggle forms
function handleToggle(id) {
  const forms = document.getElementsByClassName("form");
  for (const form of forms) {
    form.style.display = "none";
  }
  document.getElementById(id).style.display = "block";
}

// toggle button styles
function handleButtonToggle(id) {
  const formBtns = document.getElementsByClassName("form-btn");
  for (const btn of formBtns) {
    btn.classList.remove("border-[#0874f2]", "bg-[#0874f20d]");
    btn.classList.add("border-gray-300");
  }
  document.getElementById(id).classList.remove("border-gray-300");
  document.getElementById(id).classList.add("border-[#0874f2]", "bg-[#0874f20d]");
}

// Add Money
document.getElementById("add-money-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const bank = getInputValue("bank");
  const accountNumber = getInputValue("account-number");
  const amount = getInputValueNumber("add-amount");
  const pinNumber = getInputValueNumber("add-pin");
  const availableBalance = getInnerText("available-balance");

  if (bank === "Select bank") {
    alert("Please select a valid bank");
    return;
  }
  if (accountNumber.length < 11) {
    alert("Invalid account number");
    return;
  }
  if (amount <= 0) {
    alert("Invalid amount");
    return;
  }
  if (pinNumber !== validPin) {
    alert("Invalid pin number");
    return;
  }

  const totalNewBalance = availableBalance + amount;
  setInnerText(totalNewBalance);

  transactionData.push({
    name: "Add Money",
    amount: amount,
    date: new Date().toLocaleString(),
  });

  alert("Money added successfully!");
});

// Cash Out
document.getElementById("withdraw-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const amount = getInputValueNumber("withdraw-amount");
  const availableBalance = getInnerText("available-balance");

  if (amount <= 0 || amount > availableBalance) {
    alert("Invalid amount");
    return;
  }

  const totalNewBalance = availableBalance - amount;
  setInnerText(totalNewBalance);

  transactionData.push({
    name: "Cash Out",
    amount: amount,
    date: new Date().toLocaleString(),
  });

  alert("Cash out successful!");
});

// Transactions
document.getElementById("transactions-button").addEventListener("click", function () {
  handleToggle("transactions-parent");
  handleButtonToggle("transactions-button");

  const transactionContainer = document.getElementById("transaction-container");
  transactionContainer.innerText = "";

  if (transactionData.length === 0) {
    transactionContainer.innerHTML = `<p class="text-center text-gray-500">No transactions yet</p>`;
    return;
  }

  for (const data of transactionData) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="bg-white rounded-xl p-3 flex justify-between items-center mt-3">
        <div class="flex items-center">
          <div class="p-3 rounded-full bg-[#f4f5f7]">
            <img src="./assets/wallet1.png" class="mx-auto" alt="" />
          </div>
          <div class="ml-3">
            <h1 class="font-semibold">${data.name}</h1>
            <p>Amount: $${data.amount}</p>
            <p class="text-sm text-gray-500">${data.date}</p>
          </div>
        </div>
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
    `;
    transactionContainer.appendChild(div);
  }
});

// Button Click Toggles
document.getElementById("add-button").addEventListener("click", function () {
  handleToggle("add-money-parent");
  handleButtonToggle("add-button");
});
document.getElementById("cash-out-button").addEventListener("click", function () {
  handleToggle("cash-out-parent");
  handleButtonToggle("cash-out-button");
});
document.getElementById("transfer-button").addEventListener("click", function () {
  handleToggle("transfer-money-parent");
  handleButtonToggle("transfer-button");
});
document.getElementById("bonus-button").addEventListener("click", function () {
  handleToggle("get-bonus-parent");
  handleButtonToggle("bonus-button");
});
document.getElementById("bill-button").addEventListener("click", function () {
  handleToggle("pay-bill-parent");
  handleButtonToggle("bill-button");
});
// Transfer Money
document.getElementById("transfer-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const accountNumber = getInputValue("transfer-account");
  const amount = getInputValueNumber("transfer-amount");
  const pin = getInputValueNumber("transfer-pin");
  const availableBalance = getInnerText("available-balance");

  if (accountNumber.length < 11) {
    alert("Invalid recipient account number");
    return;
  }
  if (amount <= 0 || amount > availableBalance) {
    alert("Invalid transfer amount");
    return;
  }
  if (pin !== validPin) {
    alert("Invalid pin");
    return;
  }

  const totalNewBalance = availableBalance - amount;
  setInnerText(totalNewBalance);

  transactionData.push({
    name: "Transfer Money",
    amount: amount,
    date: new Date().toLocaleString(),
  });

  alert("Money transferred successfully!");
});

// Get Bonus
document.getElementById("bonus-btn").addEventListener("click", function (e) {
  e.preventDefault();

  const bonusAmount = 500; // fixed bonus
  const availableBalance = getInnerText("available-balance");
  const newBalance = availableBalance + bonusAmount;

  setInnerText(newBalance);

  transactionData.push({
    name: "Bonus Received",
    amount: bonusAmount,
    date: new Date().toLocaleString(),
  });

  alert("Bonus added successfully!");
});
