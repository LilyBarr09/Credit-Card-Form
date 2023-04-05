export const cardNumberValidation = (cardNumber) => {
	const regexPattern = {
		MASTERCARD: /^5[1-5][0-9]{1,}|^2[2-7][0-9]{1,}$/,
		VISA: /^4[0-9]{2,}$/,
		AMEX: /^3[47][0-9]{5,}$/,
		DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
	};
	for (const card in regexPattern) {
		if (cardNumber.replace(/[^\d]/g, "").match(regexPattern[card])) {
			if (cardNumber) {
				return cardNumber && /^[1-6]{1}[0-9]{14,15}$i.test(cardNumber.replace(/[^\d]/g, '').trim())
				? ''
				: 'Enter a valid card';
			}
		}
	}
	return 'Enter a valid card';
};