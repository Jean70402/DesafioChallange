document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputTextBold = document.getElementById('outputTextBold');
    const outputTextSmall = document.getElementById('outputTextSmall');
    const outputImage = document.getElementById('outputImage');
    const copyButton = document.getElementById('copyButton');
    const outputSection = document.getElementById('output-section');
    const outputContainer = document.getElementById('outputContainer');
    const wordsToAdd = ["1fd", "Okj", "d46xc"];
    const wordsToRemove = ["1fd", "Okj", "d46xc"];

    function updateImageDisplay() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(`Window size: ${width}x${height}`); // Debugging line
        if (width <= 768 && height<=1174 ) {
            outputImage.style.display = 'none';
        } else {
            outputImage.style.display = 'block';
        }
    }

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

    function decryptText(text) {
        const regex = new RegExp(`(${wordsToRemove.join('|')})`, 'g');
        return text.replace(regex, '').trim();
    }

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
            outputImage.style.display = 'none'; // Hide the image here as well
        } else {
            outputContainer.style.marginTop = ''; // Restore original margin
            outputTextBold.style.wordBreak = "normal";
            outputTextBold.textContent = 'Ningún mensaje fue encontrado';
            outputTextBold.style.textAlign = "center"; // Restore original textAlign
            outputTextBold.style.fontWeight = ''; // Restore original fontWeight
            outputTextSmall.textContent = 'Ingrese el texto que desees encriptar.';
            copyButton.style.display = 'none';
            outputSection.style.alignItems = 'center';
            outputSection.style.justifyContent = 'center';
            outputImage.style.display = ''; // Restore original display state for image
            updateImageDisplay(); // Update image display based on window size
        }
    }
    

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

    copyButton.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(outputTextBold);
        window.getSelection().removeAllRanges(); 
        window.getSelection().addRange(range); 
        document.execCommand('copy'); 
        window.getSelection().removeAllRanges(); 
    });

    updateImageDisplay(); // Call on load
    window.addEventListener('resize', updateImageDisplay); // Call on resize
});
