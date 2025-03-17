import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import classes from "./form.module.scss";
import Modal from "./Modal";
import dynamic from "next/dynamic";
import 'leaflet/dist/leaflet.css';
interface CountryOption {
  name: string;
  code: string;
}

const Map = dynamic(() => import("./Map"), { ssr: false });

interface FormProps {
  props: {
    onChange: (queryString: string) => void;
  };
}

const Form = ({
  props,
}: FormProps) => {
  const [value, setValue] = useState<string>("");
  const [options, setOptions] = useState<CountryOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");

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
    props.onChange(queryString);
  }

  useEffect(() => {
    const fetchdata = async () => {
      const url = `api/countries?namePrefix=${value}`;
      const response = await fetch(url);
      const json = await response.json();
      setLoading(false);
      setOptions(json.data);
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
            className={"form-control " + classes.special}
            placeholder="Select countries"
            name=""
            onChange={(e) => {
              setLoading(true);
              setValue(e.target.value);
            }}
          />
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className={classes.popup}>
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
                    />
                  </div>
                ))}
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
          <button
            className="btn btn-link btn-sm"
            onClick={() => setModal(true)}
          >
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
