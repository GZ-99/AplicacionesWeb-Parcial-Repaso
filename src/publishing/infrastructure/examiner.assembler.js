import {Examiner} from '../domain/model/examiner.entity.js';

/**
 * Maps Publishing examiner resources into domain entities.
 *
 * @class ExaminerAssembler
 */
export class ExaminerAssembler {
    /**
     * @param {{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}} resource - Examiner resource payload.
     * @returns {Examiner} Examiner entity.
     */
    static toEntityFromResource(resource) {
        return new Examiner({...resource});
    }

    /**
     * Parses Examiner resources from a response and maps them into entities.
     *
     * @param {import('axios').AxiosResponse<Array<{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}>|{examiners:Array<{id: number|string, firstName: string, lastName: string, nationalProviderIdentifier: number|string}>}>} response - HTTP response with examiner resources.
     * @returns {Examiner[]} Examiner entities.
     */
    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error(`${response.status} - ${response.statusText}`);
            return [];
        }
        let resources = response.data instanceof Array ? response.data : response.data['examiners'];

        return resources.map(resource => this.toEntityFromResource(resource));
    }
}