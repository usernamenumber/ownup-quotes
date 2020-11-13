const prefix = 'PropertySearcher';
const actions = {
    updateQuotes: (quotes) => ({
        type: `${prefix}/updateQuotes`,
        payload: quotes,
    }),
    quoteUpdateStart: () => ({
        type: `${prefix}/quotesUpdateStart`,
        payload: true,
    }),
    quoteUpdateFinish: () => ({
        type: `${prefix}/quotesUpdateFinish`,
        payload: false,
    }) 
}

export default actions;