'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

type Population = {
    year: number
    value: number
}

const useCountries = () => {
    interface Country {
        name: string;
        countryCode: string;
        flagUrl: string;
        borderCountries: string[];
        population: Population[]; 
    }

    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAvailableCountries = async () => {
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL + '/available-countries');
            const countriesWithFlags = await Promise.all(response.data.map(async (country: Country) => {
                const flagUrl = await fetchCountryFlag(country.countryCode);
                return { ...country, flagUrl };
            }));
            setCountries(countriesWithFlags);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message || 'Failed to fetch countries.');
            } else {
                setError('Failed to fetch countries.');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchBorderCountries = async (countryCode: string) => {
        setLoading(true);
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL as string + `/border-countries/${countryCode}`);
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message || 'Failed to fetch border countries.');
            } else {
                setError('Failed to fetch border countries.');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchCountryPopulation = async (countryCode: string) => {
        setLoading(true);
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL as string + `/population/${countryCode}`);
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message || 'Failed to fetch population data.');
            } else {
                setError('Failed to fetch population data.');
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchCountryFlag = async (countryCode: string) => {
        setLoading(true);
        try {
            const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL as string + `/flag/${countryCode}`);
            return response.data;
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setError(err.message || 'Failed to fetch country flag.');
            } else {
                setError('Failed to fetch country flag.');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAvailableCountries();
    }, []);

    return { countries, loading, error, fetchBorderCountries, fetchCountryPopulation, fetchCountryFlag };
};

export default useCountries;
