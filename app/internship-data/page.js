import { getFromApi } from "@/lib/api"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Internship Entries",
}

export default async function InternshipDataPage() {
    const result = await getFromApi("/internship-data", [])

    return (
        <>
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
                precedence="default"
            />
            <h1>Internship Data Entries</h1>

            <table className="table table-bordered table-responsive-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">City</th>
                        <th scope="col">Region</th>
                        <th scope="col">Zip Code</th>
                        <th scope="col">Institution</th>
                        <th scope="col">Screenshot</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((entry, i) => (
                        <tr key={entry.id}>
                            <th scope="row">{i + 1}</th>
                            <td>{entry.name}</td>
                            <td>{entry.date_of_birth}</td>
                            <td>
                                <a href={`mailto:${entry.email}`}>{entry.email}</a>
                            </td>
                            <td>{entry.phone}</td>
                            <td>{entry.address}</td>
                            <td>{entry.city}</td>
                            <td>{entry.region}</td>
                            <td>{entry.zip_code}</td>
                            <td>{entry.institution}</td>
                            <td>
                                <img src={entry.screenshot} alt="Screen Shot" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
