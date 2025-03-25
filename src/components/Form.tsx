import { useAppDispatch } from "../app/hook";
import { setCity } from "../app/store/features/city";
import { setQuery } from "../app/store/features/query";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import classes from "./form.module.scss";
import Modal from "./UI/Modal";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { Position } from "./Map";
import { defaulPosition } from "@/configuration/Constant";
import Accordion from "./UI/Accordion";
import { setLoading } from "@/app/store/features/loading";

interface CountryOption {
  name: string;
  code: string;
}

const Map = dynamic(() => import("./Map"), { ssr: false });

const Form = () => {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<CountryOption[]>([]);
  const [loadingName, setLoadingName] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [shownLocation, setShownLocation] = useState<Position>(defaulPosition);
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set(
      "location",
      (formData.get("location") as string)?.replaceAll("+", "%2B")
    );
    const queryString:Record<string,string> = {};
    for (const [key, value] of formData.entries()) {
      if (value && typeof value == 'string')
          queryString[key] = value
    }
    dispatch(setLoading(true));
    dispatch(setCity([]));
    dispatch(setQuery(queryString))

  }

  useEffect(() => {
    const fetchdata = async () => {
      if (!value) {
        setLoadingName(false);
        setOptions([]);
        return;
      }
      setLoadingName(true);
      const url = `api/countries?namePrefix=${value}`;
      const response = await fetch(url);
      const json = await response.json();
      setLoadingName(false);
      if (!Object.keys(json).length) return;
      const options =
        json.data.map((e: CountryOption) => ({ ...e, checked: false })) || [];
      setOptions(options);
    };

    const a = setTimeout(() => {
      fetchdata();
    }, 1000);

    return () => {
      clearTimeout(a);
    };
  }, [value]);

  function openMap(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    setModal(true);
  }
  function handleLocationClick(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (r) => {
          const location = `${r.coords.latitude}${
            Number(r.coords.longitude) > 0
              ? "%2B" + r.coords.longitude
              : r.coords.longitude
          }`;
          setLocation(location);
          setShownLocation({ lat: r.coords.latitude, lng: r.coords.longitude });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      console.log("Geolocation not supported");
    }
  }

  return (
    <>
      <Accordion title="Table filter:">
        <form onSubmit={handleSubmit} className={"row mb-4"}>
          <div className="col">
            <label htmlFor="namePrefix">Name prefix:</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Name prefix"
              name="namePrefix"
              id="namePrefix"
            />
          </div>
          <div className="col position-relative">
            <label htmlFor="countryIds">Country:</label>
            <input
              type="text"
              className={"form-control mb-2 " + classes.special}
              placeholder="Search..."
              onChange={(e) => {
                setLoadingName(true);
                setValue(e.target.value);
              }}
            />
            {loadingName ? (
              <p>LoadingName..</p>
            ) : loadingName == false && options && options.length ? (
              <select
                className="form-select"
                name="countryIds"
                multiple
                aria-label="multiple select example"
              >
                {options.map((option) => (
                  <option key={option.code} value={option.code}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : (
              ""
            )}
          </div>
          <div className="col">
            <label htmlFor="GPS-location">
              GPS location: <i className="bi bi-geo-alt-fill"></i>
            </label>
            <input
              type="text"
              className="form-control mb-2 d-none"
              defaultValue={location}
              name="location"
              id="GPS-location"
            />
            <button className="form-control mb-2" onClick={openMap}>
              Pick a location
            </button>
            Or
            <button className="form-control mb-2" onClick={handleLocationClick}>
              Use your current location{" "}
            </button>
            {location && (
              <>
                <p className="mb-0">Lat: {shownLocation.lat.toFixed(4)}</p>
                <p>Lng: {shownLocation.lng.toFixed(4)}</p>
              </>
            )}
          </div>
          <div className="col">
            <label htmlFor="minPopulation">Min population:</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Min population"
              name="minPopulation"
              id="minPopulation"
            />
          </div>
          <div className="col">
            <label htmlFor="maxPopulation">Max population:</label>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Max population"
              name="maxPopulation"
            />
          </div>
          <div className="col">
            <button className="form-control mb-2 btn btn-primary" type="submit">
              Find
            </button>
          </div>
        </form>
      </Accordion>
      <Modal openModal={modal} closeModal={() => setModal(false)}>
        <Map
          onDragEnd={(pos: string) => setLocation(pos)}
          setShownLocation={setShownLocation}
          open={modal}
        />
        <div className="mt-2 text-end">
          <button className="btn btn-success" onClick={() => setModal(false)}>
            Apply
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Form;
