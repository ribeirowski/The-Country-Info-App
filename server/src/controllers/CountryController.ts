import { Request, Response, NextFunction } from "express";
import axios from "axios";

export const getAvailableCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const countries = await axios.get(process.env.AVAILABLE_COUNTRIES as string);

        res.status(200).json(countries.data);
        return next();
    } catch (error) {
        next(error);
    }
}

export const getBorderCountries = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { countryCode } = req.params;

        const borderCountries = await axios.get(`${process.env.BORDER_COUNTRIES as string}${countryCode}`);

        res.status(200).json(borderCountries.data);
        return next();
    } catch (error) {
        next(error);
    }
}

export const getCountryPopulation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { countryCode } = req.params;
        const populationData = await axios.get(process.env.POPULATION_DATA as string);

        const countryData = populationData.data.data.find((country: any) => country.code === countryCode);

        if (countryData) {
            res.status(200).json(countryData.populationCounts);
        } else {
            res.status(404).json({ message: "País não encontrado" });
        }
    } catch (error) {
        next(error);
    }
};

export const getCountryFlag = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { countryCode } = req.params;
        const flagData = await axios.get(process.env.FLAG_URL as string);

        const countryData = flagData.data.data.find((country: any) => country.iso3 === countryCode);

        res.status(200).json(countryData.flag);
    } catch (error) {
        next(error);
    }
}