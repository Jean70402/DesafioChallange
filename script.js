document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputTextBold = document.getElementById('outputTextBold');
    const outputTextSmall = document.getElementById('outputTextSmall');
    const outputImage = document.getElementById('outputImage');
    const copyButton = document.getElementById('copyButton'); // Botón de copiar
    const outputSection = document.getElementById('output-section');
    const outputContainer=document.getElementById('outputContainer');
    const wordsToAdd = ["1fd", "Okj", "d46xc"];
    const wordsToRemove = ["1fd", "Okj", "d46xc"];

    function encryptText(text) {
        const addRandomWords = (word) => {
            if (word.length === 0) return word;
            const start = wordsToAdd[Math.floor(Math.random() * wordsToAdd.length)];
            const middle = wordsToAdd[Math.floor(Math.random() * wordsToAdd.length)];
            const end = wordsToAdd[Math.floor(Math.random() * wordsToAdd.length)];
            const middleIndex = Math.floor(word.length / 2);
            return `${start}${word.substring(0, middleIndex)}${middle}${word.substring(middleIndex)}${end}`;
        };
        return text.split(' ').map(addRandomWords).join(' ');
    }

    function decryptText(text) {
        const regex = new RegExp(`(${wordsToRemove.join('|')})`, 'g');
        return text.replace(regex, '').trim();
    }

    document.getElementById('encryptButton').addEventListener('click', () => {
        const text = inputText.value.trim();
        outputContainer.style.marginTop='auto';
        if (text) {
            const encryptedText = encryptText(text);
            outputTextBold.textContent = encryptedText;
            outputTextBold.style.textAlign="left";
            outputTextSmall.textContent = '';
            outputImage.style.display = 'none';
            copyButton.style.display = 'block'; 
            outputSection.style.alignItems = 'flex-start';
            outputSection.style.justifyContent = 'flex-start';
            
        } else {
            outputTextBold.textContent = 'Ningún mensaje fue encontrado';
            outputTextSmall.textContent = 'Ingrese el texto que desees encriptar.';
            copyButton.style.display = 'none';
            outputSection.style.alignItems = 'center';
            outputSection.style.justifyContent = 'center';
        }
    });
    

    document.getElementById('decryptButton').addEventListener('click', () => {
        const text = inputText.value.trim();
        outputContainer.style.marginTop='auto';
        if (text) {
            const decryptedText = decryptText(text);
            outputTextBold.textContent = decryptedText;
            outputTextBold.style.textAlign="left";
            outputTextBold.style.fontWeight='normal';
            outputTextSmall.textContent = '';
            outputSection.style.alignItems = 'flex-start';
            outputSection.style.justifyContent = 'flex-start';
            outputImage.style.display = 'none';
            copyButton.style.display = 'block'; 
            
        } else {
            outputTextBold.style.textAlign="left";
            outputTextBold.textContent = 'Ningún mensaje fue encontrado';
            outputTextSmall.textContent = 'Ingrese el texto que desees desencriptar.';
            copyButton.style.display = 'none';
        }
    });

    copyButton.addEventListener('click', () => {
        // Copiar el texto desencriptado al portapapeles
        const range = document.createRange();
        range.selectNode(outputTextBold);
        window.getSelection().removeAllRanges(); // Clear current selection
        window.getSelection().addRange(range); // Select the text content
        document.execCommand('copy'); // Execute the copy command
        window.getSelection().removeAllRanges(); // Unselect the text
    });
});
