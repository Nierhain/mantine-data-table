import { useMemo, useState } from "react";
import {
    ColorScheme,
    ColorSchemeProvider,
    Container,
    MantineProvider,
} from "@mantine/core";
import DataTable, { ColumnOptions } from "./components/DataTable";
import { faker } from "@faker-js/faker";

interface Data {
    name: string;
    city: string;
    country: string;
    company: string;
    value: number;
    date: Date;
}
const fakes: Data[] = new Array(100).fill({}).map((i) => ({
    name: faker.name.findName(),
    city: faker.address.city(),
    country: faker.address.country(),
    company: faker.company.companyName(),
    value: faker.datatype.number(),
    date: faker.datatype.datetime(),
}));

function App() {
    const [count, setCount] = useState(0);
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const data = useMemo(() => fakes, []);

    const columns: ColumnOptions<Data>[] = useMemo(
        () => [
            { label: "Name", key: "name" },
            { label: "City", key: "city" },
            { label: "Country", key: "country" },
            { label: "Company", key: "company" },
            { label: "Value", key: "value" },
            { label: "Date", key: "date" },
        ],
        []
    );

    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value ?? colorScheme === "dark" ? "light" : "dark");
    };
    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}>
            <MantineProvider
                theme={{ colorScheme }}
                withGlobalStyles
                withNormalizeCSS>
                <Container>
                    <DataTable data={data} columns={columns} />
                </Container>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default App;
