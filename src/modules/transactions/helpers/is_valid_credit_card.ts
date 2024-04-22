function isValidCreditCardNumber(cardNumber: string): boolean {
  cardNumber = cardNumber.replace(/\s/g, '');
  return /^\d{13,19}$/.test(cardNumber) && luhnCheck(cardNumber);
}

function luhnCheck(cardNumber: string): boolean {
  let sum = 0;
  let alternate = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i));
    if (alternate) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

export default isValidCreditCardNumber