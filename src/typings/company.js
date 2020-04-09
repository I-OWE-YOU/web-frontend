/**
 * @typedef {Object} Company
 * @property {boolean} acceptedTerms
 * @property {string} companyName
 * @property {boolean} copyAcceptedTerms
 * @property {string} email
 * @property {string} iban
 * @property {number} kvk
 * @property {Address} address
 */

/**
 * @typedef {object} Address
 * @property {string} city
 * @property {string} houseNumber
 * @property {string} street
 * @property {string} zipCode
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {object} CompanyFlatten
 * @property {boolean} acceptedTerms
 * @property {string} companyId
 * @property {string} companyName
 * @property {boolean} copyAcceptedTerms
 * @property {string} email
 * @property {string} iban
 * @property {number} kvk
 * @property {string} city
 * @property {string} houseNumber
 * @property {string} street
 * @property {string} zipCode
 * @property {number} latitude
 * @property {number} longitude
 */

exports.empty = {}
