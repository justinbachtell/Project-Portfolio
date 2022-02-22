// Clear console on refresh
console.clear();

/* REAL-TIME INNER TEXT
// Viewbox
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
*/

// Select DOM elements and apply variables
const result = document.getElementById("result");
const firstName = document.getElementById("firstname").value;
const middleInitial = document.getElementById("midinitial").value;
const lastName = document.getElementById("lastname").value;
const workTitle = document.getElementById("worktitle").value;
const platformTitle = document.getElementById("platformtitle").value;
const publisher = document.getElementById("publisher").value;
const publishDate = document.getElementById("publishdate").value;
const accessDate = document.getElementById("dateaccessed").value;
const sourceURL = document.getElementById("source-url").value;
const citationStyle = document.getElementById("citation-style");
const resetForm = document.getElementById("reset-form");

// Button to generate the citation
const generateBtn = document.getElementById("generate");
let citationCopyBtn = false;

// Button to copy the citation
const copyBtn = document.getElementById("copy-btn");
// Result viewbox container
const resultViewbox = document.querySelector(".result");
// Mouse cursor
let mouseCursor = document.querySelector(".cursor");
// Text shown after generate button is clicked
const copiedInfo = document.querySelector(".result.info.right");
// Text shown after copy button is clicked
const copyInfo = document.querySelector(".result.info.left");

// Display citation with chosen citation style
window.onload = generateCitation = () => {
  result.innerHTML = "";
  citationCopyBtn = false;
  copyInfo.style.opacity = 0;
  styles = citationStyle.value;
  switch (styles) {
    case "apa":
      citationStyleAPA();
      citationCopyBtn = true;
      copyInfo.style.opacity = 1;
      break;
  }
};

// Function to refresh page prior to clicking generate citation
const refreshPage = () => {
  document.location.reload();
};

const cursorRounded = document.querySelector(".rounded");
const cursorPointed = document.querySelector(".pointed");

const moveCursor = (e) => {
  const mouseY = e.pageY;
  const mouseX = e.pageX;

  cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

  cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
};

window.addEventListener("mousemove", moveCursor);

// Update CSS of the copy button
// Identify boundary of result viewbox
let resultViewboxBoundary = {
  left: resultViewbox.getBoundingClientRect().left,
  top: resultViewbox.getBoundingClientRect().top,
};
// Update position of copy button to mouse location
resultViewbox.addEventListener("mousemove", (e) => {
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  resultViewboxBoundary = {
    left: resultViewbox.getBoundingClientRect().left,
    top: resultViewbox.getBoundingClientRect().top,
  };
  if (citationCopyBtn) {
    copyBtn.style.opacity = "1";
    copyBtn.style.pointerEvents = "all";
    copyBtn.style.setProperty(
      "--x",
      `${mouseX - resultViewboxBoundary.left}px`
    );
    copyBtn.style.setProperty(
      "--y",
      `${mouseY - resultViewboxBoundary.left}px`
    );
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

// Delay
const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

// Change Viewbox background when clicked to copy
async function copyClick() {
  result.style.background = "rgba(207, 231, 253, 0.981)";
  result.style.color = "black";
  copiedInfo.style.opacity = 1;
  copyInfo.style.color = "white";
  await delay(100);
  result.style.background = "white";
  result.style.color = "black";
  await delay(4000);
  copiedInfo.style.opacity = 0;
  copyInfo.style.color = "black";
}

// Copy citation to clipboard
copyBtn.addEventListener("click", () => {
  copyClick();
  const textarea = document.createElement("textarea");
  const citation = result.innerText;
  citation.select();
  citation.setSelectionRange(0, 99999);

  // Copy text inside citation
  navigator.clipboard.writeText(citation.value);
});

/***** APA Citation Style *****/
const citationStyleAPA = (event) => {
  if (!lastName && !workTitle) {
    result.innerHTML = "";
  } else {
    // no author
    if (!lastName) {
      // no publish date
      if (!publishDate) {
        // no platform title
        if (!platformTitle) {
          result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessDate} from ${sourceURL}.`;
          // platform title included
        } else {
          result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessDate} from ${sourceURL}.`;
        }
        // publish date included
      } else {
        // no platform title
        if (!platformTitle) {
          result.innerHTML = `${publisher}. (${publishDate}). <i>${workTitle}</i>. Retrieved on ${accessDate} from ${sourceURL}.`;
          // platform title included
        } else {
          result.innerHTML = `${publisher}. (${publishDate}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessDate} from ${sourceURL}.`;
        }
      }
      // author included
    } else {
      // no first name
      if (!firstName) {
        // no publish date
        if (!publishDate) {
          // no platform title
          if (!platformTitle) {
            result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessDate} from ${sourceURL}.`;
            // platform title included
          } else {
            result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessDate} from ${sourceURL}.`;
          }
          // publish date included
        } else {
          // no platform title
          if (!platformTitle) {
            result.innerHTML = `${lastName}. ${publishDate}. <i>${workTitle}</i>. Retrieved on ${accessDate} from ${sourceURL}.`;
            // platform title included
          } else {
            result.innerHTML = `${lastName}. ${publishDate}. <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessDate} from ${sourceURL}.`;
          }
        }
        // first name included
      } else {
        // no middle initial
        if (!middleInitial) {
          // no publish date
          if (!publishDate) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessDate} from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessDate} from ${sourceURL}.`;
            }
            // publish date included
          } else {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${lastName}, ${firstName}. ${publishDate}. <i>${workTitle}</i>. Retrieved on ${accessDate} from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${lastName}, ${firstName}. ${publishDate}. <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessDate} from ${sourceURL}.`;
            }
          }
          // middle initial included
        } else {
          // no publish date
          if (!publishDate) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessDate} from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessDate} from ${sourceURL}.`;
            }
            // publish date included
          } else {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. ${publishDate}. <i>${workTitle}</i>. Retrieved on ${accessDate} from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. ${publishDate}. <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessDate} from ${sourceURL}.`;
            }
          }
        }
      }
    }
  }
};

/*
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
*/
