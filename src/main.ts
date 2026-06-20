import "./styles.css";

interface VocabularyItem {
  german: string;
  article: string;
  english: string;
}

const saveButton = document.getElementById(
  "saveWord"
) as HTMLButtonElement;

const vocabularyList = document.getElementById(
  "vocabularyList"
) as HTMLUListElement;

function loadVocabulary() {
  const storedData =
    localStorage.getItem("vocabulary");

  if (!storedData) return;

  const vocabulary: VocabularyItem[] =
    JSON.parse(storedData);

  vocabulary.forEach((word) => {
    displayWord(word);
  });
}

function displayWord(word: VocabularyItem) {
  const item = document.createElement("li");

  item.textContent =
    `${word.article} ${word.german} = ${word.english}`;

  vocabularyList.appendChild(item);
}

saveButton?.addEventListener("click", () => {

  const germanWord =
    (document.getElementById(
      "germanWord"
    ) as HTMLInputElement).value;

  const article =
    (document.getElementById(
      "article"
    ) as HTMLInputElement).value;

  const englishMeaning =
    (document.getElementById(
      "englishMeaning"
    ) as HTMLInputElement).value;

  if (
    !germanWord ||
    !article ||
    !englishMeaning
  ) {
    alert("Please fill all fields");
    return;
  }

  const newWord: VocabularyItem = {
    german: germanWord,
    article: article,
    english: englishMeaning,
  };

  const existingData =
    localStorage.getItem("vocabulary");

  const vocabulary: VocabularyItem[] =
    existingData
      ? JSON.parse(existingData)
      : [];

  vocabulary.push(newWord);

  localStorage.setItem(
    "vocabulary",
    JSON.stringify(vocabulary)
  );

  displayWord(newWord);

  (
    document.getElementById(
      "germanWord"
    ) as HTMLInputElement
  ).value = "";

  (
    document.getElementById(
      "article"
    ) as HTMLInputElement
  ).value = "";

  (
    document.getElementById(
      "englishMeaning"
    ) as HTMLInputElement
  ).value = "";
});

loadVocabulary();