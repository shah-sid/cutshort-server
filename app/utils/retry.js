const transactionWithRetry = async (attempt, totalAttempts, retryFunction) => {
	try {
		if (attempt < totalAttempts) {
			let data = await retryFunction;
			return data;
		}
	} catch (err) {
		if (err.errorLabels && err.errorLabels[0] == 'TransientTransactionError') {
			console.log('TTE, retrying now. Attempt:', attempt + 1);
			transactionWithRetry(++attempt, retryFunction);
		} else {
			return Promise.reject(err);
		}
	}
};

module.exports = { transactionWithRetry };