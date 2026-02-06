document.addEventListener('DOMContentLoaded', () => {
    const modeTabs = document.querySelectorAll('.mode-tab');
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const encodingOptions = document.getElementById('encoding-options');
    const encodeTypeRadios = document.querySelectorAll('input[name="encode-type"]');
    const copyBtn = document.getElementById('copy-btn');
    const clearBtn = document.getElementById('clear-btn');
    const pasteBtn = document.getElementById('paste-btn');
    const errorMessage = document.getElementById('error-message');
    const errorText = document.getElementById('error-text');
    const labelEncode = document.querySelector('.label-encode');
    const labelDecode = document.querySelector('.label-decode');

    let currentMode = 'encode';
    let debounceTimeout = null;

    function trackEvent(action, label, value) {
        if (typeof gtag === 'function') {
            gtag('event', action, {
                'event_category': 'URL Encoder',
                'event_label': label,
                'value': value
            });
        }
    }

    function getEncodeType() {
        const selected = document.querySelector('input[name="encode-type"]:checked');
        return selected ? selected.value : 'component';
    }

    function encodeText(text) {
        if (!text) return '';
        
        const encodeType = getEncodeType();
        
        try {
            if (encodeType === 'component') {
                return encodeURIComponent(text);
            } else {
                return encodeURI(text);
            }
        } catch (e) {
            throw new Error('Failed to encode text: ' + e.message);
        }
    }

    function decodeText(text) {
        if (!text) return '';
        
        try {
            return decodeURIComponent(text);
        } catch (e) {
            throw new Error('Invalid URL-encoded string. Check for malformed percent sequences.');
        }
    }

    function processInput() {
        const input = inputText.value;
        hideError();
        
        if (!input) {
            outputText.value = '';
            return;
        }

        try {
            let result;
            if (currentMode === 'encode') {
                result = encodeText(input);
                trackEvent('encode', 'Encode text', input.length);
            } else {
                result = decodeText(input);
                trackEvent('decode', 'Decode text', input.length);
            }
            outputText.value = result;
        } catch (e) {
            outputText.value = '';
            showError(e.message);
        }
    }

    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    function hideError() {
        errorMessage.classList.add('hidden');
    }

    function switchMode(mode) {
        currentMode = mode;
        
        modeTabs.forEach(tab => {
            if (tab.dataset.mode === mode) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        if (mode === 'encode') {
            encodingOptions.style.display = 'flex';
            labelEncode.style.display = 'inline';
            labelDecode.style.display = 'none';
            inputText.placeholder = 'Enter text to encode...';
        } else {
            encodingOptions.style.display = 'none';
            labelEncode.style.display = 'none';
            labelDecode.style.display = 'inline';
            inputText.placeholder = 'Enter URL-encoded text to decode...';
        }

        hideError();
        processInput();
        trackEvent('mode_switch', mode);
    }

    function copyToClipboard() {
        const text = outputText.value;
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback();
            trackEvent('copy', 'Copy result');
        }).catch(() => {
            outputText.select();
            document.execCommand('copy');
            showCopyFeedback();
        });
    }

    function showCopyFeedback() {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#059669';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
        }, 1500);
    }

    function clearAll() {
        inputText.value = '';
        outputText.value = '';
        hideError();
        inputText.focus();
    }

    async function pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            inputText.value = text;
            processInput();
            inputText.focus();
        } catch (e) {
            inputText.focus();
        }
    }

    function handleInput() {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        debounceTimeout = setTimeout(processInput, 150);
    }

    modeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            switchMode(tab.dataset.mode);
        });
    });

    inputText.addEventListener('input', handleInput);

    encodeTypeRadios.forEach(radio => {
        radio.addEventListener('change', processInput);
    });

    copyBtn.addEventListener('click', copyToClipboard);
    clearBtn.addEventListener('click', clearAll);
    pasteBtn.addEventListener('click', pasteFromClipboard);

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            copyToClipboard();
        }
    });

    switchMode('encode');
    trackEvent('tool_load', 'url_encoder_tool');
});
