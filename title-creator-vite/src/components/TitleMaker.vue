<script setup>
import { ref } from "vue";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
const fullContent = ref("");
const titleP = ref("");
const textColor = ref("#ffffff");
const backgroundColor = ref("#000000");
const borderColor = ref("#ffffff");
const borderWidth = ref(0);
const bgTransparncy = ref(30);
const fontSize = ref(16);
const wordPerImage = ref(6);
const htmlData = ref(null);
const isGenerating = ref(false);
const onFullContentChange = (e) => {
  const divslist = createDivElementFromArray(
    getSubstrings(fullContent.value, wordPerImage.value)
  );
  htmlData.value = divslist;
  console.log(textColor, backgroundColor);
};

let generatePdfBack = (element, name) => {
  console.log(element);
  html2canvas(element, {
    scale: 4,
    allowTaintedCanvas: true,
    backgroundColor: null,
  }).then(function (canvas) {
    canvas.toBlob(function (blob) {
      console.log("blob", blob);
      // Save the image using FileSaver.js
      saveAs(blob, `${name}.png`);
    });
  });
};
function generateTitles(e) {
  e.preventDefault();
  const titleC = document.querySelectorAll(".title-c");
  let startingValue = 0;
  let endingValue = titleC.length;
  for (let i = startingValue; i < endingValue; i++) {
    if (i == startingValue) {
      setTimeout(() => {
        generatePdfBack(titleC[i], `title_${i}`);
      }, 200);
    } else {
      setTimeout(() => {
        setTimeout(() => {
          generatePdfBack(titleC[i], `title_${i}`);
        }, 200);
      }, (i - 1) * 1000);
    }
  }
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}` : null;
}
function createDivElementFromArray(listContent) {
  let result = ``;
  for (const iterator in listContent) {
    result += `<div class=''>
      <h5 class='text-black font-bold text-start'>title_${iterator}.png</h5>
    <div 
        style='border:1px solid rgb(54, 54, 54) !important; width: max-content;'>
    <div class='title-c' 
        style='width: 480px; height:270px; background: transparent; position: relative;'>
    <div 
        style='
            padding: 0.1rem 1rem;
            padding-top: 0rem;
            padding-bottom: 1rem;
            border-radius: 0.4rem;
            color: ${
              textColor.value ? textColor.value : "rgb(54, 54, 54)"
            } !important;
            background-color: ${
              backgroundColor.value ? `rgba(${hexToRgb(backgroundColor.value)},${bgTransparncy.value}%)` : "white"
            } !important;
            border: ${borderWidth.value}px solid ${
              borderColor.value ? borderColor.value : "rgb(54, 54, 54)"
            } !important;
            font-size: ${fontSize.value}px;
            text-align: center;
            font-weight: 700;
            width: max-content;
            margin: 0;
            line-height: 1;
            position: absolute;
            left: 50%;
            bottom: 5%;
            transform: translateX(-50%);
        '>${listContent[iterator]}
        </div>
        </div>
        </div>
        </div>`;
  }
  return result;
}

function getSubstrings(inputString, wordCount) {
  const words = inputString.split(/\s+/); // Split the string into an array of words
  const result = [];
  let currentSubstring = [];
  let currentWordCount = 0;

  words.forEach((word, index) => {
    // Add the current word to the substring and increment the word counter
    currentSubstring.push(word);
    currentWordCount++;

    // Check if we've added the required number of words or if the word ends with a period
    if (
      currentWordCount === wordCount ||
      word.endsWith(".") ||
      word.endsWith("।")
    ) {
      // Join the current substring and push it to the result array
      result.push(currentSubstring.join(" "));
      currentSubstring = []; // Reset the current substring
      currentWordCount = 0; // Reset the word counter
    }
  });

  // If there are any leftover words, join and add them as a final substring
  if (currentSubstring.length > 0) {
    result.push(currentSubstring.join(" "));
  }

  return result;
}
const saveFile = () => {
  saveAs(blob, "hello world.txt");
};
</script>
<template>
  <div class="flex justify-start">
    <section class="w-64 bg-gray-50 border border-gray-400">
      <h4 class="py-2 font-bold bg-gray-600 text-gray-50">Settings</h4>
      <div
        class="flex justify-between w-full border-t border-gray-400 px-2 py-1"
      >
        <label class="text-sm font-bold text-gray-500">Change Text Color</label>
        <input
          class=""
          v-model="textColor"
          @input="onFullContentChange"
          type="color"
        />
      </div>
      <div
        class="flex justify-between w-full border-t border-gray-400 px-2 py-1"
      >
        <label class="text-sm font-bold text-gray-500">Change BG Color</label>
        <input
          class=""
          v-model="backgroundColor"
          @input="onFullContentChange"
          type="color"
        />
      </div>

      <div
        class="flex justify-between w-full border-t border-b border-gray-400 px-2 py-1"
      >
        <label class="text-sm font-bold text-gray-500">Bg Transparency</label>
        <input
          class="w-12"
          v-model="bgTransparncy"
          @input="onFullContentChange"
          type="number"
        />
      </div>
      <div
        class="flex justify-between w-full border-t border-gray-400 px-2 py-1"
      >
        <label class="text-sm font-bold text-gray-500">Change Border Color</label>
        <input
          class=""
          v-model="borderColor"
          @input="onFullContentChange"
          type="color"
        />
      </div>

      <div
        class="flex justify-between w-full border-t border-b border-gray-400 px-2 py-1"
      >
        <label class="text-sm font-bold text-gray-500">Border Width</label>
        <input
          class="w-12"
          v-model="borderWidth"
          @input="onFullContentChange"
          type="number"
        />
      </div>
      <div
        class="flex justify-between w-full border-t border-b border-gray-400 px-2 py-1"
      >
        <label class="text-sm font-bold text-gray-500">Font Size In Rem</label>
        <input
          class="w-12"
          v-model="fontSize"
          @input="onFullContentChange"
          type="number"
        />
      </div>
      <div
        class="flex justify-between w-full border-t border-b border-gray-400 px-2 py-1"
      >
        <label class="text-sm font-bold text-gray-500">Word Per Image</label>
        <input
          class="w-12"
          v-model="wordPerImage"
          @input="onFullContentChange"
          type="number"
        />
      </div>
      <div>
        <p class="text-sm font-bold text-cyan-500 py-2 px-1">
          Output Dimension -> 1920x1080px
        </p>
      </div>
    </section>
    <div class="p-4 w-[1000px]">
      <div>
        
      </div>
      <div class="h-[300px] w-[500px] overflow-scroll flex space-x-2 border border-black" v-if="htmlData" v-html="htmlData"></div>
      <div
        v-else
        style="border: 1px solid rgb(54, 54, 54) !important; width: max-content"
      >
        <div
          class="title-c"
          style="
            width: 480px;
            height: 270px;
            background: transparent;
            position: relative;
          "
        >
          <div
            style="
              padding: 0.1rem 1rem;
              padding-top: 0rem;
              padding-bottom: 1rem;
              border-radius: 0.4rem;
              background-color: rgba(0, 0, 0, 30%) !important;
              color: rgb(254, 254, 254) !important;
              border: 0px solid rgb(0, 0, 0) !important;
              font-size: 1rem;
              text-align: center;
              font-weight: 700;
              width: max-content;
              margin: 0;
              line-height: 1;
              position: absolute;
              left: 50%;
              bottom: 5%;
              transform: translateX(-50%);
            "
          >
            Your video subtitle will be here
          </div>
        </div>
      </div>

      <div
        class="mt-2 w-full mb-4 border border-gray-200 rounded-lg bg-gray-50"
      >
        <div class="px-4 py-2 bg-white rounded-t-lg">
          <label for="titletext" class="sr-only">Your titletext</label>
          <textarea
            id="titletext"
            rows="12"
            v-model="fullContent"
            @input="onFullContentChange"
            class="w-full px-0 text-sm text-gray-900 bg-white border-0 focus:ring-0 "
            placeholder="Write a titletext..."
            required
          ></textarea>
        </div>
        <div
          class="flex items-center justify-between px-3 py-2 border-t"
        >
          <button
            type="button"
            v-if="!isGenerating"
            @click="generateTitles"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
