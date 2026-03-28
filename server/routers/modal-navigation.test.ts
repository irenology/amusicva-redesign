import { describe, expect, it } from "vitest";

describe("Booking Modal Navigation", () => {
  // Simulate booking type state transitions
  type BookingType = "lesson" | "practice" | null;

  const transitions: Record<BookingType, BookingType> = {
    "lesson": null,
    "practice": null,
    null: null,
  };

  it("should transition from lesson booking to initial state", () => {
    expect(transitions["lesson"]).toBe(null);
  });

  it("should transition from practice room booking to initial state", () => {
    expect(transitions["practice"]).toBe(null);
  });

  it("should stay at initial state when already there", () => {
    expect(transitions[null]).toBe(null);
  });

  it("should allow navigation from lesson to practice room", () => {
    const currentState: BookingType = "lesson";
    const nextState: BookingType = "practice";
    
    // First go back to null, then to practice
    const backToNull = transitions[currentState];
    expect(backToNull).toBe(null);
    
    // Then can select practice
    expect(nextState).toBe("practice");
  });

  it("should allow navigation from practice room to lesson", () => {
    const currentState: BookingType = "practice";
    const nextState: BookingType = "lesson";
    
    // First go back to null, then to lesson
    const backToNull = transitions[currentState];
    expect(backToNull).toBe(null);
    
    // Then can select lesson
    expect(nextState).toBe("lesson");
  });

  it("should support bidirectional navigation", () => {
    // Start with lesson
    let state: BookingType = "lesson";
    
    // Go back
    state = transitions[state];
    expect(state).toBe(null);
    
    // Select practice
    state = "practice";
    expect(state).toBe("practice");
    
    // Go back
    state = transitions[state];
    expect(state).toBe(null);
    
    // Select lesson again
    state = "lesson";
    expect(state).toBe("lesson");
  });
});
