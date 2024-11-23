export const helpers = {
    eq: (a, b) => a === b,
    
    isMultipleOfThree: (index) => {
        return (index + 1) % 3 === 0;
    },
    
    remainingColumns: (index) => {
        return 3 - ((index + 1) % 3);
    },
    
    times: function(n, block) {
        let accum = '';
        for(let i = 0; i < n; ++i) {
            accum += block.fn(i);
        }
        return accum;
    },
    
    formatDate: (date) => {
        if (!date) return '';
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(date).toLocaleDateString('es-ES', options);
    },
    
    capitalize: (str) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};
