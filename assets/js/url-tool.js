/**
 * URL Encoder/Decoder Tool
 * Encodes text to URL-safe format and decodes URL-encoded strings.
 */
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
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

    /**
     * Get the current encoding type
     */
    function getEncodeType() {
        const selected = document.querySelector('input[name="encode-type"]:checked');
        return selected ? selected.value : 'component';
    }

    /**
     * Encode text based on selected encoding type
     */
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

    /**
     * Decode URL-encoded text
     */
    function decodeText(text) {
        if (!text) return '';
        
        try {
            return decodeURIComponent(text);
        } catch (e) {
            throw new Error('Invalid URL-encoded string. Check for malformed percent sequences.');
        }
    }

    /**
     * Process the input and update output
     */
    function processInput() {
        const input = inputText.value;
        
        // Hide any previous error
        hideError();
        
        if (!input) {
            outputText.value = '';
            return;
        }

        try {
            let result;
            if (currentMode === 'encode') {
                result = encodeText(input);
                trackEvent('URL Encoder', 'Encode');
            } else {
                result = decodeText(input);
                trackEvent('URL Encoder', 'Decode');
            }
            outputText.value = result;
        } catch (e) {
            outputText.value = '';
            showError(e.message);
        }
    }

    /**
     * Show error message
     */
    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
    }

    /**
     * Hide error message
     */
    function hideError() {
        errorMessage.classList.add('hidden');
    }

    /**
     * Switch between encode and decode modes
     */
    function switchMode(mode) {
        currentMode = mode;
        
        // Update tab states
        modeTabs.forEach(tab => {
            if (tab.dataset.mode === mode) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Show/hide encoding options (only in encode mode)
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

        // Clear and re-process
        hideError();
        processInput();
        
        trackEvent('URL Encoder', 'Mode: ' + mode);
    }

    /**
     * Copy output to clipboard
     */
    function copyToClipboard() {
        const text = outputText.value;
        
        if (!text) return;

        navigator.clipboard.writeText(text).then(() => {
            showCopyFeedback();
            trackEvent('URL Encoder', 'Copy Result');
        }).catch(() => {
            // Fallback for older browsers
            outputText.select();
            document.execCommand('copy');
            showCopyFeedback();
        });
    }

    /**
     * Show copy feedback
     */
    function showCopyFeedback() {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.style.background = '#059669';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.background = '';
        }, 1500);
    }

    /**
     * Clear input and output
     */
    function clearAll() {
        inputText.value = '';
        outputText.value = '';
        hideError();
        inputText.focus();
    }

    /**
     * Paste from clipboard
     */
    async function pasteFromClipboard() {
        try {
            const text = await navigator.clipboard.readText();
            inputText.value = text;
            processInput();
            inputText.focus();
        } catch (e) {
            // Clipboard API not available or permission denied
            inputText.focus();
        }
    }

    /**
     * Debounced input handler
     */
    function handleInput() {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        debounceTimeout = setTimeout(processInput, 150);
    }

    /**
     * Track Google Analytics event
     */
    function trackEvent(category, label) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'action', {
                'event_category': category,
                'event_label': label
            });
        }
    }

    // Event Listeners
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

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to copy result
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            copyToClipboard();
        }
    });

    // Initialize
    switchMode('encode');
});
