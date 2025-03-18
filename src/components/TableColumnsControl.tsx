import { Column } from "@/configuration/Type";
import React from "react";

interface TableHeadProps {
    columns: Column[];
    checkBoxClicked: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TableHead = ({ props }: { props: TableHeadProps }) => {
    const { columns } = props;
    return (
        <div className="mb-3">
            <label className="mr-3">Columns:</label>
            {columns.map(({ name, type, open }) => (
                <div key={`checkbox-${type}`} className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={type}
                        checked={open}
                        onChange={props.checkBoxClicked}
                    />
                    <label className="form-check-label" htmlFor={type}>
                        {name}
                    </label>
                </div>
            ))}
        </div>
    );
};

export default TableHead;
