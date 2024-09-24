'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import useCountries from '@/hooks/use-countries';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, CartesianGrid, ResponsiveContainer, YAxis } from 'recharts';

type CountryData = {
    commonName: string;
    flag: string;
    borders?: { countryCode: string; commonName: string }[];
};


const chartConfig = {
    value: {
        label: "Population",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export default function CountryPage() {
    const { countryCode } = useParams();
    const { fetchBorderCountries, fetchCountryPopulation, fetchCountryFlag } = useCountries();

    const [countryData, setCountryData] = useState<CountryData | null>(null);
    const [borderCountries, setBorderCountries] = useState<{ countryCode: string; commonName: string }[]>([]);
    const [populationData, setPopulationData] = useState<{ year: number; value: number }[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (countryCode) {
                try {
                    const bordersResponse = await fetchBorderCountries(Array.isArray(countryCode) ? countryCode[0] : countryCode);
                    const population = await fetchCountryPopulation(Array.isArray(countryCode) ? countryCode[0] : countryCode);
                    const flagUrl = await fetchCountryFlag(Array.isArray(countryCode) ? countryCode[0] : countryCode);
                    
                    setCountryData({
                        commonName: bordersResponse.commonName,
                        flag: flagUrl,
                        borders: bordersResponse.borders || []
                    });

                    setBorderCountries(bordersResponse.borders || []);
                    setPopulationData(Array.isArray(population) ? population : []);
                    console.log(population);
                } catch (err) {
                    if (axios.isAxiosError(err)) {
                        setError(err.message || 'Failed to fetch country data.');
                    } else {
                        setError('Failed to fetch country data.');
                    }
                } finally {
                    setLoading(false);
                }
            }
        };

        if (countryCode) {
            fetchData();
        }
    }, [countryCode, fetchBorderCountries, fetchCountryPopulation, fetchCountryFlag]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="w-full h-screen bg-secondary py-12 px-32 space-y-24 flex flex-col items-center justify-center">
            <div className="flex flex-row space-x-64">
                <div className='flex flex-col'>
                    <Image src={countryData?.flag || ''} alt={`Flag of ${countryData?.commonName}`} className="mb-4 w-24" width={96} height={96} />
                    <h2 className="text-3xl font-bold mb-4 text-primary">{countryData?.commonName}</h2>
                    <h3 className="text-lg font-bold mb-2">Border Countries:</h3>
                    <ul>
                        {Array.isArray(borderCountries) && borderCountries.length > 0 ? (
                            borderCountries.map((country) => (
                                <li key={country.countryCode}>
                                    <Link href={`/app/country/${country.countryCode}`} className="text-sm text-primary hover:underline">
                                        {country.commonName}
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <li>No border countries found.</li>
                        )}
                    </ul>
                </div>
                <div className='flex flex-col'>
                    <h3 className="text-2xl font-bold mb-4">Population Over Time:</h3>
                    {populationData.length > 0 ? (
                                <ChartContainer config={chartConfig} className="h-72">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={populationData} margin={{ top: 30, right: 40, left: 0, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis
                                                dataKey="year"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={12}
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={12}
                                                tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
                                            />
                                            <ChartTooltip
                                                content={<ChartTooltipContent />}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="hsl(var(--chart-2))"
                                                strokeWidth={2}
                                                dot={false}
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </ChartContainer>
                            ) : (
                                <p>No population data available.</p>
                            )}
                </div>
            </div>
            <Link href="/app" className="bg-primary text-white px-4 py-1 rounded hover:bg-opacity-80">
                Home
            </Link>
        </div>
    );
};
