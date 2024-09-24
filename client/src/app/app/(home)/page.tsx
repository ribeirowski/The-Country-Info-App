import { CountryList } from "./_components/country-list";

export default async function Page(){
    return (
        <div className="flex flex-col items-center h-screen">
            <CountryList />
        </div>
    )
}