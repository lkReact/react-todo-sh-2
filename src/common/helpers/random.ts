export function keyUID(length: number = 8) {
  return Array.from({ length }, () => Math.random().toString(36)[2]).join("");
}

export function generateRandomWord() {
  const words = [
    "apple",
    "banana",
    "orange",
    "grape",
    "kiwi",
    "pear",
    "melon",
    "strawberry",
    "elephant",
    "lion",
    "tiger",
    "giraffe",
    "zebra",
    "monkey",
    "penguin",
    "dolphin",
    "ocean",
    "mountain",
    "forest",
    "desert",
    "river",
    "lake",
    "sunflower",
    "rainbow",
    "guitar",
    "piano",
    "violin",
    "drums",
    "trumpet",
    "flute",
    "saxophone",
    "accordion",
    "computer",
    "keyboard",
    "mouse",
    "monitor",
    "printer",
    "laptop",
    "tablet",
    "smartphone",
  ];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

export function generateRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
