"use client";
import { GeoDBAPI } from "@/configuration/Type";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function CityDetail({
  props,
}: {
  props: {
    countryCode: string;
    focusCity: GeoDBAPI.City;
  };
}) {
  const { countryCode, focusCity } = props;

  const [country, setCountry] = useState<GeoDBAPI.Country | null>(null);

  useEffect(() => {
    async function getCountry() {
      const url = `api/countries/${countryCode}`;
      const response = await fetch(url);
      const json = await response.json();
      if (!Object.keys(json).length) {
        return;
      }
      setCountry(json.data);
    }
    getCountry();
  }, []);

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
          /><br />
          Capital city: {country.capital}, {" "} 
          Currency: {country.currencyCodes.join(", ")}, {" "} <br />
          Phone code: {country.callingCode} {" "}
        </>
      )}{" "}
      , Popolation: {focusCity?.population}
    </div>
  );
}
