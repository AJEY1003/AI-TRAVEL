import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelsList } from '../constants/options';
import { toast, Toaster } from 'react-hot-toast';

function CreateTrip() {
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    console.log(formData); // Log the form data to debug
  }, [formData]);

  const OnGenerateTrip = () => {
    if (
      formData.noOfDays > 5 &&
      (!formData.location || !formData.budget || !formData.traveler)
    ) {
      toast.error('Please fill all details');
      return;
    }

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)  // Fixed {location} syntax
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget)  // Fixed {budget} syntax
      .replace('{totalDays}', formData?.noOfDays);  // Ensured correct replacement of {totalDays}

    console.log(FINAL_PROMPT);
    console.log('Trip Data:', formData);
    
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel experiences 🏕🌴</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Provide some basic information, and our trip planner will generate a customized itinerary for you.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div className="space-y-3">
          <h2 className="text-xl my-3 font-medium">What is the destination of choice?</h2>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Type your destination"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              handleInputChange('location', e.target.value);
            }}
          />
        </div>

        <div className="space-y-3">
          <h2 className="text-xl my-3 font-medium">How many days are you planning your trip?</h2>
          <input
            type="number"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Ex. 3"
            onChange={(e) => handleInputChange('noOfDays', Number(e.target.value))}
          />
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.budget === item.title && 'shadow-lg border-black'
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with for your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelsList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', formData.traveler === item.people ? '' : item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${
                formData?.traveler === item.people && 'shadow-lg border-black'
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <button
          className="bg-black text-white py-2 px-4 rounded-lg"
          onClick={OnGenerateTrip}
        >
          Generate Trip
        </button>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}

export default CreateTrip;
