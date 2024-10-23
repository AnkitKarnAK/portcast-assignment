import { render } from "@testing-library/react"
import '@testing-library/jest-dom';
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "./table"

describe("Table component", () => {
    test("renders the Table component", () => {
        const { container } = render(<Table className="custom-class" />)
        const table = container.querySelector("table")
        expect(table).toBeInTheDocument()
        expect(table).toHaveClass("custom-class")
    })

    test("renders the TableHeader component", () => {
        const { container } = render(
            <table>
                <TableHeader className="header-class" />
            </table>
        )
        const thead = container.querySelector("thead")
        expect(thead).toBeInTheDocument()
        expect(thead).toHaveClass("header-class")
    })

    test("renders the TableBody component", () => {
        const { container } = render(
            <table>
                <TableBody className="body-class" />
            </table>
        )
        const tbody = container.querySelector("tbody")
        expect(tbody).toBeInTheDocument()
        expect(tbody).toHaveClass("body-class")
    })

    test("renders the TableFooter component", () => {
        const { container } = render(
            <table>
                <TableFooter className="footer-class" />
            </table>
        )
        const tfoot = container.querySelector("tfoot")
        expect(tfoot).toBeInTheDocument()
        expect(tfoot).toHaveClass("footer-class")
    })

    test("renders the TableRow component", () => {
        const { container } = render(
            <table>
                <TableBody>
                    <TableRow className="row-class" />
                </TableBody>
            </table>
        )
        const tr = container.querySelector("tr")
        expect(tr).toBeInTheDocument()
        expect(tr).toHaveClass("row-class")
    })

    test("renders the TableHead component", () => {
        const { container } = render(
            <table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="head-class" />
                    </TableRow>
                </TableHeader>
            </table>
        )
        const th = container.querySelector("th")
        expect(th).toBeInTheDocument()
        expect(th).toHaveClass("head-class")
    })

    test("renders the TableCell component", () => {
        const { container } = render(
            <table>
                <TableBody>
                    <TableRow>
                        <TableCell className="cell-class" />
                    </TableRow>
                </TableBody>
            </table>
        )
        const td = container.querySelector("td")
        expect(td).toBeInTheDocument()
        expect(td).toHaveClass("cell-class")
    })

    test("renders the TableCaption component", () => {
        const { container } = render(
            <table>
                <TableCaption className="caption-class" />
            </table>
        )
        const caption = container.querySelector("caption")
        expect(caption).toBeInTheDocument()
        expect(caption).toHaveClass("caption-class")
    })
})