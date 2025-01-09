function luhnAlgorithm(cardNumber) {
    const digits = cardNumber.split('').map(Number);
    const oddDigits = digits.filter((_, index) => (digits.length - index) % 2 === 1);
    const evenDigits = digits.filter((_, index) => (digits.length - index) % 2 === 0);

    const Checksum = oddDigits.reduce((sum, digit) => sum + digit, 0) + 
        evenDigits.reduce((sum, digit) => {
            const dobled = digit * 2;
            return sum + (dobled > 9 ? dobled - 9 : dobled);
        }, 0);

    return Checksum % 10 === 0;
}

function getCardIssuer(cardNumber) {
    const cardPatterns = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        MasterCard: /^5[1-5][0-9]{14}$/,
        "AmericanExpress": /^3[47][0-9]{13}$/,
        Discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
        "Dinners Club": /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/, 
        EnRoute: /^(2014|2149)\d{11}$/,
        Voyager: /^8699[0-9]{11}$/,
        "InstaPayment": /^63[7-9][0-9]{13}$/,
        "Laser": /^(6304|6706|6709|6771)[0-9]{12,15}$/,
        "Maestro": /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
        "Solo": /^(6334|6767)[0-9]{12,15}$/,
        "Switch": /^(4903|4905|4911|4936|564182|633110|6333|6759)[0-9]{12,15}$/,
        HiperCard: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
        Aura: /^(5078\d{2})(\d{2})(\d{11})$/
    }

    for (const [issuer, pattern] of Object.entries(cardPatterns)) {
        if (pattern.test(cardNumber)) {
            return issuer;
        }
    }

    return 'Unknown';
};

function validateCreditCard(cardNumber) {
    if (luhnAlgorithm(cardNumber)) {
        const bandeira = getCardIssuer(cardNumber);
        return { valid: true, bandeira: bandeira };
    } else {
        return { valid: false, bandeira: 'Invalid' };
    }
}

//Example usage 
const cardNumber = "3549227684073324"; // Replace with any card number
const result = validateCreditCard(cardNumber);
console.log(result);

