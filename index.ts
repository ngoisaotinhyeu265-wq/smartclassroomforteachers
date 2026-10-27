import { GlobalSuccessUnit, VocabItem, GradeLevel } from "../../types";
import { GRADE_1_UNITS } from "./grade1";
import { GRADE_2_UNITS } from "./grade2";
import { GRADE_3_UNITS } from "./grade3";
import { GRADE_4_UNITS } from "./grade4";
import { GRADE_5_UNITS } from "./grade5";

export { GRADE_1_UNITS, GRADE_2_UNITS, GRADE_3_UNITS, GRADE_4_UNITS, GRADE_5_UNITS };

export const ALL_GRADES_CURRICULUM: Record<number, GlobalSuccessUnit[]> = {
  1: GRADE_1_UNITS,
  2: GRADE_2_UNITS,
  3: GRADE_3_UNITS,
  4: GRADE_4_UNITS,
  5: GRADE_5_UNITS,
};

export function getUnitsByGrade(grade: number): GlobalSuccessUnit[] {
  return ALL_GRADES_CURRICULUM[grade] || GRADE_3_UNITS;
}

export function getAllUnitsFlat(): GlobalSuccessUnit[] {
  return [
    ...GRADE_1_UNITS,
    ...GRADE_2_UNITS,
    ...GRADE_3_UNITS,
    ...GRADE_4_UNITS,
    ...GRADE_5_UNITS,
  ];
}

/**
 * Extracts and flattens all curriculum vocabulary from all units and lessons
 * across Grades 1 to 5.
 * Grade 1: 16 Units | Grade 2: 16 Units | Grade 3: 20 Units | Grade 4: 20 Units | Grade 5: 20 Units
 */
export function getAllCurriculumVocab(): VocabItem[] {
  const units = getAllUnitsFlat();
  const vocabList: VocabItem[] = [];
  const seenIds = new Set<string>();

  for (const unit of units) {
    for (const lesson of unit.lessons || []) {
      for (const item of lesson.vocabulary || []) {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          const gradeNum = (item.grade || unit.grade) as GradeLevel;
          const unitNum = item.unit || unit.unitNumber;
          const topicStr = item.topic || unit.theme || unit.unitTitle;

          vocabList.push({
            ...item,
            grade: gradeNum,
            unit: unitNum,
            topic: topicStr,
            detailedClues:
              item.detailedClues && item.detailedClues.length > 0
                ? item.detailedClues
                : [
                    item.clue,
                    `In Vietnamese, it means "${item.vietnameseMeaning || item.word}".`,
                    `Pronunciation is ${item.phonics || item.word}. Starts with letter "${item.word.charAt(0).toUpperCase()}".`,
                  ],
            distractors:
              item.distractors && item.distractors.length >= 3
                ? item.distractors
                : ["apple", "banana", "cat", "dog", "pencil", "book"]
                    .filter((w) => w.toLowerCase() !== item.word.toLowerCase())
                    .slice(0, 3),
          });
        }
      }
    }
  }

  return vocabList;
}

export function getVocabByGrade(grade: GradeLevel): VocabItem[] {
  return getAllCurriculumVocab().filter((v) => v.grade === grade);
}

export function getVocabByGradeAndUnit(grade: GradeLevel, unitNumber: number): VocabItem[] {
  return getAllCurriculumVocab().filter((v) => v.grade === grade && v.unit === unitNumber);
}

