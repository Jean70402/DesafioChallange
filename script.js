document.addEventListener('DOMContentLoaded', () => {
    // Lee los elementos y los guarda en variables para ser accesibles
    const inputText = document.getElementById('inputText');
    const outputTextBold = document.getElementById('outputTextBold');
    const outputTextSmall = document.getElementById('outputTextSmall');
    const outputImage = document.getElementById('outputImage');
    const copyButton = document.getElementById('copyButton');
    const outputSection = document.getElementById('output-section');
    const outputContainer = document.getElementById('outputContainer');
    //Crea matrices con las palabras a añadirse en el encriptador, tanto para añadir como para remover, 
    //hay dos en caso de futuras actualizaciones
    const wordsToAdd = ["1fd", "Okj", "d46xc"];
    const wordsToRemove = ["1fd", "Okj", "d46xc"];

    //Función que obtiene el ancho y largo de la ventana, para actualizar cuando se muestran las imágenes
    function updateImageDisplay() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (width <= 768 && height<=1174 ) {
            outputImage.style.display = 'none';
        } else {
            outputImage.style.display = 'block';
        }
    }
    //función de encriptación de texto, que añade las palabras de manera aleatoria, añadiendo la palabra
    //al inicio, en el medio y al final, de cualquier opción de la matriz expuesta arriba.
    function encryptText(text) {
        const getRandomWord = () => wordsToAdd[Math.floor(Math.random() * wordsToAdd.length)];

        const addRandomWords = (word) => {
            if (word.length === 0) return word;

            const startWord = getRandomWord();
            const middleWord = getRandomWord();
            const endWord = getRandomWord();
            const middleIndex = Math.floor(word.length / 2);

            const firstPart = word.substring(0, middleIndex);
            const secondPart = word.substring(middleIndex);
            const encryptedWord = startWord + firstPart + middleWord + secondPart + endWord;

            return encryptedWord;
        };
        return text
            .split(' ')
            .map(addRandomWords)
            .join(' ');
    }
    //Función para desencriptar, remueve todas las palabras presentes de la matriz de palabras expuesta arriba.
    function decryptText(text) {
        const regex = new RegExp(`(${wordsToRemove.join('|')})`, 'g');
        return text.replace(regex, '').trim();
    }

    //Función para cambiar el texto a sus características originales, dependiendo si hay texto o no 
    //en la casilla de introducción de texto (input)
    function handleTextChange() {
        const text = inputText.value.trim();
        if (text) {
            outputContainer.style.marginTop = 'auto';
            const encryptedText = encryptText(text);
            outputTextBold.textContent = encryptedText;
            outputTextBold.style.textAlign = "left";
            outputTextBold.style.fontWeight = 'bold';
            outputTextBold.style.wordBreak = "break-all";
            outputTextSmall.textContent = '';
            copyButton.style.display = 'block';
            outputSection.style.alignItems = 'flex-start';
            outputSection.style.justifyContent = 'flex-start';
            outputImage.style.display = 'none'; 
        } else {
            outputContainer.style.marginTop = '';
            outputTextBold.style.wordBreak = "normal";
            outputTextBold.textContent = 'Ningún mensaje fue encontrado';
            outputTextBold.style.textAlign = "center"; 
            outputTextBold.style.fontWeight = ''; 
            outputTextSmall.textContent = 'Ingrese el texto que desees encriptar.';
            copyButton.style.display = 'none';
            outputSection.style.alignItems = 'center';
            outputSection.style.justifyContent = 'center';
            outputImage.style.display = ''; 
            updateImageDisplay(); 
        }
    }
    
    //llama a las funciones de cambio de texto cuando se da click a los botones.
    document.getElementById('encryptButton').addEventListener('click', handleTextChange);
    document.getElementById('decryptButton').addEventListener('click', () => {
        const text = inputText.value.trim();
        if (text) {
            outputContainer.style.marginTop = 'auto';
            const decryptedText = decryptText(text);
            outputTextBold.textContent = decryptedText;
            outputTextBold.style.textAlign = "left";
            outputTextBold.style.fontWeight = 'bold';
            outputTextBold.style.wordBreak = "normal";
            outputTextSmall.textContent = '';
            outputSection.style.alignItems = 'flex-start';
            outputSection.style.justifyContent = 'flex-start';
            copyButton.style.display = 'block';
            outputImage.style.display = 'none'; 
        } else {
            outputSection.style.justifyContent = 'center';
            outputTextBold.style.wordBreak = "normal";
            outputSection.style.alignItems = 'center';
            outputSection.style.justifyContent = 'center';
            outputTextBold.style.textAlign = "center";
            outputTextBold.textContent = 'Ningún mensaje fue encontrado';
            outputTextSmall.textContent = 'Ingrese el texto que desees desencriptar.';
            copyButton.style.display = 'none';
            updateImageDisplay(); 
        }
    });
    //Realiza el copiado al pulsar el botón correspondiente
    copyButton.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(outputTextBold);
        window.getSelection().removeAllRanges(); 
        window.getSelection().addRange(range); 
        document.execCommand('copy'); 
        window.getSelection().removeAllRanges(); 
    });

    //llama a las funciones que detectan el cambio en la pantalla
    updateImageDisplay(); 
    window.addEventListener('resize', updateImageDisplay); 
});
