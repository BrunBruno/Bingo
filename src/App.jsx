import { useState, useEffect } from "react";
import classes from "./App.module.css";

function App() {
  const fields = [
    [
      "Cipka!",
      "Skąd się biorą geje?",
      "Ale bym ci cipke wylizał.",
      "Ale mam malutką Kasiunie.",
      "Ale bym kogoś zabił.",
    ],
    [
      "Dawaj po strzale.",
      "Pijcie misiaki.",
      "Co za geje.",
      "Dziewczyny, przeliżcie się.",
      "Dawajcie czworokąt.",
    ],
    [
      "Znasz dużego?",
      "Jak można tyle pić?",
      "-",
      "Trza się najebać.",
      "Odpierdolmy jakiś szajs.",
    ],
    [
      "Geje!!!",
      "Ale mam w kurwe siana.",
      "Ale tu krzywo.",
      "Dawaj chodź na łape.",
      "A jestem kurwa mocny.",
    ],
    [
      "Daj gruby dmuchnąć.",
      "Ale masz fajną [wstaw imię].",
      "* Rozbiera się *",
      "* Bije Roberta *",
      "* Chce się mierzyć *",
    ],
  ];

  const [isAccepted, setIsAccepted] = useState(
    localStorage.getItem("isAccepted") === "true" ? true : false
  );
  const [isBingo, setIsBingo] = useState(
    localStorage.getItem("isBingo") === "true" ? true : false
  );
  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("selectedItems")) || []
  );
  const [markedItems, setMarkedItems] = useState(
    JSON.parse(localStorage.getItem("markedItems")) || []
  );

  useEffect(() => {
    localStorage.setItem("isAccepted", isAccepted);
    localStorage.setItem("isBingo", isBingo);
    localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    localStorage.setItem("markedItems", JSON.stringify(markedItems));

    if (markedItems.length > 0 && !isBingo) {
      checkIfAllMarked();
    }
  }, [isAccepted, isBingo, selectedItems, markedItems]);

  const clearSessionStorage = () => {
    localStorage.removeItem("isAccepted");
    localStorage.removeItem("isBingo");
    localStorage.removeItem("selectedItems");
    localStorage.removeItem("markedItems");

    location.reload();
  };

  const onSelectBlock = (text) => {
    if (isAccepted) {
      addAnswer(text);
    } else {
      selectAnswer(text);
    }
  };

  const selectAnswer = (text) => {
    if (selectedItems.length < 5 || selectedItems.includes(text)) {
      if (selectedItems.includes(text)) {
        setSelectedItems(selectedItems.filter((item) => item !== text));
      } else {
        setSelectedItems([...selectedItems, text]);
      }
    }
  };

  const addAnswer = (text) => {
    setMarkedItems((prevMarkedItems) => {
      if (prevMarkedItems.includes(text)) {
        return prevMarkedItems.filter((item) => item !== text);
      } else {
        return [...prevMarkedItems, text];
      }
    });
  };

  const checkIfAllMarked = () => {
    if (selectedItems.every((item) => markedItems.includes(item))) {
      setIsBingo(true);
      alert("BINGO!");
    }
  };

  return (
    <div className={classes.con}>
      <header className={classes.header} onClick={() => clearSessionStorage()}>
        {!isAccepted ? (
          <p>WYBIERZ SWOJE ODPOWIEDZI</p>
        ) : (
          <p>ZAZNACZ CO PADŁO</p>
        )}
      </header>

      <div className={classes.grid}>
        {fields.map((row, j) =>
          row.map((text, i) =>
            text === "-" ? (
              <div
                key={`${i}-${j}`}
                className={classes.block}
                style={{ padding: 0 }}
              >
                <p className={classes.p}></p>
              </div>
            ) : (
              <div
                key={`${i}-${j}`}
                className={`${classes.block} ${
                  selectedItems.includes(text) ? classes.selected : ""
                }`}
                onClick={() => onSelectBlock(text)}
              >
                {text}
                {markedItems.includes(text) ? (
                  <>
                    <p className={classes["mark-p"]} />
                    <p className={classes["mark-l"]} />
                  </>
                ) : null}
              </div>
            )
          )
        )}
      </div>

      <footer className={classes.footer}>
        {selectedItems.length == 5 && !isAccepted ? (
          <p className={classes.accept} onClick={() => setIsAccepted(true)}>
            ZATWIERDŹ
          </p>
        ) : null}
      </footer>
    </div>
  );
}

export default App;
