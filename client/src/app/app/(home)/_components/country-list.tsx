// CountryList.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import Image from 'next/image'
import useCountries from '@/hooks/use-countries'

export function CountryList() {
    const { countries, loading, error } = useCountries();
    const [searchTerm, setSearchTerm] = useState('');

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full bg-secondary py-12 px-32">
            <div className='flex flex-column justify-between mb-4'>
                <h2 className="text-3xl font-bold mb-6 text-primary">Explore Countries</h2>
                <Input
                    type="search"
                    placeholder="Search countries..."
                    className="mb-6 w-1/2 bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredCountries.map((country, index) => (
                    <motion.div
                        key={country.countryCode}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <Link href={`/country/${country.countryCode}`} className="block">
                            <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="px-8 py-4 flex items-center space-x-4">
                                    <Image
                                        src={country.flagUrl}
                                        alt={`Flag of ${country.name}`}
                                        width={80} 
                                        height={50} 
                                        className="rounded"
                                    />
                                    <span className="font-medium text-foreground">{country.countryCode}</span>
                                </CardContent>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
