import React, { useState } from 'react';
import { PlusCircle, X, Check, AlertTriangle, User, Moon, Sun, Car } from 'lucide-react';
import axios from 'axios';

const AdminSide = () => {
    const [formVisible, setFormVisible] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);
    const [darkMode, setDarkMode] = useState(false);

    const adminName = "Admin User";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('https://localhost:7038/api/Brand/AddMake', {
                name,
                description
            });

            setNotification({
                type: 'success',
                message: `Added ${name} successfully`
            });
            setName('');
            setDescription('');

            setTimeout(() => {
                setNotification(null);
            }, 5000);
        } catch (error) {
            setNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to add make'
            });
        } finally {
            setLoading(false);
        }
    };

    const dismissNotification = () => setNotification(null);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return (
        <div className={`min-vh-100 ${darkMode ? 'dark-mode' : ''}`}>
            <nav className="navbar navbar-expand-lg sticky-top shadow-sm">
                <div className="container">
                    <div className="d-flex align-items-center">
                        <Car className="me-2 text-info" size={24} />
                        <h1 className="navbar-brand mb-0 h1 gradient-text">Vehicle Admin</h1>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <button
                            onClick={toggleDarkMode}
                            className="btn btn-outline-secondary rounded-circle p-2"
                            aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                        >
                            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        <div className="d-flex align-items-center gap-2 bg-light rounded-pill px-3 py-2">
                            <User size={18} className="text-info" />
                            <span className="fw-medium">{adminName}</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="container py-4">
                <div className="row mb-4">
                    <div className="col-12 col-md-8">
                        <h2 className="display-6 fw-bold mb-0">Vehicle Makes</h2>
                        <p className="text-muted">Manage and organize vehicle manufacturers</p>
                    </div>
                    <div className="col-12 col-md-4 d-flex justify-content-md-end align-items-md-center">
                        <button
                            onClick={() => {
                                setFormVisible(!formVisible);
                                console.log("Form visible:", !formVisible);
                            }}
                            className={`btn ${formVisible ? 'btn-outline-danger' : 'btn-primary'} d-flex align-items-center gap-2`}
                        >

                            {formVisible ? (
                                <>
                                    <X size={18} />
                                    <span>Cancel</span>
                                </>
                            ) : (
                                <>
                                    <PlusCircle size={18} />
                                    <span>Add Make</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {formVisible && (
                    <div className="card shadow-sm mb-4">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="make-name" className="form-label">
                                        Make Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        id="make-name"
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter manufacturer name (e.g. Toyota, BMW)"
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="make-description" className="form-label">Description</label>
                                    <textarea
                                        id="make-description"
                                        className="form-control"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Enter a brief description of the manufacturer"
                                        rows="3"
                                    />
                                </div>

                                <div className="text-end">
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn btn-primary bg-primary"
                                    >
                                        {loading ? (
                                            <span className="d-flex align-items-center gap-2">
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                                Processing...
                                            </span>
                                        ) : (
                                            'Add Make'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}



                {/* Recent Makes List */}
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h3 className="card-title mb-4">Recent Makes</h3>

                        <div className="text-center py-5">
                            <Car size={48} className="text-muted mb-3 opacity-50" />
                            <p className="h5 text-muted">No makes have been added yet</p>
                            <p className="text-muted">Use the "Add Make" button to create your first vehicle make</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Notification */}
            {notification && (
                <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
                    <div className={`toast show notification-slide ${notification.type === 'success' ? 'bg-success' : 'bg-danger'
                        } text-white`}>
                        <div className="toast-header">
                            <div className="d-flex align-items-center gap-2">
                                {notification.type === 'success' ? (
                                    <Check size={20} />
                                ) : (
                                    <AlertTriangle size={20} />
                                )}
                                <strong className="me-auto">
                                    {notification.type === 'success' ? 'Success' : 'Error'}
                                </strong>
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={dismissNotification}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="toast-body">
                            {notification.message}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSide;