/*
 * Return true if a record has all of LON, LAT, NUMBER and STREET defined
 */
function isValidCsvRecord(record) {
    return onlyHasTheseProperties(record) &&
        !hasApartmentNumber(record);
}

/*
 * Return false if record.STREET contains literal word 'NULL', 'UNDEFINED',
 * or 'UNAVAILABLE' (case-insensitive)
*/
// function streetContainsExclusionaryWord(record) {
//     return /\b(NULL|UNDEFINED|UNAVAILABLE)\b/i.test(record.TASE5_NIMETUS_LIIGIGA);
// }
const MAAKOND_OV = ['VIITEPUNKT_X', 'VIITEPUNKT_Y', 'TASE1_NIMETUS_LIIGIGA', 'TASE2_NIMETUS_LIIGIGA'];
const MAAKOND_OV_ASULA = MAAKOND_OV.concat(['TASE3_NIMETUS_LIIGIGA']);
const MAAKOND_OV_ASULA_TANAV = MAAKOND_OV_ASULA.concat(['TASE5_NIMETUS_LIIGIGA']);
const MAAKOND_OV_ASULA_TANAV_NUMBER = MAAKOND_OV_ASULA_TANAV.concat(['TASE7_NIMETUS_LIIGIGA']);
const MAAKOND_OV_ASULA_KOHT = MAAKOND_OV_ASULA.concat(['TASE6_NIMETUS_LIIGIGA']);
const properties = [
    MAAKOND_OV_ASULA_KOHT,
    MAAKOND_OV_ASULA_TANAV_NUMBER,
    MAAKOND_OV_ASULA_TANAV,
    MAAKOND_OV_ASULA,
    MAAKOND_OV];

// const types = ['OV', 'AY', 'LO', 'VK', 'KN', 'EE'];

function onlyHasTheseProperties(record) {
    return !!properties.find(propArray => {
        return propArray.every(function (prop) {
            return record[prop] && record[prop].length > 0;
        });
    });
}

/*
    We dont need records with apartment numbers
 */
function hasApartmentNumber(record) {
    return ['VIITEPUNKT_X', 'VIITEPUNKT_Y'].every(function (prop) {
        return record[prop] && record[prop].length > 0;
    }) && record.TASE8_NIMETUS_LIIGIGA && record.TASE8_NIMETUS_LIIGIGA.trim().length > 0;
}

/*
    We are looking for records with specific types
 */
// function isType(record) {
//     return ['VIITEPUNKT_X', 'VIITEPUNKT_Y'].every(function (prop) {
//         return record[prop] && record[prop].length > 0;
//     }) && types.indexOf(record.ADOB_LIIK) > -1;
// }

module.exports = isValidCsvRecord;
