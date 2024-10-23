import { render } from "@testing-library/react"
import CryptoInfo from "./crypto-info"
import { formatCurrency, formatNumber } from "@/utils/tranformers.utils"
import { Asset } from "@/services/coincap"
import '@testing-library/jest-dom';


jest.mock("@/utils/tranformers.utils", () => ({
    formatCurrency: jest.fn(),
    formatNumber: jest.fn()
}))

const mockCrypto: Asset = {
    id: "bitcoin",
    rank: "1",
    symbol: "BTC",
    name: "Bitcoin",
    supply: "21000000",
    maxSupply: "21000000",
    marketCapUsd: "1000000000",
    volumeUsd24Hr: "50000000",
    priceUsd: "40000",
    changePercent24Hr: "2.5",
    vwap24Hr: "39500",
    explorer: "https://example.com"
}

describe("CryptoInfo component", () => {
    beforeEach(() => {
        (formatCurrency as jest.Mock).mockImplementation(value => `$${value}`);
        (formatNumber as jest.Mock).mockImplementation(value => `${value}`);
    })

    test("renders the crypto information correctly", () => {
        const { getByText } = render(<CryptoInfo crypto={mockCrypto} />)

        expect(getByText("#1")).toBeInTheDocument()
        expect(getByText("Bitcoin")).toBeInTheDocument()
        expect(getByText("(BTC)")).toBeInTheDocument()

        expect(getByText("Price")).toBeInTheDocument()
        expect(getByText("$40000")).toBeInTheDocument()

        expect(getByText("Market Cap")).toBeInTheDocument()
        expect(getByText("1000000000")).toBeInTheDocument()

        expect(getByText("Supply")).toBeInTheDocument()
        expect(getByText("21000000")).toBeInTheDocument()

        expect(getByText("Volume (24Hr)")).toBeInTheDocument()
        expect(getByText("50000000")).toBeInTheDocument()

        expect(getByText("Change (24Hr)")).toBeInTheDocument()
        expect(getByText("2.50%")).toHaveClass("text-green-500")
    })

    test("renders negative change percentage in red", () => {
        const negativeCrypto = { ...mockCrypto, changePercent24Hr: "-3.45" }
        const { getByText } = render(<CryptoInfo crypto={negativeCrypto} />)

        expect(getByText("-3.45%")).toHaveClass("text-red-500")
    })
})
