export const getItems = () =>{
    return fetch('localhost:3000/api/patient/fetchAllPatients')
    .then(res=>res.json())
    .catch(err => console.log(err));
}