import React from 'react';
import { useState } from 'react';
import { useGetDataQuery, useGetPostsQuery } from "../features/api";
import pics from '../imag'

function Patient() {
    const [activePatient, setActivePatient] = useState(null);
    const { data, error } = useGetDataQuery();
    console.log('API Response:', data);

    if (activePatient) {
        // Access the latest respiratory rate value
        const latestRespiratoryRate = activePatient.diagnosis_history[activePatient.diagnosis_history.length - 1]?.respiratory_rate?.value;
        console.log('Latest Respiratory Rate:', latestRespiratoryRate);
    }

    if (!data || data.length === 0) {
        return <div>No patient data available</div>;
    }
    const getUniqueLabResults = (labResults) => {
        return [...new Set(labResults)];
    };

    return (
        <div>
            <div className="min-h-screen p-6 pt-0">
                <div className="grid grid-cols-12 gap-4 max-h-52" >
                    <div className="col-span-3">
                        <div className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-2xl font-bold mb-4 text-[#072635] text-left">
                                Patient
                            </h2>
                            <ul className="overflow-y-auto custom-scrollbar" style={{ height: '70vh' }}>
                                {data.map((patient, index) => (
                                    <li key={index} onClick={() => setActivePatient(patient)} className={` flex items-center justify-between space-x-4 p-4 border-b cursor-pointer p-2 rounded-md mb-2 transition-colors m-2 duration-300 ${activePatient?.name === patient.name
                                        ? 'bg-[#D8FCF7]' // Active patient background color
                                        : 'hover:bg-gray-200'
                                        }`}>
                                        <div className="flex-shrink-0">
                                            <img
                                                src={patient.profile_picture}
                                                alt={patient.name}
                                                style={{ width: "45px", height: "45px" }}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <div className="flex-grow text-left">
                                            <h3 className="font-bold text-[#072635] text-sm">{patient.name}</h3>
                                            <p className='text-xs text-[#707070]'>{patient.gender},{patient.age}</p>
                                        </div>

                                        {/* Third Column: Three Dot Icon */}
                                        <div className="flex-shrink-0 cursor-pointer">
                                            <span className="material-icons">more_vert</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="bg-white rounded-lg shadow p-4">
                            <h2 className="text-xl font-bold mb-4 text-[#072635]">Diagnostic Details</h2>
                            {activePatient ? (
                                <>
                                    <div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                                            <div className="bg-[#E0F3FA] p-5 rounded-lg shadow-lg">
                                                <img src={pics.RATE} alt="" style={{ width: "60px", height: "60px" }} />
                                                <h3 className="text-md text-[#072635]">Respiratory Rate</h3>
                                                {activePatient?.diagnosis_history && activePatient.diagnosis_history.length > 0 ? (
                                                    <div>
                                                        <p className='text-[#072635] text-3xl font-bold'>{activePatient.diagnosis_history[0]?.respiratory_rate?.value || "No value available"} bpm</p>
                                                    </div>
                                                ) : (
                                                    <p>No diagnosis history available</p>
                                                )}
                                                {activePatient?.diagnosis_history && activePatient.diagnosis_history.length > 0 ? (
                                                    <div>
                                                        <p className='text-[#072635] mt-4 text-md'>{activePatient.diagnosis_history[0]?.respiratory_rate?.levels || "No value available"}</p>
                                                    </div>
                                                ) : (
                                                    <p>No diagnosis history available</p>
                                                )}
                                            </div>


                                            <div className="bg-[#FFE6E9] p-6 rounded-lg shadow-lg">
                                                <img src={pics.TEMP} alt="" style={{ width: "60px", height: "60px" }} />
                                                <h3 className="text-md text-[#072635]">Temperature</h3>
                                                {activePatient?.diagnosis_history && activePatient.diagnosis_history.length > 0 ? (
                                                    <div>
                                                        <p className='text-[#072635] text-3xl font-bold'>{activePatient.diagnosis_history[0]?.temperature?.value || "No value available"} <sup>o</sup>F</p>
                                                    </div>
                                                ) : (
                                                    <p>No diagnosis history available</p>
                                                )}
                                                {activePatient?.diagnosis_history && activePatient.diagnosis_history.length > 0 ? (
                                                    <div>
                                                        <p className='text-[#072635] mt-4 text-md'>{activePatient.diagnosis_history[0]?.temperature?.levels || "No value available"}</p>
                                                    </div>
                                                ) : (
                                                    <p>No diagnosis history available</p>
                                                )}
                                            </div>


                                            <div className="bg-[#FFE6F1] p-6 rounded-lg shadow-lg">
                                                <img src={pics.HEART} alt="" style={{ width: "60px", height: "60px" }} />
                                                <h3 className="text-md text-[#072635]">Heart Rate</h3>
                                                {activePatient?.diagnosis_history && activePatient.diagnosis_history.length > 0 ? (
                                                    <div>
                                                        <p className='text-[#072635] text-3xl font-bold'>{activePatient.diagnosis_history[0]?.heart_rate?.value || "No value available"} <sup>o</sup>F</p>
                                                    </div>
                                                ) : (
                                                    <p>No diagnosis history available</p>
                                                )}
                                                {activePatient?.diagnosis_history && activePatient.diagnosis_history.length > 0 ? (
                                                    <div>
                                                        <p className='text-[#072635] mt-4 text-md'>{activePatient.diagnosis_history[0]?.heart_rate?.levels || "No value available"}</p>
                                                    </div>
                                                ) : (
                                                    <p>No diagnosis history available</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-500">Select a patient to view details.</p>
                            )}
                        </div>
                        <div className="bg-white rounded-lg shadow p-4 mt-4">
                            <h2 className="text-xl font-bold mb-4 text-[#072635]">
                                Diagnostic List
                            </h2>
                            <div>
                                {activePatient ? (
                                    <>
                                        <div className="overflow-x-auto max-h-48 custom-scrollbar">
                                            {activePatient.diagnostic_list && activePatient.diagnostic_list.length > 0 ? (
                                                <table className="w-full border-collapse">
                                                    <thead>
                                                        <tr className="bg-[#F6F7F8] text-[#072635] text-left text-md rounded-full">
                                                            <th className="py-3 px-6 rounded-l-full">Problem/Diagnosis</th>
                                                            <th className="py-3 px-6">Description</th>
                                                            <th className="py-3 px-6 rounded-r-full">Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {activePatient.diagnostic_list.map((diagnosis, index) => (
                                                            <tr key={index} className="border-b">
                                                                <td className="py-3 px-6">{diagnosis.name || "No problem available"}</td>
                                                                <td className="py-3 px-6">{diagnosis.description || "No description available"}</td>
                                                                <td className="py-3 px-6">{diagnosis.status || "No status available"}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <p>No diagnosis history available</p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <p>Loading patient data...</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="bg-white rounded-lg shadow p-3">
                            {activePatient ? (
                                <>
                                    <div>
                                        <div className="flex justify-center items-center mb-3">
                                            <img
                                                src={activePatient.profile_picture}
                                                alt={activePatient.name}
                                                style={{ width: "80px", height: "80px" }}
                                                className="rounded-full"
                                            />
                                        </div>
                                        <h5 className='text-center font-bold text-md text-[#072635]'>{activePatient.name}</h5>
                                        <div className="grid grid-cols-12 p-1 gap-4">
                                            <div className="col-span-1 flex justify-center items-center bg-[#F6F7F8] rounded-full h-8 w-8">
                                                <span className="material-icons text-sm text-[#072635]">calendar_today</span>
                                            </div>
                                            <div className="col-span-11 text-left pl-4">
                                                <p className="text-[#072635] text-xs">Date of Birth</p>
                                                <div className="font-semibold text-[#072635] text-xs">
                                                    {new Intl.DateTimeFormat('en-US', {
                                                        month: 'long',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    }).format(new Date(activePatient.date_of_birth))}
                                                </div>
                                            </div>
                                            {/* gender */}
                                            <div className="col-span-1 flex justify-center items-center bg-[#F6F7F8] rounded-full h-8 w-8">
                                                <span className="material-icons text-sm text-[#072635]">female</span>
                                            </div>
                                            <div className="col-span-11 text-left pl-4">
                                                <p className="text-[#072635] text-xs">Gender</p>
                                                <div className="font-semibold text-[#072635] text-xs">
                                                    {activePatient.gender}
                                                </div>
                                            </div>
                                            {/* contact info */}
                                            <div className="col-span-1 flex justify-center items-center bg-[#F6F7F8] rounded-full h-8 w-8">
                                                <span className="material-icons text-sm text-[#072635]">phone</span>
                                            </div>
                                            <div className="col-span-11 text-left pl-4">
                                                <p className="text-[#072635] text-xs capitalize">contact info</p>
                                                <div className="font-semibold text-[#072635] text-xs">
                                                    {activePatient.phone_number}
                                                </div>
                                            </div>
                                            {/* emergency contact info */}
                                            <div className="col-span-1 flex justify-center items-center bg-[#F6F7F8] rounded-full h-8 w-8">
                                                <span className="material-icons text-sm text-[#072635]">phone</span>
                                            </div>
                                            <div className="col-span-11 text-left pl-4">
                                                <p className="text-[#072635] text-xs capitalize">emergency contacts</p>
                                                <div className="font-semibold text-[#072635] text-xs">
                                                    {activePatient.emergency_contact}
                                                </div>
                                            </div>
                                            {/* insurance */}
                                            <div className="col-span-1 flex justify-center items-center bg-[#F6F7F8] rounded-full h-8 w-8">
                                                <span className="material-icons text-sm text-[#072635]">verified_user</span>
                                            </div>
                                            <div className="col-span-11 text-left pl-4">
                                                <p className="text-[#072635] text-xs capitalize">Insurance Provider</p>
                                                <div className="font-semibold text-[#072635] text-xs">
                                                    {activePatient.insurance_type}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <button
                                                className="px-4 py-2 bg-[#01F0D0] text-white rounded-full  hover:bg-blue-600 transition duration-200 w-4/5"
                                                onClick={() => alert('Button clicked!')}
                                            >
                                                Show All Information
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p className="text-center text-gray-500">Select a patient to view details.</p>
                            )}
                        </div>
                        <div className="bg-white rounded-lg shadow p-4 mt-3">
                            {/* Section Title */}
                            <h2 className="text-lg font-bold mb-2 text-[#072635] text-left">
                                Lab Results
                            </h2>
                            {activePatient ? (
                                <>
                                    <ul className="custom-scrollbar max-h-20 overflow-y-auto">
                                        {activePatient.lab_results && activePatient.lab_results.length > 0 ? (
                                            getUniqueLabResults(activePatient.lab_results).map((result, index) => (
                                                <li key={index} className="flex justify-between items-center p-1 cursor-pointer hover:bg-[#F6F7F8] transition-colors duration-300"
                                                >
                                                    <span className="text-xs">{result}</span>
                                                    <span className="material-icons text-xl">download</span>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-center text-gray-500">No lab results available for this patient.</p>
                                        )}
                                    </ul>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg shadow">
                                    <span className="text-lg text-gray-500">Select a patient to view lab results.</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Patient