import {BaseApi} from "../../shared/infrastructure/base-api.js";
import {BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const examinersEndpointPath = import.meta.env.VITE_EXAMINERS_ENDPOINT_PATH;
const mentalsEndpointPath     = import.meta.env.VITE_MENTAL_ENDPOINT_PATH;

/**
 * Infrastructure adapter for Publishing HTTP endpoints.
 *
 * @class PublishingApi
 * @extends BaseApi
 */
export class PublishingApi extends BaseApi {
    /** @type {BaseEndpoint} */
    #examinersEndpoint;
    /** @type {BaseEndpoint} */
    #mentalsEndpoint;

    /** Creates endpoint clients for categories and tutorials resources. */
    constructor() {
        super();
        this.#examinersEndpoint = new BaseEndpoint(this, examinersEndpointPath);
        this.#mentalsEndpoint = new BaseEndpoint(this, mentalsEndpointPath);
    }

    /**
     * Retrieves examiner resources.
     * @returns {Promise<import('axios').AxiosResponse<Array<{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}>|{examiners:Array<{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}>}>>} HTTP response with examiner resources.
     */
    getExaminers() {
        return this.#examinersEndpoint.getAll();
    }

    /**
     * Retrieves one examiner resource by identifier.
     * @param {number|string} id - Examiner identifier.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}>>} HTTP response with the requested examiner resource.
     */
    getExaminerById(id) {
        return this.#examinersEndpoint.getById(id);
    }

    /**
     * Persists a new examiner resource.
     * @param {{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}|import('../domain/model/examiner.entity.js').Examiner} resource - Examiner data to persist.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}>>} HTTP response with the created examiner resource.
     */
    createExaminer(resource) {
        return this.#examinersEndpoint.create(resource);
    }

    /**
     * Updates an existing examiner resource.
     * @param {{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}|import('../domain/model/examiner.entity.js').Examiner} resource - Examiner data including its identifier.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}>>} HTTP response with the updated examiner resource.
     */
    updateExaminer(resource) {
        return this.#examinersEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes one examiner resource by identifier.
     * @param {number|string} id - Examiner identifier.
     * @returns {Promise<import('axios').AxiosResponse<Object>>} HTTP response from delete operation.
     */
    deleteExaminer(id) {
        return this.#examinersEndpoint.delete(id);
    }

    /**
     * Retrieves mental resources.
     * @returns {Promise<import('axios').AxiosResponse<Array<{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}>|{mentals:Array<{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}>}>>} HTTP response with mental resources.
     */
    getMentals() {
        return this.#mentalsEndpoint.getAll();
    }

    /**
     * Retrieves one mental resource by identifier.
     * @param {number|string} id - Mental identifier.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}>>} HTTP response with the requested mental resource.
     */
    getMentalById(id) {
        return this.#mentalsEndpoint.getById(id);
    }

    /**
     * Persists a new mental resource.
     * @param {{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}|import('../domain/model/mental.entity.js').Mental} resource - Mental data to persist.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}>>} HTTP response with the created mental resource.
     */
    createMental(resource) {
        return this.#mentalsEndpoint.create(resource);
    }

    /**
     * Updates an existing mental resource.
     * @param {{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}|import('../domain/model/mental.entity.js').Mental} resource - Mental data including its identifier.
     * @returns {Promise<import('axios').AxiosResponse<{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}>>} HTTP response with the updated mental resource.
     */
    updateMental(resource) {
        return this.#mentalsEndpoint.update(resource.id, resource);
    }

    /**
     * Deletes one mental resource by identifier.
     * @param {number|string} id - Mental identifier.
     * @returns {Promise<import('axios').AxiosResponse<Object>>} HTTP response from delete operation.
     */
    deleteMental(id) {
        return this.#mentalsEndpoint.delete(id);
    }
}