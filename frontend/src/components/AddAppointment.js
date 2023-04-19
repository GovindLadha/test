import axios from "axios";
import { useState } from "react";
import { BiCalendarPlus } from "react-icons/bi";


const AddAppointment = ({ onSendAppointment, lastId }) => {
  const clearData = {
    patientName: "",
    gender: "",
    age: "",
    insurance: "",
    hypertension: "",
    diabetes: "",
    alcoholism: "",
    handicaped: "",
    aptDate: "",
    aptTime: "",
  };
  let [toggleForm, setToggleForm] = useState(false);
  let [formData, setFormData] = useState(clearData);

  const formDataPosted = async() => {
    if (formData.patientName) {
      
      const body = {
        "Gender":formData.gender,
        "Age":parseInt(formData.age),
        "Scholarship":formData.insurance,
        "Hipertension":formData.hypertension,
        "Diabetes":formData.diabetes,
        "Alcoholism":formData.alcoholism,
        "Handcap":formData.handicaped
    }

    console.log("BODY",body);
  
    let result = await fetch("https://easyappointments-backend.onrender.com/have",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(body)
    });
    result=await result.json();
    if(result.status) {
      console.log(result)
      const appointmentInfo = {
        id: lastId + 1,
        name: formData.name,
        gender: formData.gender,
        age: formData.age,
        insurance: formData.insurance,
        hypertension: formData.hypertension,
        diabetes: formData.diabetes,
        alcoholism: formData.alcoholism,
        handicap: formData.handicap,
        aptDate: formData.aptDate + " " + formData.aptTime,
        probability: result['prob-pos']*100
      };

      onSendAppointment(appointmentInfo);
      setFormData(clearData);
      setToggleForm(!toggleForm);
      fetch('http://127.0.0.1:4000/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(appointmentInfo)
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))

    } else {
      alert("fill required fields");
    }
  }
  };

  return (
    <div>
      <button
        onClick={() => setToggleForm(!toggleForm)}
        className={`bg-blue-400 text-white px-2 py-3 w-full text-left  ${toggleForm ? "rounded-t-md" : "rounded-md"
          }`}
      >
        <div>
          <BiCalendarPlus className="inline-block align-text-top" /> Add
          Appointment
        </div>
      </button>
      {toggleForm && (
        <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="patientName"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Patient Name
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, patientName: event.target.value });
                }}
                required
                type="text"
                name="patientName"
                id="patientName"
                value={formData.patientName}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Gender
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <label htmlFor="diabetes_male" className="inline-flex items-center">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, gender: 0});
                  }}
                  type="radio"
                  name="gender"
                  id="gender_male"
                  value="0"
                  checked={formData.gender === 0}
                  required
                  className="mr-2"
                />
                <span>Male</span>
              </label>
              <label htmlFor="gender_female" className="inline-flex items-center" id="left_margin">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, gender: 1});
                  }}
                  type="radio"
                  name="gender"
                  id="gender_female"
                  value="1"
                  checked={formData.gender === 1}
                  required
                  className="mr-2"
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Age
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  setFormData({ ...formData, age: event.target.value });
                }}
                required
                type="number"
                name="age"
                id="age"
                value={formData.age}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="insurance"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Insurance
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <label htmlFor="insurance_yes" className="inline-flex items-center">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, insurance: 1});
                  }}
                  type="radio"
                  name="insurance"
                  id="insurance_yes"
                  value="1"
                  checked={formData.insurance === 1}
                  required
                  className="mr-2"
                />
                <span>Yes</span>
              </label>
              <label htmlFor="diabetes_no" className="inline-flex items-center" id="left_margin">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, insurance: 0});
                  }}
                  type="radio"
                  name="insurance"
                  id="insurance_no"
                  value="0"
                  checked={formData.insurance === 0}
                  required
                  className="mr-2"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="hypertension"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Hypertension
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <label htmlFor="hypertension" className="inline-flex items-center">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, hypertension: 1 });
                  }}
                  type="radio"
                  name="hypertension"
                  id="hypertension_yes"
                  value="1"
                  checked={formData.hypertension === 1}
                  required
                  className="mr-2"
                />
                <span>Yes</span>
              </label>
              <label htmlFor="hypertension" className="inline-flex items-center" id="left_margin">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, hypertension: 0 });
                  }}
                  type="radio"
                  name="hypertension"
                  id="hypertension_no"
                  value="0"
                  checked={formData.hypertension === 0}
                  required
                  className="mr-2"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="diabetes"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Diabetes
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <label htmlFor="diabetes_yes" className="inline-flex items-center">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, diabetes: 1 });
                  }}
                  type="radio"
                  name="diabetes"
                  id="diabetes_yes"
                  value="1"
                  checked={formData.diabetes === 1}
                  required
                  className="mr-2"
                />
                <span>Yes</span>
              </label>
              <label htmlFor="diabetes_no" className="inline-flex items-center" id="left_margin">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, diabetes: 0 });
                  }}
                  type="radio"
                  name="diabetes"
                  id="diabetes_no"
                  value="0"
                  checked={formData.diabetes === 0}
                  required
                  className="mr-2"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="alcoholism"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Alcoholism
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <label htmlFor="alcoholism_yes" className="inline-flex items-center">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, alcoholism: 1 });
                  }}
                  type="radio"
                  name="alcoholism"
                  id="alcoholism_yes"
                  value="1"
                  checked={formData.alcoholism === 1}
                  required
                  className="mr-2"
                />
                <span>Yes</span>
              </label>
              <label htmlFor="alcoholism_no" className="inline-flex items-center" id="left_margin">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, alcoholism: 0});
                  }}
                  type="radio"
                  name="alcoholism"
                  id="alcoholism_no"
                  value="0"
                  checked={formData.alcoholism === 0}
                  required
                  className="mr-2"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="handicaped_yes"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Handicaped
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <label htmlFor="handicaped_yes" className="inline-flex items-center">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, handicaped: 1 });
                  }}
                  type="radio"
                  name="handicaped"
                  id="handicaped_yes"
                  value="1"
                  checked={formData.handicaped === 1}
                  required
                  className="mr-2"
                />
                <span>Yes</span>
              </label>
              <label htmlFor="handicaped_no" className="inline-flex items-center" id="left_margin">
                <input
                  onChange={(event) => {
                    setFormData({ ...formData, handicaped: 0});
                  }}
                  type="radio"
                  name="handicaped"
                  id="handicaped_no"
                  value="0"
                  checked={formData.handicaped === 0}
                  required
                  className="mr-2"
                />
                <span>No</span>
              </label>
            </div>
          </div>




          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptDate"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Apt Date
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                required
                onChange={(event) => {
                  setFormData({ ...formData, aptDate: event.target.value });
                }}
                type="date"
                name="aptDate"
                id="aptDate"
                value={formData.aptDate}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
            <label
              htmlFor="aptTime"
              className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
            >
              Apt Time
            </label>
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <input
                onChange={(event) => {
                  const selectedTime = event.target.value;
                  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                  const earliestTime = '09:00';
                  const latestTime = '18:00';

                  // Check if selectedTime is within the desired time range
                  if (selectedTime >= earliestTime && selectedTime <= latestTime &&
                    selectedTime >= currentTime && selectedTime <= latestTime) {
                    setFormData({ ...formData, aptTime: selectedTime });
                  } else {
                    // If selectedTime is outside the desired time range, set the input value to the earliest time
                    setFormData({ ...formData, aptTime: earliestTime });
                  }
                }}
                type="time"
                name="aptTime"
                id="aptTime"
                value={formData.aptTime}
                className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                onClick={formDataPosted}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAppointment;
