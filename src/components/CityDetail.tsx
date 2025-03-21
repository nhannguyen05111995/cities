import { GeoDBAPI } from "@/configuration/Type";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/hook";

export default function CityDetail() {
  const focusCity = useAppSelector(
    (state: { focusCity: { value: GeoDBAPI.City | null } }) =>
      state.focusCity.value
  );

  const [country, setCountry] = useState<GeoDBAPI.Country | null>(null);

  useEffect(() => {
    async function getCountry(countryCode: string) {
      const url = `api/countries/${countryCode}`;
      const response = await fetch(url);
      const json = await response.json();
      if (!Object.keys(json).length) {
        return;
      }
      setCountry(json.data);
    }
    if (focusCity) getCountry(focusCity.countryCode);
  });

  return (
    <div>
      City: {focusCity?.city}, Country: {focusCity?.country}{" "}
      {country && (
        <>
          <Image
            src={country?.flagImageUri}
            width="20"
            height="20"
            alt={country.name}
          />
          <br />
          Capital city: {country.capital}, Currency:{" "}
          {country.currencyCodes.join(", ")}, <br />
          Phone code: {country.callingCode}{" "}
        </>
      )}{" "}
      , Popolation: {focusCity?.population}
    </div>
  );
}
