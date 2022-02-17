// Clear console on refresh
//console.clear();

// Select DOM elements and apply variables
// Viewbox
const result = document.getElementById("result");
const resultAuthorFirst = document.getElementById("author-first");
const resultAuthorMid = document.getElementById("author-mid");
const resultAuthorLast = document.getElementById("author-last");
const resultPublishDate = document.getElementById("date");
const resultWorkTitle = document.getElementById("title");
const resultPlatformTitle = document.getElementById("platform-title");
const resultPublisherOne = document.getElementById("publisher-one");
const resultPublisherTwo = document.getElementById("publisher-two");
const resultAccessDate = document.getElementById("accessdate");
const resultSource = document.getElementById("source");
// Author's name
const firstName = document.getElementById("firstname");
const middleInitial = document.getElementById("midinitial");
const lastName = document.getElementById("lastname");
// const fullName = `${lastName}, ${firstName} ${middleInitial}.`;
const workTitle = document.getElementById("worktitle");
const platformTitle = document.getElementById("platformtitle");
const publisher = document.getElementById("publisher");
const publishDate = document.getElementById("publishdate");
const accessDate = document.getElementById("dateaccessed");
const sourceUrl = document.getElementById("source-url");
const space = " ";

const elements = document.querySelectorAll(".fields");

/*
[firstName, middleInitial, lastName].forEach(function (element) {
  element.addEventListener("input", function () {
    result.innerText += element.value;
  });
});
*/
// Button to generate the citation
//const generateBtn = document.getElementById("generate");
// Button to copy the citation
//const copyBtn = document.getElementById("copy-btn");
// Result viewbox container
//const resultViewbox = document.querySelector(".result");
// Text shown after generate button is clicked
//const copyInfo = document.querySelector(".result.info.right");
// Text shown after copy button is clicked
//const copiedInfo = document.querySelector(".result.info.left");

const citation = `${lastName}, ${firstName} ${middleInitial}. (${publishDate}). ${workTitle}. ${platformTitle}. ${publisher}. Retrieved on ${accessDate} from ${sourceUrl}.`;

if (lastName.value.length == 0) {
  publisher.addEventListener("input", function (e) {
    resultPublisherOne.innerText = publisher.value + ".";
  });
  document.getElementById("author-last").remove();
  document.getElementById("author-mid").remove();
  document.getElementById("author-first").remove();
  document.getElementById("publisher-two").remove();
}

firstName.addEventListener("input", function (e) {
  resultAuthorFirst.innerText = firstName.value;
});

middleInitial.addEventListener("input", function (e) {
  resultAuthorMid.innerText = middleInitial.value + ".";
});

lastName.addEventListener("input", function (e) {
  resultAuthorLast.innerText = lastName.value + ",";
});

publishDate.addEventListener("input", function (e) {
  resultPublishDate.innerText = publishDate.value + ".";
});

workTitle.addEventListener("input", function (e) {
  resultWorkTitle.innerText = workTitle.value + ".";
});

platformTitle.addEventListener("input", function (e) {
  resultPlatformTitle.innerText = platformTitle.value + ".";
});

publisher.addEventListener("input", function (e) {
  resultPublisherTwo.innerText = publisher.value + ".";
});

accessDate.addEventListener("input", function (e) {
  resultAccessDate.innerText = "Retrieved on " + accessDate.value;
});

sourceUrl.addEventListener("input", function (e) {
  resultSource.innerText = " from " + sourceUrl.value + ".";
});

/*
// Boolean that shows copy button when true
let generatedCitation = false;

// Update CSS of the copy button
// Identify boundary of result viewbox
let resultViewboxBoundary = {
  left: resultViewbox.getBoundingClientRect().left,
  top: resultViewbox.getBoundingClientRect().top,
};
// Update position of copy button to mouse location
resultViewbox.addEventListener("mousemove", (e) => {
  resultViewboxBoundary = {
    left: resultViewbox.getBoundingClientRect().left,
    top: resultViewbox.getBoundingClientRect().top,
  };
  if (generatedCitation) {
    copyBtn.style.opacity = "1";
    copyBtn.style.pointerEvents = "all";
    copyBtn.style.setProperty("--x", `${e.x - resultViewboxBoundary.left}px`);
    copyBtn.style.setProperty("--y", `${e.y - resultViewboxBoundary.left}px`);
  } else {
    copyBtn.style.opacity = "0";
    copyBtn.style.pointerEvents = "none";
  }
});
window.addEventListener("resize", (e) => {
  resultViewboxBoundary = {
    left: resultViewbox.getBoundingClientRect().left,
    top: resultViewbox.getBoundingClientRect().top,
  };
});

// Copy citation to clipboard
copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const citation = result.innerText;
  if (!citation || citation == "Click Generate") {
    return;
  }
  textarea.value = citation;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();

  copyInfo.style.transform = "translateY(200%)";
  copyInfo.style.opacity = "0";
  copyInfo.style.transform = "translateY(0%)";
  copyInfo.style.opacity = "0.75";
});
*/
/*
// Generate citation when Generate button is clicked
generateBtn.addEventListener("click", () => {
  result.innerText = fullName.value;
  generatedCitation = true;
  result.innerText = generateCitation(nameResult);
  copyInfo.style.transform = "translateY(0%)";
  copyInfo.style.opacity = "0.75";
  copiedInfo.style.transform = "translateY(200%)";
  copiedInfo.style.opacity = "0";
});

// Function to generate citation and display it
function generateCitation(nameResult) {
  let nameResult = fullName;
  let generatedCitation = "";
  generatedCitation += nameResult;
  return generatedCitation;
}
*/
