import { currency, number } from 'accounting/settings';

export default {
    name: 'accounting.js',
    initialize: function() {
        currency.symbol = "";
        currency.decimal = ",";
        currency.thousand = ".";
        number.decimal = ",";
        number.thousand = ".";
    }
};
