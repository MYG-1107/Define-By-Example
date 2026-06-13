/* ==========================================================================
   Define By Exampl - Interactive Client Engine
   ========================================================================== */

// 1. Built-in Production Local Vocabulary Dictionary
const DICTIONARY_DATABASE = {
    "eloquent": {
        pos: "adjective",
        definition: "Fluent or persuasive in speaking or writing clearly.",
        example: "The speaker gave an eloquent presentation that inspired everyone to join the project immediately."
    },
    "resilient": {
        pos: "adjective",
        definition: "Able to withstand or recover quickly from difficult conditions.",
        example: "Despite encountering major tech challenges, the engineering team remained resilient and launched on schedule."
    },
    "candid": {
        pos: "adjective",
        definition: "Truthful and straightforward; frank or completely honest.",
        example: "During the retrospective meeting, our lead developer provided a candid review of why the code failed."
    },
    "meticulous": {
        pos: "adjective",
        definition: "Showing great attention to detail; very careful and precise.",
        example: "Yaswanth keeps a meticulous record of all changes to ensure the source control remains bug-free."
    },
    "innovate": {
        pos: "verb",
        definition: "To feature or introduce completely new methods, ideas, or architectural products.",
        example: "To stand out in web development, creators must innovate regular user interfaces into accessible structures."
    }
};

// 2. DOM Elements Selection
const wordInput = document.getElementById('wordInput');
const searchBtn = document.getElementById('searchBtn');
const suggestionsBox = document.getElementById('suggestions');
const resultCard = document.getElementById('resultCard');

const resWord = document.getElementById('resWord');
const resPos = document.getElementById('resPos');
const resDefinition = document.getElementById('resDefinition');
const resExample = document.getElementById('resExample');

// 3. Main Search Engine Initialization Execution
function executeSearch(query) {
    if (!query) return;
    
    const cleanQuery = query.trim().toLowerCase();
    
    // Check local database repository
    if (DICTIONARY_DATABASE.hasOwnProperty(cleanQuery)) {
        const data = DICTIONARY_DATABASE[cleanQuery];
        
        // Populate display components
        resWord.textContent = cleanQuery;
        resPos.textContent = `(${data.pos})`;
        resDefinition.textContent = data.definition;
        resExample.textContent = `"${data.example}"`;
        
        // Expose Card Wrapper
        resultCard.classList.add('active');
        suggestionsBox.style.display = 'none';
    } else {
        // Fallback structural rendering if the word isn't located
        resWord.textContent = cleanQuery;
        resPos.textContent = "";
        resDefinition.textContent = "Word signature definition placeholder configuration details not stored locally yet.";
        resExample.textContent = `"Example sentence generation model could not compute for [${cleanQuery}] context parameters."`;
        resultCard.classList.add('active');
        suggestionsBox.style.display = 'none';
    }
}

// 4. Input Auto-Suggestion Filtering Pipeline
function updateSuggestions() {
    const inputVal = wordInput.value.trim().toLowerCase();
    suggestionsBox.innerHTML = '';
    
    if (!inputVal) {
        suggestionsBox.style.display = 'none';
        return;
    }
    
    // Filter matching array keys
    const matches = Object.keys(DICTIONARY_DATABASE).filter(word => 
        word.startsWith(inputVal)
    );
    
    if (matches.length > 0) {
        matches.forEach(match => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.textContent = match;
            div.addEventListener('click', () => {
                wordInput.value = match;
                executeSearch(match);
            });
            suggestionsBox.appendChild(div);
        });
        suggestionsBox.style.display = 'block';
    } else {
        suggestionsBox.style.display = 'none';
    }
}

// 5. App Event Listeners Wiring
searchBtn.addEventListener('click', () => {
    executeSearch(wordInput.value);
});

wordInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        executeSearch(wordInput.value);
    } else {
        updateSuggestions();
    }
});

// Close search suggestions overlay when clicking out
document.addEventListener('click', (e) => {
    if (e.target !== wordInput && e.target !== suggestionsBox) {
        suggestionsBox.style.display = 'none';
    }
});
