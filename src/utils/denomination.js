/**
 * Method returns value in satoshis based on 
 * denomination provided
 * @param {} value 
 * @param {*} d 
 * @returns 
 */
const convertDenomination = (value, d) => {
    // return value;
    switch (d) {
        case "mbtc": 
            return value * 100000;

        case "btc": 
            return value * 100000000;

        case "bits":
            return value * 100;
        
        case "eth":
            return value;

        case "$ARENA":
            return value;
        
        default:
            return value;
    }
}

module.exports = convertDenomination;