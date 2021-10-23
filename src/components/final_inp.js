import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import firebaseDb from "../firebase";
import Inputs from "./input";

const FinalInp = () => {

    var [contactObjects, setContactObjects] = useState({})
    var [currentId, setCurrentId] = useState('')

    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapshot => {
            if (snapshot.val() != null)
                setContactObjects({
                    ...snapshot.val()
                })
            else
                setContactObjects({})

        })
    }, [])// similar to componentDidMount

    const addOrEdit = obj => {
        if (currentId === '')
            firebaseDb.child('contacts').push(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        else
            firebaseDb.child(`contacts/${currentId}`).set(
                obj,
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
    }

    const onDelete = key => {
        if (window.confirm('Are you sure to delete this record?')) {
            debugger
            firebaseDb.child(`contacts/${key}`).remove(
                err => {
                    if (err)
                        console.log(err)
                    else
                        setCurrentId('')
                }
            )
        }
    }

    return (
        <>
            <div>
               
                    <h1 className="py-5 bg-info text-white text-center">Input To Table</h1>
               
            </div>
            <div className="text-center">
               
                    <Inputs {...({ addOrEdit, currentId, contactObjects })} />
                
                <h2 className="bg-info text-white py-3 my-3">
                    Data Table
                </h2>
                    <table className="table table-stripped">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Object.keys(contactObjects).map(id => {
                                    return <tr key={id}>
                                        <td>{contactObjects[id].userName}</td>
                                        <td>{contactObjects[id].names}</td>
                                        <td>{contactObjects[id].mobile}</td>
                                        <td>{contactObjects[id].email}</td>
                                        <td>{contactObjects[id].password}</td>
                                        <td>
                                            <a className="btn text-primary" onClick={() => { setCurrentId(id) }}>
                                                <i className="fas fa-pencil-alt"></i>
                                            </a>
                                            <a className="btn text-danger" onClick={() => { onDelete(id) }}>
                                                <i className="far fa-trash-alt"></i>
                                            </a>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>

               
            </div>
        </>
    );
}

export default FinalInp;