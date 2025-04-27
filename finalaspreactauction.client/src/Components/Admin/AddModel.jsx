import axios from "axios"
import { useState } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

function AddModel() {
    const [modelType, setModeltype] = useState("");
    const [modelName, setModelName] = useState("")
    const [makeId, setMakeId] = useState("")
    const [flag, setFlag] = useState(false);
    const [makes, setMakes] = useState([]);

    useState(() => {
        axios.get("https://localhost:7038/api/Brand/GetAll")
            .then((res) => { setMakes(res.data) })
    }, [])

    const handleModel = async (event) => {
        event.preventDefault();

        const model = {
            name: modelName,
            type: modelType,
            makeId: makeId
        }
        var res = axios.post("https://localhost:7038/api/Model/AddModel", model, {
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (res.status == 200) {
            console.log("Ok");
            console.log(res.data)
        }
    }

    return (
        <div>
            <h3 onClick={() => setFlag(!flag)} style={{ cursor: "pointer" }}>{!flag ? "Add New Model" : "Cancel"}</h3>
            {flag && <Form onSubmit={handleModel} className="forEdit">
                <Form.Group className="mb-3" controlId="formBasicMake" style={{ padding: "0 5px" }}>
                    <Form.Label style={{ fontFamily: "sans-serif" }}>Make</Form.Label>
                    <Form.Control
                        as="select"
                        placeholder="Enter Make"
                        value={makeId}
                        onChange={(e) => setMakeId(e.target.value)}
                        required
                    >
                        <option value="">Select Make</option>
                        {makes.map((make) => (
                            <option key={make.id} value={make.id}>{make.name}</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName" style={{ padding: "0 5px" }}>
                    <Form.Label style={{ fontFamily: "sans-serif" }}>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicType" style={{ padding: "0 5px" }}>
                    <Form.Label>Type</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter Type"
                        value={modelType}
                        onChange={(e) => setModeltype(e.target.value)}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    style={{ display: "block", width: "50%", margin: "0 auto" }}
                >
                    Submit
                </Button>
            </Form>}

            {/*{response && (*/}
            {/*    <div>*/}
            {/*        <h3>Make Added Successfully</h3>*/}
            {/*        <p>Name: {response.name}</p>*/}
            {/*        <p>Description: {response.description}</p>*/}
            {/*    </div>*/}
            {/*)}*/}

            {/*{error && (*/}
            {/*    <div style={{ color: "red", marginTop: "10px" }}>*/}
            {/*        <p>{error}</p> */}{/* Display error message */}
            {/*    </div>*/}
            {/*)}*/}
        </div>
    )
}

export default AddModel;