import { formatCurrency, formatNumber, formatDate } from "./tranformers.utils"

describe("formatCurrency", () => {
    test("formats number as currency", () => {
        expect(formatCurrency(1234.56)).toBe("$1,234.56")
    })

    test("formats string number as currency", () => {
        expect(formatCurrency("1234.56")).toBe("$1,234.56")
    })

    test("returns input if value is not a number", () => {
        expect(formatCurrency("invalid")).toBe("invalid")
    })
})

describe("formatNumber", () => {
    test("formats large number with compact notation", () => {
        expect(formatNumber(1000000)).toBe("1M")
    })

    test("formats small number without compact notation", () => {
        expect(formatNumber(1234.56)).toBe("1.23K")
    })

    test("returns input if value is not a number", () => {
        expect(formatNumber("invalid")).toBe("invalid")
    })
})

describe("formatDate", () => {
    test("formats valid date string", () => {
        expect(formatDate("2024-01-01")).toBe("Jan 1, 2024")
    })

    test("formats another valid date string", () => {
        expect(formatDate("2023-10-24")).toBe("Oct 24, 2023")
    })

    test("handles invalid date string", () => {
        expect(formatDate("invalid-date")).toBe("Invalid Date")
    })
})
