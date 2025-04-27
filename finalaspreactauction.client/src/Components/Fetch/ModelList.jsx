import { useEffect } from "react";
import { useState } from "react";
function ModelList() {
    const [model, setModel] = useState([])
    function GetModel() {
        fetch("https://localhost:7038/api/Model/GetAllModel")
            .then((res) => res.json())
            .then((data) => {
                setModel(data)
            })
    }

    useEffect(() => {
        GetModel();
    }, [])

    return (
        <>
            <h5>Models :</h5>
            <ul className="modelList">
                {model.map((data) => (
                    <li key={data.id}>
                        <h4>{data.name}</h4>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ModelList;