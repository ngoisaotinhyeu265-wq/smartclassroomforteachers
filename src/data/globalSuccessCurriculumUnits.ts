import { GlobalSuccessUnit, GradeLevel } from "../types";
import {
  GRADE_1_UNITS,
  GRADE_2_UNITS,
  GRADE_3_UNITS,
  GRADE_4_UNITS,
  GRADE_5_UNITS,
  ALL_GRADES_CURRICULUM,
  getAllUnitsFlat,
} from "./curriculum";

export const GLOBAL_SUCCESS_SYLLABUS_OVERVIEW = {
  source: "Bộ Giáo Dục & Đào Tạo • NXB Giáo Dục Việt Nam (Chương trình GDPT 2018 / SGK Tiếng Anh Global Success mới nhất)",
  curriculumName: "Tiếng Anh Global Success (GS) Lớp 1 - Lớp 5",
  grades: [
    {
      grade: 1,
      name: "Tiếng Anh 1 Global Success",
      totalUnits: 16,
      unitsList: GRADE_1_UNITS.map((u) => `Unit ${u.unitNumber}: ${u.unitTitle}`),
    },
    {
      grade: 2,
      name: "Tiếng Anh 2 Global Success",
      totalUnits: 16,
      unitsList: GRADE_2_UNITS.map((u) => `Unit ${u.unitNumber}: ${u.unitTitle}`),
    },
    {
      grade: 3,
      name: "Tiếng Anh 3 Global Success",
      totalUnits: 20,
      unitsList: GRADE_3_UNITS.map((u) => `Unit ${u.unitNumber}: ${u.unitTitle}`),
    },
    {
      grade: 4,
      name: "Tiếng Anh 4 Global Success",
      totalUnits: 20,
      unitsList: GRADE_4_UNITS.map((u) => `Unit ${u.unitNumber}: ${u.unitTitle}`),
    },
    {
      grade: 5,
      name: "Tiếng Anh 5 Global Success",
      totalUnits: 20,
      unitsList: GRADE_5_UNITS.map((u) => `Unit ${u.unitNumber}: ${u.unitTitle}`),
    },
  ],
};

// Master combined curriculum
export const GLOBAL_SUCCESS_FULL_CURRICULUM: GlobalSuccessUnit[] = getAllUnitsFlat();

// Helper to get Units by Grade
export function getUnitsByGrade(grade: GradeLevel | number): GlobalSuccessUnit[] {
  const units = ALL_GRADES_CURRICULUM[grade] || GRADE_3_UNITS;
  return [...units].sort((a, b) => a.unitNumber - b.unitNumber);
}

export function getUnitByGradeAndNumber(grade: GradeLevel | number, unitNumber: number): GlobalSuccessUnit | undefined {
  const gradeUnits = getUnitsByGrade(grade);
  return gradeUnits.find((u) => u.unitNumber === unitNumber) || gradeUnits[0];
}

export { GRADE_1_UNITS, GRADE_2_UNITS, GRADE_3_UNITS, GRADE_4_UNITS, GRADE_5_UNITS };
