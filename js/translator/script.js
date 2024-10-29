const dropdowns = document.querySelectorAll(".dropdown-container"),
  inputLanguageDropdown = document.querySelector("#input-language"),
  outputLanguageDropdown = document.querySelector("#output-language");

function populateDropdown(dropdown, options) {
  dropdown.querySelector("ul").innerHTML = "";
  options.forEach((option) => {
    const li = document.createElement("li");
    const title = option.name + " (" + option.native + ")";
    li.innerHTML = title;
    li.dataset.value = option.code;
    li.classList.add("option");
    dropdown.querySelector("ul").appendChild(li);
  });
}
populateDropdown(inputLanguageDropdown, languages);
populateDropdown(outputLanguageDropdown, languages);

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("active");
  });

  dropdown.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", (e) => {
      //remove active class from current dropdowns
      dropdown.querySelectorAll(".option").forEach((item) => {
        item.classList.remove("active");
      });
      item.classList.add("active");
      const selected = dropdown.querySelector(".selected");
      selected.innerHTML = item.innerHTML;
      selected.dataset.value = item.dataset.value;
      translate();
    });
  });
});
document.addEventListener("click", (e) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

const swapBtn = document.querySelector(".swap-position"),
  inputLanguage = inputLanguageDropdown.querySelector(".selected"),
  outputLanguage = outputLanguageDropdown.querySelector(".selected"),
  inputTextElem = document.querySelector("#input-text"),
  outputTextElem = document.querySelector("#output-text");

swapBtn.addEventListener("click", (e) => {
  const temp = inputLanguage.innerHTML;
  inputLanguage.innerHTML = outputLanguage.innerHTML;
  outputLanguage.innerHTML = temp;

  const tempValue = inputLanguage.dataset.value;
  inputLanguage.dataset.value = outputLanguage.dataset.value;
  outputLanguage.dataset.value = tempValue;

  //swap text
  const tempInputText = inputTextElem.value;
  inputTextElem.value = outputTextElem.innerHTML;
  outputTextElem.innerHTML = tempInputText;

  translate();
});

function translate() {
  let inputTextElement = document.querySelector("#input-text");
  const inputText = inputTextElement.value;
  const inputLanguage =
    inputLanguageDropdown.querySelector(".selected").dataset.value;
  const outputLanguage =
    outputLanguageDropdown.querySelector(".selected").dataset.value;

  if (inputLanguage == "br" && outputLanguage != "br") {
    const hi_output = BrahmiToDevanagari(inputText);
    const sd = document.querySelector(".secret-div");
    sd.innerHTML = hi_output;
    let newInputText = document.querySelector(".secret-div").innerHTML;
    newInputText = newInputText.replace(/&nbsp;/g, "");
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${"hi"}&tl=${outputLanguage}&dt=t&q=${encodeURI(
      newInputText
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(hi_output, newInputText);
        outputTextElem.innerHTML = json[0].map((item) => item[0]).join("");
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (outputLanguage == "br" && inputLanguage != "br") {
    let newInputText = inputText.replace(/&nbsp;/g, "");
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${"hi"}&dt=t&q=${encodeURI(
      newInputText
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        const hi_output = json[0].map((item) => item[0]).join("");
        const br_output = DevanagariToBrahmi(hi_output).replace(/&nbsp;/g, "");
        outputTextElem.innerHTML = br_output;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
      inputText
    )}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json, inputText);
        outputTextElem.innerHTML = json[0].map((item) => item[0]).join("");
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

inputTextElem.addEventListener("input", (e) => {
  //limit input to 5000 characters
  if (inputTextElem.value.length > 5000) {
    inputTextElem.value = inputTextElem.value.slice(0, 5000);
  }
  translate();
});

const inputChars = document.querySelector("#input-chars");

inputTextElem.addEventListener("input", (e) => {
  inputChars.innerHTML = inputTextElem.value.length;
});

function DevanagariToBrahmi(text) {
  // alert("DevanagariToBrahmi");
  var a, b;
  a = text;
  b = "";
  var i;
  for (i = 0; i < a.length; i++) {
    var n = a.codePointAt(i);
    if (n === 0x20) {
      b += "&nbsp;&nbsp;"; // Replace space with four non-breaking spaces
    }
    switch (n) {
      case 0x902:
        b += "&#x11001";
        break;
      case 0x905: //A
        b += "&#x11005";
        break;
      case 0x906: //AA
        b += "&#x11006";
        break;
      case 0x907: //I
        b += "&#x11007";
        break;
      case 0x908: //II
        b += "&#x11008";
        break;
      case 0x909: //U
        b += "&#x11009";
        break;
      case 0x90a: // UU
        b += "&#x1100A";
        break;
      case 0x90b: //Vocalic R
        b += "&#x1100B";
        break;
      case 0x90c: //Vocalic L
        b += "&#x1100D";
        break;
      case 0x90f: // E
        b += "&#x1100F";
        break;
      case 0x910: // AI
        b += "&#x11010";
        break;
      case 0x913: // O
        b += "&#x11011";
        break;
      case 0x914: // AU
        b += "&#x11012";
        break;
      case 0x915: // KA
        b += "&#x11013";
        break;
      case 0x916: // KHA
        b += "&#x11014";
        break;
      case 0x917: // GA
        b += "&#x11015";
        break;
      case 0x918: // GHA
        b += "&#x11016";
        break;
      case 0x919: // NGA
        b += "&#x11017";
        break;
      case 0x91a: // CA
        b += "&#x11018";
        break;
      case 0x91b: // CHA
        b += "&#x11019";
        break;
      case 0x91c: // JA
        b += "&#x1101A";
        break;
      case 0x91d: // JHA
        b += "&#x1101B";
        break;
      case 0x91e: // NYA
        b += "&#x1101C";
        break;
      case 0x91f: // TTA
        b += "&#x1101D";
        break;
      case 0x920: // TTHA
        b += "&#x1101E";
        break;
      case 0x921: // DDA
        b += "&#x1101F";
        break;
      case 0x922: // DDHA
        b += "&#x11020";
        break;
      case 0x923: // NNA
        b += "&#x11021";
        break;
      case 0x924: // TA
        b += "&#x11022";
        break;
      case 0x925: // THA
        b += "&#x11023";
        break;
      case 0x926: // DA
        b += "&#x11024";
        break;
      case 0x927: // DHA
        b += "&#x11025";
        break;
      case 0x928: // NA
        b += "&#x11026";
        break;
      case 0x92a: //PA
        b += "&#x11027";
        break;
      case 0x92b: //PHA
        b += "&#x11028";
        break;
      case 0x92c: // BA
        b += "&#x11029";
        break;
      case 0x92d: // BHA
        b += "&#x1102A";
        break;
      case 0x92e: // MA
        b += "&#x1102B";
        break;
      case 0x92f: // YA
        b += "&#x1102C";
        break;
      case 0x930: // RA
        b += "&#x1102D";
        break;
      case 0x932: // LA
        b += "&#x1102E";
        break;
      case 0x933: // LLA
        b += "&#x11034";
        break;
      case 0x935: // VA
        b += "&#x1102F";
        break;
      case 0x936: // SHA
        b += "&#x11030";
        break;
      case 0x937: // SSA
        b += "&#x11031";
        break;
      case 0x938: // SA
        b += "&#x11032";
        break;
      case 0x939: // HA
        b += "&#x11033";
        break;
      case 0x93e: // AA
        b += "&#x11038";
        break;
      case 0x93f: // I
        b += "&#x1103A";
        break;
      case 0x940: // II
        b += "&#x1103B";
        break;
      case 0x941: // U
        b += "&#x1103C";
        break;
      case 0x942: //UU
        b += "&#x1103D";
        break;
      case 0x943: //R
        b += "&#x1103E";
        break;
      case 0x944: //RR
        b += "&#x1103F";
        break;
      case 0x962: //L
        b += "&#x11040";
        break;
      case 0x963: //LL
        b += "&#x11041";
        break;
      case 0x947: //E
        b += "&#x11042";
        break;
      case 0x948: //AI
        b += "&#x11043";
        break;
      case 0x94b: //O
        b += "&#x11044";
        break;
      case 0x94c: //AU
        b += "&#x11045";
        break;
      case 0x94d: //virama
        b += "&#x11046";
        break;
      case 0x964: // danda
        b += "&#x11047";
        break;
      case 0x965: // double danda
        b += "&#x11048";
        break;
      case 0x966: //0
        b += "&#x11066";
        break;
      case 0x967: //1
        b += "&#x11067";
        break;
      case 0x968: //2
        b += "&#x11068";
        break;
      case 0x969: //3
        b += "&#x11069";
        break;
      case 0x96a: //4
        b += "&#x1106A";
        break;
      case 0x96b: //5
        b += "&#x1106B";
        break;
      case 0x96c: //6
        b += "&#x1106C";
        break;
      case 0x96d: //7
        b += "&#x1106D";
        break;
      case 0x96e: //8
        b += "&#x1106E";
        break;
      case 0x96f: //9
        b += "&#x1106F";
        break;
      default:
        b += "&#" + n;
        break;
    }
  }
  return b;
}

function BrahmiToDevanagari(text) {
  // alert("BrahmiToDevanagari");
  var a, b;
  a = text;
  b = "";
  var i;
  for (i = 0; i < a.length; i++) {
    var n = a.codePointAt(i);
    switch (n) {
      case 0x11001:
        b += "&#x902";
        i++;
        break;
      case 0x11005:
        b += "&#x00905";
        i++;
        break;
      case 0x11006: //AA
        b += "&#x906";
        i++;
        break;
      case 0x11007: //I
        b += "&#x907";
        i++;
        break;
      case 0x11008: //II
        b += "&#x908";
        i++;
        break;
      case 0x11009: //U
        b += "&#x909";
        i++;
        break;
      case 0x1100a: // UU
        b += "&#x90A";
        i++;
        break;
      case 0x1100b: //Vocalic R
        b += "&#x90B";
        i++;
        break;
      case 0x1100d: //Vocalic L
        b += "&#x90C";
        i++;
        break;
      case 0x1100f: // E
        b += "&#x90F";
        i++;
        break;
      case 0x11010: // AI
        b += "&#x910";
        i++;
        break;
      case 0x11011: // O
        b += "&#x913";
        i++;
        break;
      case 0x11012: // AU
        b += "&#x914";
        i++;
        break;
      case 0x11013: // KA
        b += "&#x915";
        i++;
        break;
      case 0x11014: // KHA
        b += "&#x916";
        i++;
        break;
      case 0x11015: // GA
        b += "&#x917";
        i++;
        break;
      case 0x11016: // GHA
        b += "&#x918";
        i++;
        break;
      case 0x11017: // NGA
        b += "&#x919";
        i++;
        break;
      case 0x11018: // CA
        b += "&#x91A";
        i++;
        break;
      case 0x11019: // CHA
        b += "&#x91B";
        i++;
        break;
      case 0x1101a: // JA
        b += "&#x91C";
        i++;
        break;
      case 0x1101b: // JHA
        b += "&#x91D";
        i++;
        break;
      case 0x1101c: // NYA
        b += "&#x91E";
        i++;
        break;
      case 0x1101d: // TTA
        b += "&#x91F";
        i++;
        break;
      case 0x1101e: // TTHA
        b += "&#x920";
        i++;
        break;
      case 0x1101f: // DDA
        b += "&#x921";
        i++;
        break;
      case 0x11020: // DDHA
        b += "&#x922";
        i++;
        break;
      case 0x11021: // NNA
        b += "&#x923";
        i++;
        break;
      case 0x11022: // TA
        b += "&#x924";
        i++;
        break;
      case 0x11023: // THA
        b += "&#x925";
        i++;
        break;
      case 0x11024: // DA
        b += "&#x926";
        i++;
        break;
      case 0x11025: // DHA
        b += "&#x927";
        i++;
        break;
      case 0x11026: // NA
        b += "&#x928";
        i++;
        break;
      case 0x11027: //PA
        b += "&#x92A";
        i++;
        break;
      case 0x11028: //PHA
        b += "&#x92B";
        i++;
        break;
      case 0x11029: // BA
        b += "&#x92C";
        i++;
        break;
      case 0x1102a: // BHA
        b += "&#x92D";
        i++;
        break;
      case 0x1102b: // MA
        b += "&#x92E";
        i++;
        break;
      case 0x1102c: // YA
        b += "&#x92F";
        i++;
        break;
      case 0x1102d: // RA
        b += "&#x930";
        i++;
        break;
      case 0x1102e: // LA
        b += "&#x932";
        i++;
        break;
      case 0x11034: // LLA
        b += "&#x933";
        i++;
        break;
      case 0x1102f: // VA
        b += "&#x935";
        i++;
        break;
      case 0x11030: // SHA
        b += "&#x936";
        i++;
        break;
      case 0x11031: // SSA
        b += "&#x937";
        i++;
        break;
      case 0x11032: // SA
        b += "&#x938";
        i++;
        break;
      case 0x11033: // HA
        b += "&#x939";
        i++;
        break;
      case 0x11038: // AA
        b += "&#x93E";
        i++;
        break;
      case 0x1103a: // I
        b += "&#x93F";
        i++;
        break;
      case 0x1103b: // II
        b += "&#x940";
        i++;
        break;
      case 0x1103c: // U
        b += "&#x941";
        i++;
        break;
      case 0x1103d: //UU
        b += "&#x942";
        i++;
        break;
      case 0x1103e: //R
        b += "&#x943";
        i++;
        break;
      case 0x1103f: //RR
        b += "&#x944";
        i++;
        break;
      case 0x11040: //L
        b += "&#x962";
        i++;
        break;
      case 0x11041: //LL
        b += "&#x963";
        i++;
        break;
      case 0x11042: //E
        b += "&#x947";
        i++;
        break;
      case 0x11043: //AI
        b += "&#x948";
        i++;
        break;
      case 0x11044: //O
        b += "&#x94B";
        i++;
        break;
      case 0x11045: //AU
        b += "&#x94C";
        i++;
        break;
      case 0x11046: //virama
        b += "&#x94D";
        i++;
        break;
      case 0x11047: // danda
        b += "&#x964";
        i++;
        break;
      case 0x11048: // double danda
        b += "&#x965";
        i++;
        break;
      case 0x11066: //0
        b += "&#x966";
        i++;
        break;
      case 0x11067: //1
        b += "&#x967";
        i++;
        break;
      case 0x11068: //2
        b += "&#x968";
        i++;
        break;
      case 0x11069: //3
        b += "&#x969";
        i++;
        break;
      case 0x1106a: //4
        b += "&#x96A";
        i++;
        break;
      case 0x1106b: //5
        b += "&#x96B";
        i++;
        break;
      case 0x1106c: //6
        b += "&#x96C";
        i++;
        break;
      case 0x1106d: //7
        b += "&#x96D";
        i++;
        break;
      case 0x1106e: //8
        b += "&#x96E";
        i++;
        break;
      case 0x1106f: //9
        b += "&#x96F";
        i++;
        break;
      default:
        b += "&#" + n;
    }
  }
  return b;
}

function copyBhrami() {
  const output = document.getElementById("output-text");
  const text = output.innerText || output.textContent;
  const copyButton = document.getElementById("copy-btn");
  const copyMessage = document.getElementById("copy-message");
  navigator.clipboard
    .writeText(text)
    .then(() => {
      // Position the message near the button
      const buttonRect = copyButton.getBoundingClientRect();
      copyMessage.style.left = `${buttonRect.left + window.scrollX}px`;
      copyMessage.style.top = `${buttonRect.bottom + window.scrollY + 5}px`;
      copyMessage.style.display = "block"; // Show the message

      // Hide the message after 2 seconds
      setTimeout(() => {
        copyMessage.style.display = "none";
      }, 2000);
    })
    .catch((err) => {
      console.error("Error copying text: ", err);
    });
}
document.getElementById("pasteButton").addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    let data = document.getElementById("input-text").value;
    document.getElementById("input-text").innerText = data + " " + text;
    translate();
  } catch (err) {
    console.error("Failed to read clipboard contents: ", err);
  }
});

// let currentIndex = 0;
// const slides = document.querySelectorAll(".slide");
// const totalSlides = slides.length;

// function showSlide(index) {
//   const slidesContainer = document.querySelector(".slides");
//   slidesContainer.style.transform = `translateX(-${index * 100}%)`;
// }

// function nextSlide() {
//   currentIndex = (currentIndex + 1) % totalSlides;
//   showSlide(currentIndex);
// }

// // Automatically go to the next slide every 3 seconds
// setInterval(nextSlide, 3000);

function changeFontSize() {
  const fontSize = document.getElementById("font-size").value;
  const textArea = document.getElementById("input-text");
  textArea.style.fontSize = fontSize;
}

// document.addEventListener("DOMContentLoaded", function () {
//   setTimeout(function () {
//     // Select the first div in the body
//     const firstDiv = document.body.querySelector("div");
//     if (firstDiv) {
//       firstDiv.remove(); // Remove the first div
//     }
//   }, 1500); // 1000 milliseconds = 1 second
// });


document.addEventListener("DOMContentLoaded", function () {
  const speakInputButton = document.getElementById("speak-input-btn");
  const speakOutputButton = document.getElementById("speak-output-btn");
  const inputText = document.getElementById("input-text");
  const outputText = document.getElementById("output-text");
  // const inputLanguageDropdown = document.getElementById("input-language-dropdown"); // Assuming you have this element
  // const outputLanguageDropdown = document.getElementById("output-language-dropdown"); // Assuming you have this element
  
  let isSpeaking = false; // State to track if speech is ongoing
  let currentSpeech; // To keep track of the current SpeechSynthesisUtterance

  function speakText(text, lang) {
    if (!text) {
      alert("Please enter some text to speak.");
      return;
    }
    let newInputText = text;
    let newLang = lang;
    
    if (lang == "br") {
      const hi_output = BrahmiToDevanagari(text);
      const sd = document.querySelector(".secret-div");
      sd.innerHTML = hi_output;
      newInputText = sd.innerHTML.replace(/&nbsp;/g, "");
      newLang = "hi";
    }

    // If we're already speaking, we stop the current speech
    if (isSpeaking && currentSpeech) {
      window.speechSynthesis.cancel(); // Stops current speech
      isSpeaking = false;
      return;
    }

    currentSpeech = new SpeechSynthesisUtterance();
    currentSpeech.text = newInputText;
    currentSpeech.lang = newLang; // Change language as needed
    currentSpeech.rate = 0.9; // Change the rate of speech
    currentSpeech.pitch = 1; // Change the pitch of speech

    // Set up event listeners to update speaking state
    currentSpeech.onstart = () => {
      isSpeaking = true;
    };
    currentSpeech.onend = () => {
      isSpeaking = false;
    };

    window.speechSynthesis.speak(currentSpeech);
  }

  speakInputButton.addEventListener("click", () => {
    const inputLanguage = inputLanguageDropdown.querySelector(".selected").dataset.value;
    speakText(inputText.value.replace(/&nbsp;/g, ""), inputLanguage);
  });

  speakOutputButton.addEventListener("click", () => {
    const outputLanguage = outputLanguageDropdown.querySelector(".selected").dataset.value;
    console.log(outputLanguage);
    speakText(outputText.innerHTML.replace(/&nbsp;/g, ""), outputLanguage);
  });
});


function openEditor(){
  let editor = document.querySelector('.inline-editor');
  if(editor.style.display == 'none'){
    editor.style.display = '';
  }else{
    editor.style.display = 'none';
  }
  if (editor) {
    // Remove the inner div
    let innerDiv = editor.querySelector('div'); // Assuming it's the first div
    if (innerDiv) {
      editor.removeChild(innerDiv);
    }
  }
}


// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');

// hamburger.addEventListener('click', () => {
//     navLinks.classList.toggle('open');
//     hamburger.classList.toggle('open');
// });
