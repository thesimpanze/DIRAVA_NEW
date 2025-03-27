import { Link, router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";



const SpeedDetectorDashboard = ({auth}) => {
  const [speedData, setSpeedData] = useState({ speed_limit: 0, last_speed: 0 });
  
  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.137.15/data");
      const data = await response.json();
      setSpeedData(data)
      if(data.speed_limit != 0){

        router.post('/speed-detection', {
          timestamp: new Date().toISOString(),
          last_speed: data.last_speed,
          speed_limit: data.speed_limit
        }, {
          preserveScroll: true, 
          preserveState: true,  
          onSuccess: () => {
            console.log('Data berhasil disimpan');
          },
          onError: (errors) => {
            console.error('Error menyimpan data:', errors);
          }
        });
      }

  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData(); 
    const interval = setInterval(fetchData, 1500); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="">
      <div className=" flex justify-center font-display bg-red ">
        <div className="fixed flex m-auto items-center mt-4 outline px-3 rounded-full py-1 hover:shadow-[5px_5px_0_0_rgba(0,0,0,1)] hover:scale-110 ease-in-out transition duration-300 delay-75 ">
          <ul className="flex gap-2 capitalize">
            {auth.user ? (

              <li className="hover:scale-110 ease-in-out duration-300 transition group delay-150"> <Link href={route('dashboard')}>Dashboard</Link></li>
            ):(
              <div className="flex gap-2">

            <li className="hover:scale-110 ease-in-out duration-300 transition group delay-150"> <Link href={route('login')}>Login</Link></li>
            <li>|</li>
            <li className="hover:scale-110 ease-in-out duration-300 transition group delay-150"><Link href={route('register')}>Register</Link></li>
              </div>
            )}
            <li>|</li>
            <li className="hover:scale-110 ease-in-out duration-300 transition group delay-150"><a href="https://drive.google.com/drive/folders/1-1bsgS9rdHAy8izu9rnK0QZAM5bfCncr" target="_blank">Documentation</a></li>
          </ul>
        </div>

        <div className="items-center flex w-screen h-screen justify-center">
          <div className=" h-[60%] w-[80%] text-center rounded-xl outline outline-[3px] shadow-[15px_15px_0_0_rgba(0,0,0,1)] flex-col  ">
            <div className="">

            <h1 className="text-2xl font-bold mt-1">IShowSpeed</h1>
            </div>
            <div className="text-[9rem] font-bold text-center ">
              <p>
                {speedData.last_speed} <span className="text-5xl">KM/H</span>
              </p>
            </div>
            <div className=" text-2xl font-bold">

              {speedData.last_speed > speedData.speed_limit ? (
                <p> WARNING OVERSPEED
                </p>
              ):(
                <p>NORMAL SPEED</p>
              )}
              </div>
            <h1 className="mt-1 capitalize">
              speed limit: <span>{speedData.speed_limit} </span> Km/h
            </h1>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default SpeedDetectorDashboard;
