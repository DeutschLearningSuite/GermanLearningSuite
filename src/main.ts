import "./styles.css";

interface VocabularyItem {
  id: string;
  german: string;
  article: string;
  english: string;
  level: string;
  status: "active" | "trash";
}

const saveButton = document.getElementById(
  "saveWord"
) as HTMLButtonElement;

const vocabularyList = document.getElementById(
  "vocabularyList"
) as HTMLTableSectionElement;

function getVocabulary(): VocabularyItem[] {
  const data = localStorage.getItem("vocabulary");

  return data ? JSON.parse(data) : [];
}

function saveVocabulary(
  vocabulary: VocabularyItem[]
) {
  localStorage.setItem(
    "vocabulary",
    JSON.stringify(vocabulary)
  );
}

function renderVocabulary() {
  vocabularyList.innerHTML = "";

  const vocabulary = getVocabulary();

  vocabulary
    .filter((word) => word.status === "active")
    .forEach((word) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${word.article}</td>
        <td>${word.german}</td>
        <td>${word.english}</td>
        <td>${word.level}</td>

        <td>
          <button
            class="delete-btn"
            data-id="${word.id}"
          >
            Delete
          </button>
        </td>

        <td>
          <button
            class="restore-btn"
            data-id="${word.id}"
          >
            Restore
          </button>
        </td>
      `;

      vocabularyList.appendChild(row);
    });

  attachButtonEvents();
}

function attachButtonEvents() {

  document
    .querySelectorAll(".delete-btn")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const id =
          (button as HTMLElement).dataset.id;

        const vocabulary =
          getVocabulary();

        const word =
          vocabulary.find(
            (w) => w.id === id
          );

        if (!word) return;

        word.status = "trash";

        saveVocabulary(vocabulary);

        renderVocabulary();
      });
    });

  document
    .querySelectorAll(".restore-btn")
    .forEach((button) => {

      button.addEventListener("click", () => {

        const id =
          (button as HTMLElement).dataset.id;

        const vocabulary =
          getVocabulary();

        const word =
          vocabulary.find(
            (w) => w.id === id
          );

        if (!word) return;

        word.status = "active";

        saveVocabulary(vocabulary);

        renderVocabulary();
      });
    });
}

saveButton?.addEventListener(
  "click",
  () => {

    const germanWord =
      (
        document.getElementById(
          "germanWord"
        ) as HTMLInputElement
      ).value;

    const article =
      (
        document.getElementById(
          "article"
        ) as HTMLInputElement
      ).value;

    const englishMeaning =
      (
        document.getElementById(
          "englishMeaning"
        ) as HTMLInputElement
      ).value;

    const level =
      (
        document.getElementById(
          "level"
        ) as HTMLSelectElement
      ).value;

    if (
      !germanWord ||
      !article ||
      !englishMeaning
    ) {
      alert(
        "Please fill all fields"
      );
      return;
    }

    const vocabulary =
      getVocabulary();

    vocabulary.push({
      id:
        Date.now().toString(),

      german: germanWord,

      article: article,

      english: englishMeaning,

      level: level,

      status: "active",
    });

    saveVocabulary(vocabulary);

    renderVocabulary();

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
  }
);

renderVocabulary();