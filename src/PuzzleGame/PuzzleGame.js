import React, { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import './PuzzleGame.css';

function PuzzlePiece({ imageUrl, onDrop }) {
  const [collectedProps, drop] = useDrop({
    accept: 'piece',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      style={{
        width: `calc(100% / var(--puzzle-size))`,
        height: `calc(100% / var(--puzzle-size))`,
        border: '1px solid black',
        opacity: collectedProps.isOver ? 0.5 : 1,
      }}
    >
      <img src={imageUrl} style={{ width: '100%' }} alt="puzzle piece" />
    </div>
  );
}

function PuzzleGame() {
  const [pieces, setPieces] = useState([]);
  const [puzzleSize, setPuzzleSize] = useState(3);

  const onDrop = (item) => {
    console.log('dropped item:', item);
  };

  useEffect(() => {
    // Load image URLs from user input or using an external library like react-dropzone
    const pieceUrls = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'image10.jpg', 'image11.jpg', 'image12.jpg', 'image13.jpg', 'image14.jpg', 'image15.jpg', ''];
    const shuffledUrls = pieceUrls.sort(() => Math.random() - 0.5);
    const puzzlePieces = [];

    for (let i = 0; i < puzzleSize * puzzleSize; i++) {
      puzzlePieces.push(shuffledUrls[i]);
    }

    setPieces(puzzlePieces);
  }, [puzzleSize]);

  const handleSizeChange = (event) => {
    const newPuzzleSize = parseInt(event.target.value, 10);
    setPuzzleSize(newPuzzleSize);
  };

  return (
    <div>
      <div className="size-selector">
        <label htmlFor="size-select">Select puzzle size:</label>
        <select id="size-select" value={puzzleSize} onChange={handleSizeChange}>
          <option value="3">3x3</option>
          <option value="5">5x5</option>
          <option value="15">15x15</option>
        </select>
      </div>
      <div className="puzzle-container" style={{ '--puzzle-size': puzzleSize }}>
      {pieces.map((piece) => (
      <PuzzlePiece key={piece.id} imageUrl={piece.imageUrl} onDrop={onDrop} />
          ))}
      </div>
    </div>
  );
}

export default PuzzleGame;