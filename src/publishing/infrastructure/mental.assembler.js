import {Mental} from '../domain/model/mental.entity.js';

/**
 * Maps Publishing mental resources into domain entities.
 *
 * @class MentalAssembler
 */
export class MentalAssembler {
    /**
     * @param {{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}} resource - Mental resource payload.
     * @returns {Mental} Mental entity.
     */
    static toEntityFromResource(resource) {
        return new Mental({...resource})
    }

    /**
     * Parses mental resources from a response and maps them into entities.
     *
     * @param {import('axios').AxiosResponse<Array<{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}>|{mentals:Array<{id: number|string, patientId: number|string, examinerId: number|string, examDate: string, orientationScore: number, registrationScore: number, attentionAndCalculationScore: number, recallScore: number, languageScore: number}>}>} response - HTTP response with mental resources.
     * @returns {Mental[]} Mental entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status}, ${response.statusText}`);
            return [];
        }
        let resources = Array.isArray(response.data) ? response.data : (Array.isArray(response.data?.mentals) ? response.data.mentals : []);

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}