import { getAvailableCountries, getBorderCountries, getCountryPopulation, getCountryFlag } from './../controllers/CountryController';
import { Router } from "express";

const router = Router();

router.get('/available-countries', getAvailableCountries);

router.get('/border-countries/:countryCode', getBorderCountries);

router.get('/population/:countryCode', getCountryPopulation);

router.get('/flag/:countryCode', getCountryFlag);

export default router;