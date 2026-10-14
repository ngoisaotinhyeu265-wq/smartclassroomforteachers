import { GlobalSuccessUnit } from "../../types";
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
