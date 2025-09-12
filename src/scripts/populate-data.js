import * as Header from "./header";

// get info about which topic was selected
export function handleTopicSelect(e) {
  const isInput =
    e.code === "Enter" || e.code === "Space" || e.type === "click";

  if (isInput) {
    transformData(e.target.id, e.target.textContent.trim());
  }
}

// populate data for chosen topic
async function transformData(topicID, topicName) {
  const dataArray = await getData();
  if (!dataArray) return;

  dataArray.quizzes.forEach((el) => {
    if (el.title === topicName) {
      Header.changeTopicIcon(el.icon, el);
      console.log(el);
    }
  });
}

// get data from JSON
async function getData() {
  const request = new Request("/data.json");

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Fetch error:", error);
  }
}
