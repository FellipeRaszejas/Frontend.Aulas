const KEYBOARD_ROWS = [
  [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P"
  ],

  [
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L"
  ],

  [
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "BACKSPACE"
  ]
];

function Keyboard({
  onKey,
  keyStatus
}) {
  return (
    <div className="keyboard">

      {KEYBOARD_ROWS.map(
        (row, rowIndex) => (

          <div
            className="keyboard-row"
            key={rowIndex}
          >

            {row.map((key) => {

              const status =
                keyStatus[key];

              const isSpecial =
                key === "ENTER" ||
                key === "BACKSPACE";

              return (
                <button
                  key={key}
                  className={[
                    "key",

                    isSpecial
                      ? "key-special"
                      : "",

                    status
                      ? `key-${status}`
                      : ""
                  ].join(" ")}
                  onClick={() =>
                    onKey(key)
                  }
                >

                  {key ===
                  "BACKSPACE"
                    ? "⌫"
                    : key}

                </button>
              );
            })}

          </div>

        )
      )}

    </div>
  );
}

export default Keyboard;