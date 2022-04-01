import { FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

const APOD = () => {
  const [photoOfDay, setPhotoOfDay] = useState<any>();
  const [date, setDate] = useState<string>("2021-10-05");
  const [switchDate, setSwtichDate] = useState(false);

  async function fetchPhoto(date: string) {
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=`
    );
    const data = await response.json();
    setPhotoOfDay(data);
  }

  useEffect(() => {
    fetchPhoto(date);
  }, [switchDate]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSwtichDate(!switchDate);
  };

  if (!photoOfDay)
    return (
      <>
        <div>
          <input />
          <input type='submit' />
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>Space Surf | APOD</title>
      </Head>
      <div className='h-screen'>
        <div className='flex'>
          <img
            className='-z-50 opacity-50 absolute h-screen w-screen'
            src={photoOfDay.url}
          />
          <motion.div
            initial={{ y: "50%", x: "10%" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.95 }}
            className='min-w-[600px] max-w-7xl relative min-h-fit max-h-fit rounded-xl bg-slate-500 grid grid-cols-3 mx-auto gap-2'
          >
            <img
              className='rounded-xl max-h-full min-h-full self-center justify-self-center aspect-square'
              src={photoOfDay.url}
            />
            <div className='col-span-2 p-4'>
              <h1 className='font-bold text-stone-800'>{photoOfDay.title}</h1>
              <h2 className='text-white'>{photoOfDay.date}</h2>
              <div className='text-xl min-w-fit min-h-fit font-semibold'>
                {photoOfDay.explanation}
              </div>
            </div>
          </motion.div>
          <div className='p-4'>
            Select a Date (YYYY-MM-DD):
            <form className='pt-2' onSubmit={handleSubmit}>
              <input
                type='text'
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <motion.input
                whileTap={{ scale: 0.95 }}
                className='bg-red-200 font-semibold p-2 rounded-xl ml-2'
                type='submit'
              ></motion.input>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default APOD;
