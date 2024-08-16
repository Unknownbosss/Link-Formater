const toggleBtn = document.getElementById("toggle-mode");
const inputLinks = document.getElementById("input-links");
const convertBtn = document.getElementById("convert-btn");
const outputLinks = document.getElementById("output-links");
const copyBtn = document.getElementById("copy-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const batchInfo = document.getElementById("batch-info");

// Add an event listener to the toggle button
toggleBtn.addEventListener("click", () => {
  // Toggle the light/dark class on the body element
  document.body.classList.toggle("dark");
});

// Initialize batch variables
let currentBatch = 0;
let batches = [];

// Convert button event listener
convertBtn.addEventListener("click", () => {
  // Split input links into array
  const links = inputLinks.value.trim().split("\n");

  // Format links by adding https:// if necessary
  const formattedLinks = links.map((link) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      link = "https://" + link;
    }
    return link;
  });

  // Split formatted links into batches
  batches = splitIntoBatches(formattedLinks, 200);

  // Display first batch
  displayBatch();
});

// Copy button event listener
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(outputLinks.value);
});

// Previous batch button event listener
prevBtn.addEventListener("click", () => {
  if (currentBatch > 0) {
    currentBatch--;
    displayBatch();
  }
});

// Next batch button event listener
nextBtn.addEventListener("click", () => {
  if (currentBatch < batches.length - 1) {
    currentBatch++;
    displayBatch();
  }
});

// Function to split array into batches
function splitIntoBatches(arr, batchSize) {
  const batches = [];
  for (let i = 0; i < arr.length; i += batchSize) {
    batches.push(arr.slice(i, i + batchSize));
  }
  return batches;
}

// Function to display current batch
function displayBatch() {
  outputLinks.value = batches[currentBatch].join("\n");
  batchInfo.textContent = `Batch ${currentBatch + 1} of ${batches.length}`;
}
