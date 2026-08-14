function Tile({
  letter,
  status
}) {
  return (
    <div
      className={[
        "tile",

        letter
          ? "tile-filled"
          : "",

        status
          ? `tile-${status}`
          : ""
      ].join(" ")}
    >
      {letter}
    </div>
  );
}

function Board({
  board,
  evaluations,
  currentRow
}) {
  return (
    <div className="board">

      {board.map(
        (row, rowIndex) => {

          const submitted =
            rowIndex < currentRow;

          return (
            <div
              className="board-row"
              key={rowIndex}
            >

              {row.map(
                (
                  letter,
                  columnIndex
                ) => {

                  const status =
                    submitted
                      ? evaluations[
                          rowIndex
                        ]?.[
                          columnIndex
                        ]
                      : "";

                  return (
                    <Tile
                      key={
                        columnIndex
                      }
                      letter={letter}
                      status={status}
                    />
                  );
                }
              )}

            </div>
          );
        }
      )}

    </div>
  );
}

export default Board;