/**
 * Examiner entity in the Publishing bounded context.
 *
 * @class Examiner
 */
export class Examiner {
    /**
     * @param {Object} params - Entity attributes.
     * @param {number|string|null} [params.id=null] - Examiner identifier.
     * @param {string} [params.firstName=''] - Human-readable first examiner name.
     * @param {string} [params.lastName=''] - Human-readable last examiner name.
     * @param {number|string|null} [params.nationalProviderIdentifier=null] - Human-readable provider identifier.
     */
    constructor({id = null, firstName = '', lastName = '', nationalProviderIdentifier = null}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nationalProviderIdentifier = nationalProviderIdentifier;
    }
}