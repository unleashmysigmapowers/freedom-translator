let mode = 'American';
let americanPhrases = {};

const fetchPhrases = async () => {
    try {
        const americanResponse = await fetch('data/american.json');
        americanPhrases = await americanResponse.json();
    } catch (error) {
        curlUpIntoABallAndFuckingDie(error)
    }
};

const cleanText = (text) => {
    return text.replace(/[^a-zA-Z0-9\s]/g, '').trim();
};

const translateText = () => {
    const input = cleanText(document.getElementById('inputText').value.trim());
    let translatedText = '';

    if (mode === 'American') {
        translatedText = input.split(' ').map(word => {
            const lastChar = word.slice(-1);
            return americanPhrases[lastChar] ? americanPhrases[lastChar] : word;
        }).join(' ');
    }

    const outputDiv = document.getElementById('output');
    outputDiv.innerText = translatedText;
    outputDiv.classList.add('visible');
};

window.addEventListener('load', async () => {
    await fetchPhrases();

    document.getElementById('americanButton').addEventListener('click', () => {
        mode = 'American';
        document.getElementById('mode').innerText = 'American';
    });

    document.getElementById('translateButton').addEventListener('click', translateText);
});
