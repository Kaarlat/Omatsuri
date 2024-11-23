import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const helpers = {
    formatDate: function(date) {
        if (!date) return '';
        return format(new Date(date), "d 'de' MMMM 'de' yyyy, HH:mm", { locale: es });
    },
    
    eq: function(a, b) {
        return a === b;
    },
    
    isFirstInGroup: function(index, groupSize) {
        return index % groupSize === 0;
    },
    
    isLastInGroup: function(index, groupSize) {
        return (index + 1) % groupSize === 0 || index === this.length - 1;
    },
    
    moreThanThree: function(array) {
        return array.length > 3;
    },
    
    capitalize: function(str) {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
};

export { helpers as default };
