/**
 * Application service store for the `Publishing` bounded context.
 * It coordinates examiner and mental use cases and keeps a UI-facing state.
 *
 * @module usePublishingStore
 */
import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {PublishingApi} from "../infrastructure/publishing-api.js";
import {ExaminerAssembler} from "../infrastructure/examiner.assembler.js";
import {MentalAssembler} from "../infrastructure/mental.assembler.js";
import {Examiner} from "../domain/model/examiner.entity.js";
import {Mental} from "../domain/model/mental.entity.js";

const publishingApi = new PublishingApi();

/**
 * Reactive store that exposes Publishing commands and queries.
 *
 * @returns {Object} Reactive Publishing state and use-case actions.
 */
const usePublishingStore = defineStore('publishing', () => {
    /**
     * List of examiner entities.
     * @type {import('vue').Ref<Examiner[]>}
     */
    const examiners = ref([]);
    /**
     * List of mental entities.
     * @type {import('vue').Ref<Mental[]>}
     */
    const mentals = ref([]);
    /**
     * List of errors encountered during API operations.
     * @type {import('vue').Ref<Error[]>}
     */
    const errors = ref([]);
    /**
     * Whether examiners have been loaded from the API.
     * @type {import('vue').Ref<boolean>}
     */
    const examinersLoaded = ref(false);
    /**
     * Whether mentals have been loaded from the API.
     * @type {import('vue').Ref<boolean>}
     */
    const mentalsLoaded = ref(false);
    /**
     * Number of loaded examiners.
     * @type {import('vue').ComputedRef<number>}
     */
    const examinersCount = computed(() => {
        return examinersLoaded ? examiners.value.length : 0;
    });
    /**
     * Number of loaded mentals.
     * @type {import('vue').ComputedRef<number>}
     */
    const mentalsCount = computed(() => {
        return mentalsLoaded ? mentals.value.length : 0;
    });

    /**
     * Loads examiners from infrastructure and updates the application state.
     * @returns {void}
     */
    function fetchExaminers() {
        publishingApi.getExaminers().then(response => {
            examiners.value = ExaminerAssembler.toEntitiesFromResponse(response);
            examinersLoaded.value = true;
            console.log(examinersLoaded.value);
            console.log(examiners.value);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Loads mentals from infrastructure and updates the application state.
     * @returns {void}
     */
    function fetchMentals() {
        publishingApi.getMentals().then(response => {
            mentals.value = MentalAssembler.toEntitiesFromResponse(response);
            mentalsLoaded.value = true;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Finds an examiner entity by identifier.
     * @param {number|string} id - Examiner identifier.
     * @returns {Examiner|undefined} Matching examiner, if available.
     */
    function getExaminerById(id) {
        let idNum = parseInt(id);
        return examiners.value.find(examiner => examiner["id"] === idNum);
    }

    /**
     * Creates an examiner through infrastructure and appends it to the local state.
     * @param {Examiner} examiner - Examiner entity to persist.
     * @returns {void}
     */
    function addExaminer(examiner) {
        publishingApi.createExaminer(examiner).then(response => {
            const resource = response.data;
            const newExaminer = ExaminerAssembler.toEntityFromResource(resource);
            examiners.value.push(newExaminer);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Updates an existing examiner and synchronizes local state.
     * @param {Examiner} examiner - Examiner entity with updated data.
     * @returns {void}
     */
    function updateExaminer(examiner) {
        publishingApi.updateExaminer(examiner).then(response => {
            const resource = response.data;
            const updatedExaminer = ExaminerAssembler.toEntityFromResource(resource);
            const index = examiners.value.findIndex(c => c["id"] === updatedExaminer.id);
            if (index !== -1) examiners.value[index] = updatedExaminer;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes an examiner and removes it from the local state.
     * @param {Examiner} examiner - Examiner entity to remove.
     * @returns {void}
     */
    function deleteExaminer(examiner) {
        publishingApi.deleteExaminer(examiner.id).then(() => {
            const index = examiners.value.findIndex(c => c["id"] === examiner.id);
            if (index !== -1) examiners.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }


    /**
     * Finds a mental entity by identifier.
     * @param {number|string} id - Mental identifier.
     * @returns {Mental|undefined} Matching mental, if available.
     */
    function getMentalById(id) {
        let idNum = parseInt(id);
        return mentals.value.find(mental => mental["id"] === idNum);
    }

    /**
     * Creates a mental through infrastructure and appends it to local state.
     * @param {Mental} mental - Mental entity to persist.
     * @returns {void}
     */
    function addMental(mental) {
        publishingApi.createMental(mental).then(response => {
            const resource = response.data;
            const newMental = MentalAssembler.toEntityFromResource(resource);
            mentals.value.push(newMental);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Updates an existing mental and synchronizes local state.
     * @param {Mental} mental - Mental entity with updated data.
     * @returns {void}
     */
    function updateMental(mental) {
        publishingApi.updateMental(mental).then(response => {
            const resource = response.data;
            const updatedMental = MentalAssembler.toEntityFromResource(resource);
            const index = mentals.value.findIndex(t => t["id"] === updatedMental.id);
            if (index !== -1) mentals.value[index] = updatedMental;
        }).catch(error => {
            errors.value.push(error);
        });
    }

    /**
     * Deletes a mental and removes it from the local state.
     * @param {Mental} mental - Mental entity to remove.
     * @returns {void}
     */
    function deleteMental(mental) {
        publishingApi.deleteMental(mental.id).then(() => {
            const index = mentals.value.findIndex(t => t["id"] === mental.id);
            if (index !== -1) mentals.value.splice(index, 1);
        }).catch(error => {
            errors.value.push(error);
        });
    }

    return {
        examiners,
        mentals,
        errors,
        examinersLoaded,
        mentalsLoaded,
        examinersCount,
        mentalsCount,
        fetchExaminers,
        fetchMentals,
        getExaminerById,
        addExaminer,
        updateExaminer,
        deleteExaminer,
        addMental,
        updateMental,
        deleteMental,
        getMentalById
    }
});

export default usePublishingStore;