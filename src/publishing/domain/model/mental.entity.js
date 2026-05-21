import {Examiner} from "./examiner.entity.js";

/**
 * Mental entity in the Publishing bounded context.
 *
 * @class Mental
 */
export class Mental {
    /**
     * @param {Object} params - Entity attributes.
     * @param {number|string|null} [params.id=null] - Mental State Exam identifier.
     * @param {number|string|null} [params.patientId=null] - Patient identifier.
     * @param {number|string|null} [params.examinerId=null] - Examiner identifier.
     * @param {string} [params.examDate=''] - Human-readable date exam.
     * @param {number} [params.orientationScore=0] - Human-readable orientation score.
     * @param {number} [params.registrationScore=0] - Human-readable registration score.
     * @param {number} [params.attentionAndCalculationScore=0] - Human-readable attention and calculation score.
     * @param {number} [params.recallScore=0] - Human-readable recall score.
     * @param {number} [params.languageScore=0] - Human-readable language score.
     * @param {Examiner|null} [params.examiner=null] - Optional examiner entity reference.
     */
    constructor({id = null, patientId = null, examinerId = null, examDate = '', orientationScore = 0, registrationScore = 0, attentionAndCalculationScore = 0, recallScore = 0, languageScore = 0, examiner = null}) {
        this.id = id;
        this.patientId = patientId;
        this.examinerId = examinerId;
        this.examDate = examDate;
        this.orientationScore = orientationScore;
        this.registrationScore = registrationScore;
        this.attentionAndCalculationScore = attentionAndCalculationScore;
        this.recallScore = recallScore;
        this.languageScore = languageScore;
        this.examiner = examiner instanceof Examiner ? examiner : null;
    }
}