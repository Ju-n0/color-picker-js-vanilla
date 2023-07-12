const container = document.createElement('div');
container.className = 'container';
const form = document.createElement('form');
const gridSizeInput = document.createElement('input');
gridSizeInput.setAttribute('placeholder', 'taille de la grille');
gridSizeInput.type = 'number';
const cellSizeInput = document.createElement('input');
cellSizeInput.setAttribute('placeholder', 'taille de la cellule');
cellSizeInput.type = 'number';

const button = document.createElement('button');
button.textContent = 'Générer la grille';

let currentColor = '';
const COLORS = {
  pink: 'rgb(251, 189, 240)',
  purple: 'rgb(129, 57, 163)',
  bluegreen: 'rgb(16, 180, 158)',
  yellow: 'rgb(247, 221, 103)',
  red: 'red',
};

form.append(gridSizeInput, cellSizeInput, button);
document.body.append(form, container, makeColorPicker());

drawGrid(10, 30);

function drawGrid(gridSize, cellSize) {
  for (let i = 0; i < gridSize; i++) {
    // créer la ligne (element html)
    const row = document.createElement('div');
    container.append(row);
    row.className = 'row';

    for (let j = 0; j < gridSize; j++) {
      // créer la cellule + ajoute dans la ligne
      const cell = document.createElement('div');
      cell.style.width = `${cellSize}px`;
      cell.style.height = cellSize + 'px';
      row.append(cell);
      cell.className = 'cell';
      cell.addEventListener('click', function (e) {
        if (cell.style.backgroundColor === currentColor) {
          cell.style.backgroundColor = '';
          return;
        }

        cell.style.backgroundColor = currentColor;
      });
      cell.addEventListener('mouseenter', function (e) {
        if (cell.style.backgroundColor === currentColor) {
          // cell.style.backgroundColor = '';
          return;
        }

        if (e.ctrlKey) {
          cell.style.backgroundColor = currentColor;
        }
      });
    }
  }
}
form.addEventListener('submit', function (submitEvent) {
  submitEvent.preventDefault();
  container.textContent = '';
  const gridSize = gridSizeInput.value;
  const cellSize = cellSizeInput.value;
  drawGrid(gridSize, cellSize);
});

function makeColorPicker() {
  const colorPickerContainer = document.createElement('div');
  colorPickerContainer.classList.add('color-picker--container');

  // const pinkButton = document.createElement('button');
  // pinkButton.classList.add('buttons', 'pinkButton');
  // pinkButton.addEventListener('click', function () {
  //   currentColor = COLORS.pink;
  // });

  // const purpleButton = document.createElement('button');
  // purpleButton.classList.add('buttons', 'purpleButton');
  // purpleButton.addEventListener('click', function () {
  //   currentColor = COLORS.purple;
  // });

  // const bluegreenButton = document.createElement('button');
  // bluegreenButton.classList.add('buttons', 'bluegreenButton');
  // bluegreenButton.addEventListener('click', function () {
  //   currentColor = COLORS.bluegreen;
  // });

  // colorPickerContainer.append(pinkButton, purpleButton, bluegreenButton);

  for (const key in COLORS) {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('buttons', `${key}Button`);
    buttonElement.addEventListener('click', () => {
      resetColorPicker();
      activeColorPicker(COLORS[key], buttonElement);
    });
    colorPickerContainer.appendChild(buttonElement);
  }

  const customColorElement = document.createElement('input');
  customColorElement.type = 'color';
  customColorElement.classList.add('buttons', 'customButton');

  colorPickerContainer.append(customColorElement);

  customColorElement.addEventListener('click', handleCustomColor);
  customColorElement.addEventListener('change', handleCustomColor);

  return colorPickerContainer;
}

function handleCustomColor(e) {
  resetColorPicker();
  const color = hexToRgb(e.target.value);

  if (!color) return;

  const { r, g, b } = color;

  activeColorPicker(`rgb(${r}, ${g}, ${b})`, e.target);
}

function resetColorPicker() {
  document
    .querySelectorAll('.buttons')
    .forEach((element) => element.classList.remove('active'));
}

function activeColorPicker(color, element) {
  currentColor = color;
  element.classList.add('active');
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}
