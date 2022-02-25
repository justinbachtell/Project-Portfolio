/* TODO: 
  - Retain text formatting when copying to clipboard
  - Add additional citation types and styles
  - Validation checks and colors
  - Logic that adds/removes fields based on citation type/style
*/

// Clear console on refresh
console.clear();

// Select DOM elements and apply variables
const result = document.getElementById("result");
const container = document.querySelector(".container");
const firstName = document.getElementById("firstname").value;
const middleInitial = document.getElementById("midinitial").value;
const lastName = document.getElementById("lastname").value;
const workTitle = document.getElementById("worktitle").value;
const platformTitle = document.getElementById("platformtitle").value;
const publisher = document.getElementById("publisher").value;
const publishYear = document.getElementById("publishyear").value;
const publishMonth = document.getElementById("publishmonth").value;
const publishDay = document.getElementById("publishday").value;
const accessYear = document.getElementById("accessyear").value;
const accessMonth = document.getElementById("accessmonth").value;
const accessDay = document.getElementById("accessday").value;
const sourceURL = document.getElementById("source-url").value;
const citationStyle = document.getElementById("citation-style").value;
const sourceType = document.getElementById("source-type");
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

const populateWebsiteFields = () => {
  let type = sourceType.value;
  switch (type) {
    case "website":
      container.innerHTML += `<div class="field">
      <select name="citation" id="citation-style">
        <option value="" selected disabled>Choose a citation style</option>
        <option value="apa">APA 7th</option>
        <option value="mla" disabled>MLA</option>
        <option value="chicago" disabled>Chicago 17th</option>
        <option value="turabian" disabled>Turabian 9th</option>
      </select>
    </div>
  </div>

  <div class="fields">
    <span class="fields__title field-title">Author(s)</span>
    <div class="field">
      <label for="firstname">Author's First Name:</label>
      <input type="text" id="firstname" />
    </div>
    <div class="field">
      <label for="midinitial">Author's Middle Initial:</label>
      <input type="text" id="midinitial" />
    </div>
    <div class="field">
      <label for="lastname">Author's Last Name:</label>
      <input type="text" id="lastname" />
    </div>
  </div>

  <div class="fields">
    <span class="publication__title field-title">Publication Info</span>
    <div class="field">
      <label for="worktitle">Title of Work:</label>
      <input type="text" id="worktitle" />
    </div>
    <div class="field">
      <label for="platformtitle">Journal/Website Title:</label>
      <input type="text" id="platformtitle" />
    </div>
    <div class="field">
      <label for="publisher">Publisher:</label>
      <input type="text" id="publisher" />
    </div>
    <div class="field">
      <label>Date Published:</label>
      <input type="text" id="publishyear" placeholder="Year" minlength="3" maxlength="4" pattern="[0-9]{3,4}" title="Year that work was published."/>
      <select name="publishmonth" id="publishmonth" title="Month that work was published.">
        <option value="" selected>Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      <input type="text" id="publishday" placeholder="Day" minlength="1" maxlength="2" pattern="[0-9]{1,2}" title="Day that work was published."/>
    </div>
    <div class="field">
      <label for="dateaccessed">Date Accessed:</label>
      <input type="text" id="accessyear" placeholder="Year" minlength="3" maxlength="4" pattern="[0-9]{3,4}" title="Year that you accessed the work."/>
      <select name="accessmonth" id="accessmonth" title="Month that you accessed the work.">
        <option value="" selected>Month</option>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      <input type="text" id="accessday" placeholder="Day" minlength="1" maxlength="2" pattern="[0-9]{1,2}" title="Day that you accessed the work."/>
    </div>
    <div class="field">
      <label for="source-url">Source URL:</label>
      <input
        type="url"
        id="source-url"
        placeholder="https://www.website.com"
      required />
    </div>
  </div>

  <button onclick="refreshPage()" class="btn generate" id="generate">
    Generate Citation
  </button>
</div>`;
      break;
  }
};

const updateCitation = () => {
  result.innerHTML = "";
  citationStyleAPA();
};

// Display citation with chosen citation style
window.onload = generateCitation = () => {
  result.innerHTML = "";
  citationCopyBtn = false;
  copyInfo.style.opacity = 0;
  styles = citationStyle.value;
  switch (styles) {
    case "apa":
      citationStyleAPA();
      validateForm();
      citationCopyBtn = true;
      copyInfo.style.opacity = 1;
      break;
    default:
      result.innerHTML = "";
      break;
  }
};

const autosaveData = () => {
  if (sessionStorage.getItem("autosave")) {
    firstName.value = sessionStorage.getItem("autosave");
  }

  firstName.addEventListener("change", function () {
    sessionStorage.setItem("autosave", firstName.value);
  });
};

// Function to refresh page prior to clicking generate citation
const refreshPage = () => {
  autosaveData();
  document.location.reload();
};

// Getting the bounds of the result viewbox container
let resultViewboxBound = {
  left: resultViewbox.getBoundingClientRect().left,
  top: resultViewbox.getBoundingClientRect().top,
};
// This will update the position of the copy button based on mouse Position
resultViewbox.addEventListener("mousemove", (e) => {
  resultViewboxBound = {
    left: resultViewbox.getBoundingClientRect().left,
    top: resultViewbox.getBoundingClientRect().top,
  };
  if (citationCopyBtn) {
    copyBtn.style.opacity = "1";
    copyBtn.style.pointerEvents = "all";
    copyBtn.style.setProperty("--x", `${e.x - resultViewboxBound.left}px`);
    copyBtn.style.setProperty("--y", `${e.y - resultViewboxBound.top}px`);
  } else {
    copyBtn.style.opacity = "0";
    copyBtn.style.pointerEvents = "none";
  }
});
window.addEventListener("resize", (e) => {
  resultViewboxBound = {
    left: resultViewbox.getBoundingClientRect().left,
    top: resultViewbox.getBoundingClientRect().top,
  };
});

// Copy citation in clipboard
copyBtn.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const citation = result.innerText;
  if (!citation || citation == "CLICK GENERATE") {
    return;
  }
  textarea.value = citation;
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 99999);

  // Copy text inside citation
  navigator.clipboard
    .writeText(textarea.value)
    .then(() => {
      console.log(`Copied to clipboard: "${textarea.value}"`);
    })
    .catch((err) => {
      console.error(`Error copying text to clipboard: ${err}`);
    });

  textarea.remove();

  copyClick();
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
  copyInfo.style.color = "rgba(255, 255, 255, 0)";
  await delay(100);
  result.style.background = "white";
  result.style.color = "black";
  await delay(5000);
  copiedInfo.style.opacity = 0;
  copyInfo.style.color = "black";
}

// Function to validate form entries
const validateForm = () => {
  if (document.getElementById("source-url").value == "") {
    // alert("Please provide a valid URL.");
    document.getElementById("source-url").focus();
    document.getElementById("source-url").style.outline = "2px solid red";
  }
};

/***** APA Citation Style *****/
const citationStyleAPA = () => {
  if (!lastName && !workTitle) {
    result.innerHTML = "";
  } else {
    // no access year entered
    if (!accessYear) {
      // no author
      if (!lastName) {
        // no publish date
        if (!publishYear) {
          // no platform title
          if (!platformTitle) {
            result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
            // platform title included
          } else {
            result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
          }
          // publish date included
        } else {
          // no publish month
          if (!publishMonth) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
            }
            // no publish day
          } else if (!publishDay) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
            }
            // full publish date included
          } else {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
            }
          }
        }
        // author included
      } else {
        // no first name
        if (!firstName) {
          // no publish date
          if (!publishYear) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
            }
            // publish date included
          } else {
            // no publish month
            if (!publishMonth) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
              // no publish day
            } else if (!publishDay) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
              // full publish date included
            } else {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
            }
          }
          // first name included
        } else {
          // no middle initial
          if (!middleInitial) {
            // no publish date
            if (!publishYear) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
              // publish date included
            } else {
              // no publish month
              if (!publishMonth) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
                // no publish day
              } else if (!publishDay) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
                // full publish date included
              } else {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
              }
            }
            // middle initial included
          } else {
            // no publish date
            if (!publishYear) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
              }
              // publish date included
            } else {
              // no publish month
              if (!publishMonth) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
                // no publish day
              } else if (!publishDay) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
                // full publish date included
              } else {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved from ${sourceURL}.`;
                }
              }
            }
          }
        }
      }
      // access year enetered
    } else {
      // no author
      if (!lastName) {
        // no publish date
        if (!publishYear) {
          // no platform title
          if (!platformTitle) {
            result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            // platform title included
          } else {
            result.innerHTML = `${publisher}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
          }
          // publish date included
        } else {
          // no publish month
          if (!publishMonth) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessMonth}, ${accessYear}, from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            }
            // no publish day
          } else if (!publishDay) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessMonth}, ${accessYear}, from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            }
            // full publish date included
          } else {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${publisher}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            }
          }
        }
        // author included
      } else {
        // no first name
        if (!firstName) {
          // no publish date
          if (!publishYear) {
            // no platform title
            if (!platformTitle) {
              result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              // platform title included
            } else {
              result.innerHTML = `${lastName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
            }
            // publish date included
          } else {
            // no publish month
            if (!publishMonth) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
              // no publish day
            } else if (!publishDay) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
              // full publish date included
            } else {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
            }
          }
          // first name included
        } else {
          // no middle initial
          if (!middleInitial) {
            // no publish date
            if (!publishYear) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}, ${firstName}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
              // publish date included
            } else {
              // no publish month
              if (!publishMonth) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
                // no publish day
              } else if (!publishDay) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
                // full publish date included
              } else {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
              }
            }
            // middle initial included
          } else {
            // no publish date
            if (!publishYear) {
              // no platform title
              if (!platformTitle) {
                result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                // platform title included
              } else {
                result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (n.d.). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
              }
              // publish date included
            } else {
              // no publish month
              if (!publishMonth) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
                // no publish day
              } else if (!publishDay) {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
                // full publish date included
              } else {
                // no platform title
                if (!platformTitle) {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                  // platform title included
                } else {
                  result.innerHTML = `${lastName}, ${firstName} ${middleInitial}. (${publishYear}, ${publishMonth} ${publishDay}). <i>${workTitle}</i>. ${platformTitle}. Retrieved on ${accessMonth} ${accessDay}, ${accessYear}, from ${sourceURL}.`;
                }
              }
            }
          }
        }
      }
    }
  }
};

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
