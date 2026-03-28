import { describe, expect, it } from "vitest";

describe("Lesson to Teacher Mapping", () => {
  const lessonToTeacher: Record<string, string> = {
    "Piano": "Norman Charette",
    "Guitar & Ukulele": "Bogdan (Bobo) Pejić",
    "Violin & Viola": "Vesna Pejić",
    "Flute & Piccolo": "Erin McAfee",
    "Electric Bass": "Teymour Saifi",
    "Composition": "Bogdan (Bobo) Pejić",
  };

  it("should map Piano to Norman Charette", () => {
    expect(lessonToTeacher["Piano"]).toBe("Norman Charette");
  });

  it("should map Guitar & Ukulele to Bogdan (Bobo) Pejić", () => {
    expect(lessonToTeacher["Guitar & Ukulele"]).toBe("Bogdan (Bobo) Pejić");
  });

  it("should map Violin & Viola to Vesna Pejić", () => {
    expect(lessonToTeacher["Violin & Viola"]).toBe("Vesna Pejić");
  });

  it("should map Flute & Piccolo to Erin McAfee", () => {
    expect(lessonToTeacher["Flute & Piccolo"]).toBe("Erin McAfee");
  });

  it("should map Electric Bass to Teymour Saifi", () => {
    expect(lessonToTeacher["Electric Bass"]).toBe("Teymour Saifi");
  });

  it("should map Composition to Bogdan (Bobo) Pejić", () => {
    expect(lessonToTeacher["Composition"]).toBe("Bogdan (Bobo) Pejić");
  });

  it("should have all 6 lesson types", () => {
    expect(Object.keys(lessonToTeacher)).toHaveLength(6);
  });

  it("should not have empty teacher names", () => {
    Object.values(lessonToTeacher).forEach((teacher) => {
      expect(teacher).toBeTruthy();
      expect(teacher.length).toBeGreaterThan(0);
    });
  });
});
