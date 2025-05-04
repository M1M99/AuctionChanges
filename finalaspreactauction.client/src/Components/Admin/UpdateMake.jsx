import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

function UpdateMakeForm() {
    const [makeList, setMakeList] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [make, setMake] = useState({
        id: '',
        Description: '',
        Name: '',
    });

    useEffect(() => {
        const fetchMakes = async () => {
            try {
                const response = await axios.get('https://localhost:7038/api/Brand/GetAll');
                setMakeList(response.data);
            } catch (error) {
                console.error('Error fetching makes:', error);
            }
        };

        fetchMakes();
    }, [selectedId]);

    useEffect(() => {
        const fetchMakeDetails = async () => {
            if (!selectedId) return;

            try {
                const response = await axios.get(`https://localhost:7038/api/Brand/GetById?id=${selectedId}`);
                const data = response.data;
                setMake({
                    id: data.id,
                    Description: data.description || '',
                    Name: data.name || '',
                });
            } catch (error) {
                console.error('Error fetching make details:', error);
            }
        };

        fetchMakeDetails();
    }, [selectedId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMake((prevMake) => ({
            ...prevMake,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put('https://localhost:7038/api/Brand/EditMake', make, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Make updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating make:', error);
        }
    };


    const Radio = ({ makeList, selectedId, setSelectedId }) => {
        const selectedMake = makeList.find(make => String(make.id) === String(selectedId));
        const selectedName = selectedMake ? selectedMake.name : 'All';

        return (
            <StyledWrapper>
                <div className="select">
                    <div className="selected">
                        <span>{selectedName}</span> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" className="arrow">
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                        </svg>
                    </div>
                    <div className="options">
                        {makeList.map((make) => (
                            <div title={make.name} key={make.id}>
                                <input
                                    id={`make-${make.id}`}
                                    name="option"
                                    type="radio"
                                    value={make.id}
                                    checked={selectedId === String(make.id)}
                                    onChange={(e) => setSelectedId(e.target.value)}
                                />
                                <label className="option" htmlFor={`make-${make.id}`} data-txt={make.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </StyledWrapper>
        );
    };


    const StyledWrapper = styled.div`
  .select {
    width: fit-content;
    cursor: pointer;
    position: relative;
    transition: 300ms;
    color: white;
    overflow: hidden;
  }

  .selected {
    background-color: #2a2f3b;
    padding: 5px;
    margin-bottom: 3px;
    border-radius: 5px;
    position: relative;
    z-index: 100000;
    font-size: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .arrow {
    position: relative;
    right: 0px;
    height: 10px;
    transform: rotate(-90deg);
    width: 25px;
    fill: white;
    z-index: 100000;
    transition: 300ms;
  }

  .options {
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    padding: 5px;
    background-color: #2a2f3b;
    position: relative;
    top: -100px;
    opacity: 0;
    transition: 300ms;
  }

  .select:hover > .options {
    opacity: 1;
    top: 0;
  }

  .select:hover > .selected .arrow {
    transform: rotate(0deg);
  }

  .option {
    border-radius: 5px;
    padding: 5px;
    transition: 300ms;
    background-color: #2a2f3b;
    width: 150px;
    font-size: 15px;
  }
  .option:hover {
    background-color: #323741;
  }

  .options input[type="radio"] {
    display: none;
  }

  .options label {
    display: inline-block;
  }
  .options label::before {
    content: attr(data-txt);
  }

  .options input[type="radio"]:checked + label {
    display: none;
  }

  .options input[type="radio"]#all:checked + label {
    display: none;
  }

  .select:has(.options input[type="radio"]#all:checked) .selected::before {
    content: attr(data-default);
  }
  }`;

    const Button = () => {
        return (
            <StyledWrapper1>
                <button type="submit">
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24}>
                                <path fill="none" d="M0 0h24v24H0z" />
                                <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z" />
                            </svg>
                        </div>
                    </div>
                    <span>Edit</span>
                </button>
            </StyledWrapper1>
        );
    }

    const StyledWrapper1 = styled.div`
  button {
    font-family: inherit;
    font-size: 15px;
    background: royalblue;
    color: white;
    padding: 0.7em 1em;
    padding-left: 0.9em;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.2s;
    cursor: pointer;
  }

  button span {
    display: block;
    margin-left: 0.3em;
    transition: all 0.3s ease-in-out;
  }

  button svg {
    display: block;
    transform-origin: center center;
    transition: transform 0.3s ease-in-out;
  }

  button:hover .svg-wrapper {
    animation: fly-1 0.6s ease-in-out infinite alternate;
  }

  button:hover svg {
    transform: translateX(1.2em) rotate(45deg) scale(1.1);
  }

  button:hover span {
    transform: translateX(5em);
  }

  button:active {
    transform: scale(0.95);
  }

  @keyframes fly-1 {
    from {
      transform: translateY(0.1em);
    }

    to {
      transform: translateY(-0.1em);
    }
  }`;


    return (
        <>
            <h2 className="updateTitle">Update Make</h2>
            <div style={{ display: "flex" }}>
                <Radio
                    makeList={makeList}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                />

                {selectedId && (
                    <form onSubmit={handleSubmit} className="mx-5">
                        <input
                            className="form-control mb-1"
                            style={{fontWeight:"700"}}
                            type="text"
                            name="Name"
                            onChange={handleChange}
                            value={make.Name}
                            placeholder="Name"
                        />
                        <input
                            className="form-control mb-1"
                            style={{fontWeight:"500"}}
                            type="text"
                            name="Description"
                            onChange={handleChange}
                            value={make.Description}
                            placeholder="Description"
                        />
                        <Button/>
                    </form>
                )}
            </div>
        </>
    );
}

export default UpdateMakeForm;
