const menuBar = document.querySelector(".menu-icon");
const menu = document.querySelector("header nav");
const closeIcon = document.querySelector(".close-menu");
const totalMoney = document.querySelector("#money-stat");
const bookmarkBtn = document.querySelector(".bookmark-btn");
const bookmarkTxt = document.querySelector(".bookmark-btn span");
const backProjectBtn = document.querySelector(".back-project-btn");
const modal = document.querySelector(".modal");
const closeModalIcon = document.querySelector(".modal-close");
const darkBg = document.querySelector(".darken-background");
const totalBackers = document.querySelector("#backers-stat");
const bambooStocks = document.querySelectorAll(
  '.stock[data-stock-product="bamboo-stand"]'
);
const blackEditionStocks = document.querySelectorAll(
  '.stock[data-stock-product="black-edition-stand"]'
);
const rewardBtns = document.querySelectorAll(".reward-btn");
const noRewardModalCard = document.querySelector("#no-reward");
const bambooModalCard = document.querySelector("#bamboo-stand");
const blackEditionModalCard = document.querySelector("#black-edition-stand");
const noRewardInput = document.querySelector('#no-reward input[type="radio"]');
const bambooInput = document.querySelector('#bamboo-stand input[type="radio"]');
const blackEditionInput = document.querySelector(
  '#black-edition-stand input[type="radio"]'
);
const pledgeForms = document.querySelectorAll(".card-bottom");
const tyCard = document.querySelector(".ty-card");
const successBtn = document.querySelector("#success-btn");

const menuOpen = (e) => {
  menuBar.style.display = "none";
  menu.style.display = "block";
  closeIcon.style.display = "block";
};

const menuClose = (e) => {
  menu.style.display = "none";
  closeIcon.style.display = "none";
  menuBar.style.display = "block";
};

const bookmark = (e) => {
  bookmarkTxt.textContent = "Bookmarked";
  bookmarkTxt.style.color = "hsl(176, 72%, 28%)";
};

const modalOpen = (e) => {
  modal.style.display = "flex";
  darkBg.style.display = "block";
};

const modalClose = (e) => {
  modal.style.display = "none";
  darkBg.style.display = "none";
};

const modalOpenWithReward = (e) => {
  modal.style.display = "flex";
  darkBg.style.display = "block";

  if (e.target.getAttribute("data-reward-type") === "bamboo-stand") {
    bambooModalCard.classList.add("selected");
    bambooInput.checked = true;
    noRewardModalCard.classList.remove("selected");
    blackEditionModalCard.classList.remove("selected");
  } else if (
    e.target.getAttribute("data-reward-type") === "black-edition-stand"
  ) {
    blackEditionModalCard.classList.add("selected");
    blackEditionInput.checked = true;
    noRewardModalCard.classList.remove("selected");
    bambooModalCard.classList.remove("selected");
  }
};

const inputChanged = (e) => {
  let el;

  if (e.target.getAttribute("data-reward-type") === "no-reward") {
    noRewardModalCard.classList.add("selected");
    bambooModalCard.classList.remove("selected");
    blackEditionModalCard.classList.remove("selected");
  } else if (e.target.getAttribute("data-reward-type") === "bamboo-stand") {
    bambooModalCard.classList.add("selected");
    noRewardModalCard.classList.remove("selected");
    blackEditionModalCard.classList.remove("selected");
  } else if (
    e.target.getAttribute("data-reward-type") === "black-edition-stand"
  ) {
    blackEditionModalCard.classList.add("selected");
    noRewardModalCard.classList.remove("selected");
    bambooModalCard.classList.remove("selected");
  }
};

const openTyCard = (e) => {
  modalClose();
  tyCard.style.display = "flex";
  darkBg.style.display = "block";
};

const closeTyCard = (e) => {
  tyCard.style.display = "none";
  darkBg.style.display = "none";
};

const submitPledge = (e) => {
  e.preventDefault();
  const pledge = Number(e.target.querySelector("input").value);

  if (pledge <= 0) {
    alert("Set a positive amount please.");
    return;
  }

  totalMoney.childNodes[0].textContent =
    "$" +
    (Number(
      totalMoney.childNodes[0].textContent.substring(1).replace(",", "")
    ) +
      pledge);
  totalBackers.childNodes[0].textContent =
    Number(totalBackers.childNodes[0].textContent.replace(",", "")) + 1;

  if (e.target.getAttribute("data-pledge") === "bamboo-stand") {
    bambooStocks.forEach((stock) => {
      stock.childNodes[0].textContent =
        Number(stock.childNodes[0].textContent) - 1;
    });
  } else if (e.target.getAttribute("data-pledge") === "black-edition-stand") {
    blackEditionStocks.forEach((stock) => {
      stock.childNodes[0].textContent =
        Number(stock.childNodes[0].textContent) - 1;
    });
  }

  openTyCard(e);
};

menuBar.addEventListener("click", (e) => {
  menuOpen(e);
});

closeIcon.addEventListener("click", (e) => {
  menuClose(e);
});

bookmarkBtn.addEventListener("click", (e) => {
  bookmark(e);
});

backProjectBtn.addEventListener("click", (e) => {
  modalOpen(e);
});

closeModalIcon.addEventListener("click", (e) => {
  modalClose(e);
});

rewardBtns.forEach((rewardBtn) => {
  rewardBtn.addEventListener("click", (e) => {
    modalOpenWithReward(e);
  });
});

noRewardInput.addEventListener("change", (e) => {
  inputChanged(e);
});

bambooInput.addEventListener("change", (e) => {
  inputChanged(e);
});

blackEditionInput.addEventListener("change", (e) => {
  inputChanged(e);
});

pledgeForms.forEach((form) => {
  form.addEventListener("submit", (e) => {
    submitPledge(e);
  });
});

successBtn.addEventListener("click", (e) => {
  closeTyCard(e);
});
