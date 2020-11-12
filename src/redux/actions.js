const prefix = 'PropertySearcher';
const actions = {
    updateQuotes: (quotes) => ({
        type: `${prefix}/updateQuotes`,
        payload: quotes,
    }),
}

export default actions;