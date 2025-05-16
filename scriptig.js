document.addEventListener('DOMContentLoaded', () => {
    const passwordInput = document.getElementById('password');
    const lengthInput = document.getElementById('length');
    const uppercaseInput = document.getElementById('uppercase');
    const lowercaseInput = document.getElementById('lowercase');
    const numbersInput = document.getElementById('numbers');
    const symbolsInput = document.getElementById('symbols');
    const excludeSimilarInput = document.getElementById('excludeSimilar');
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const resetBtn = document.getElementById('resetBtn');
    const strengthBar = document.querySelector('.strength-bar');
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    const darkModeKey = 'darkModeEnabled';

    // Check for saved theme preference
    const isDarkMode = localStorage.getItem(darkModeKey) === 'true';
    if (isDarkMode) {
        body.classList.add('dark-theme');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem(darkModeKey, body.classList.contains('dark-theme'));
    });

    function calculatePasswordStrength(password) {
        let strength = 0;
        const length = password.length;
        const hasUpper = /[A-Z]/.test(password);
        const hasLower = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSymbol = /[!@#$%^&*()_+[\]{};:,.<>?]/.test(password);

        if (length >= 8) strength++;
        if (hasUpper && hasLower) strength++;
        if (hasNumber) strength++;
        if (hasSymbol) strength++;

        return strength;
    }

    function updateStrengthIndicator(strength) {
        strengthBar.className = 'strength-bar'; // Reset classes
        switch (strength) {
            case 1:
                strengthBar.classList.add('weak');
                break;
            case 2:
                strengthBar.classList.add('medium');
                break;
            case 3:
            case 4:
                strengthBar.classList.add('strong');
                break;
        }
    }

    function generatePassword() {
        const length = parseInt(lengthInput.value);
        if (isNaN(length) || length < 6 || length > 30) {
            alert('Password length must be between 6 and 30 characters.');
            return;
        }

        let charSet = "";
        if (uppercaseInput.checked) charSet += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowercaseInput.checked) charSet += "abcdefghijklmnopqrstuvwxyz";
        if (numbersInput.checked) charSet += "0123456789";
        if (symbolsInput.checked) charSet += "!@#$%^&*()_+[]{}|;:,.<>?";

        if (!charSet) {
            alert('Please select at least one character type.');
            return;
        }

        let finalCharset = charSet;
        if (excludeSimilarInput.checked) {
            const similarChars = /[il1LoO0]/g;
            finalCharset = charSet.replace(similarChars, '');
            if (!finalCharset) {
                alert('No valid characters remaining after excluding similar ones.');
                return;
            }
        }

        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * finalCharset.length);
            password += finalCharset[randomIndex];
        }

        passwordInput.value = password;
        updateStrengthIndicator(calculatePasswordStrength(password));
    }

    function copyPassword() {
        if (passwordInput.value) {
            passwordInput.select();
            document.execCommand('copy');
            alert('Password copied to clipboard!');
        } else {
            alert('No password has been generated.');
        }
    }

    function resetPassword() {
        lengthInput.value = 12;
        uppercaseInput.checked = true;
        lowercaseInput.checked = true;
        numbersInput.checked = true;
        symbolsInput.checked = true;
        excludeSimilarInput.checked = false;
        passwordInput.value = "";
        strengthBar.className = 'strength-bar'; // Reset strength indicator
    }

    generateBtn.addEventListener('click', generatePassword);
    copyBtn.addEventListener('click', copyPassword);
    resetBtn.addEventListener('click', resetPassword);
});
