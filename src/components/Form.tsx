import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import classes from "./form.module.scss";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
interface CountryOption {
  name: string;
  code: string;
  checked: boolean;
}

const Map = dynamic(() => import("./Map"), { ssr: false });

interface FormProps {
  props: {
    setQuery: any;
    setCities: any;
  };
}

const Form = ({ props }: FormProps) => {
  const [value, setValue] = useState<string>("");
  const [countryIdsValue, setcountryIdsValue] = useState<string>("");
  const [selectedCountryIdsValue, setSelectedCountryIdsValue] =
    useState<string>("");

  const [options, setOptions] = useState<CountryOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [popupOpen, setPopupOpen] = useState<boolean>(false);

  function handleChange(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set(
      "location",
      (formData.get("location") as string)?.replaceAll("+", "%2B")
    );
    let queryString = "";
    for (let [key, value] of formData.entries()) {
      if (value) queryString += `${key}=${value}&`;
    }
    props.setCities([]);
    props.setQuery(queryString);
  }

  useEffect(() => {
    const fetchdata = async () => {
      const url = `api/countries?namePrefix=${value}`;
      const response = await fetch(url);
      const json = await response.json();
      setLoading(false);
      const yy = json.data.map((e) => ({ ...e, checked: false }));
      setOptions(yy);
    };

    const a = setTimeout(() => {
      fetchdata();
    }, 1000);

    return () => {
      clearTimeout(a);
    };
  }, [value]);

  function onDragEnd(pos: string) {
    setLocation(pos);
  }

  function openMap(event) {
    event.preventDefault();
    setModal(true);
  }

  const handleCheckBoxClicked = (e) => {
    const updatedCheckedState = options.map((item) =>
      item.code === e ? { ...item, checked: !item.checked } : item
    );
    setOptions(updatedCheckedState);
    const yyy = updatedCheckedState
      .filter((option) => option.checked)
      .map((option) => option.code)
      .join(",");
    setcountryIdsValue(yyy);
    const ttt = updatedCheckedState
      .filter((option) => option.checked)
      .map((option) => option.name)
      .join(", ");
    setcountryIdsValue(yyy);

    setSelectedCountryIdsValue(ttt);
  };
  function toggle(event) {
    event.preventDefault();
    setPopupOpen((prev) => !prev);
  }
  return (
    <>
      <form onSubmit={handleChange} className={"row " + classes.form}>
        <label>Filter</label>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Name prefix"
            name="namePrefix"
          />
        </div>
        <div className="col position-relative">
          <input
            type="text"
            className={"d-none " + classes.special}
            placeholder="Select countries"
            name="countryIds"
            defaultValue={countryIdsValue}
          />
          <button className="btn btn-outline-secondary" onClick={toggle}>
            Select countries
          </button>
          {selectedCountryIdsValue&& <p>{selectedCountryIdsValue}</p>}
          {popupOpen == true && (
            <div className={classes.popup}>
              <input
                type="text"
                className={"form-control " + classes.special}
                placeholder="Search..."
                onChange={(e) => {
                  setLoading(true);
                  setValue(e.target.value);
                }}
              />
              {options &&
                options.map((option) => (
                  <div key={`countryID${option.code}`}>
                    <label htmlFor={`countryID${option.code}`}>
                      {option.name}
                    </label>{" "}
                    <input
                      type="checkbox"
                      id={`countryID${option.code}`}
                      defaultValue={option.code}
                      onChange={() => handleCheckBoxClicked(option.code)}
                      checked={option.checked}
                    />
                  </div>
                ))}
              <button className="btn btn-primary btn-sm mt-3" onClick={toggle}>
                Save
              </button>
            </div>
          )}
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Location"
            defaultValue={location}
            name="location"
          />
          <button className="btn btn-link btn-sm" onClick={openMap}>
            Open map
          </button>
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Min population"
            name="minPopulation"
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Max population"
            name="maxPopulation"
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Radius"
            name="radius"
          />
        </div>
        <div className="col">
          <button className="form-control btn btn-primary" type="submit">
            Find
          </button>
        </div>
      </form>

      <Modal openModal={modal} closeModal={() => setModal(false)}>
        <Map onDragEnd={onDragEnd} open={modal}></Map>
      </Modal>
    </>
  );
};

export default Form;
