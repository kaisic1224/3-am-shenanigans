import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const asteroids = () => {
  const [day, setDay] = useState(1);
  const [data, setData] = useState<any>([]);
  const [date, setDate] = useState<string>();

  async function fetchData(fetchDate: string) {
    const response = await fetch(
      `https://api.nasa.gov/EPIC/api/natural/date/${fetchDate}?api_key=1p1iOPh5sEWHCNJsvWZWsUy4SYOmTSdTmYkLUGGJ`
    );
    const data = await response.json();
    setData(data);
    console.log(data);
  }

  function debounce(f: Function, t: number) {
    let timer: any;
    return (...params: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        f.apply(this, params);
      }, t);
    };
  }
  useEffect(() => {
    debouncedDay(day);
  }, [day]);

  const debouncedDay = useCallback(
    debounce((day: number) => {
      const today = new Date();

      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear() - 1;
      const dd = new Date(yyyy, mm, 1).getDate() - 1 + day;

      const fetchDate = `${yyyy}-${
        mm.toString().length === 1 ? `0${mm}` : mm
      }-${dd.toString().length === 1 ? `0${dd}` : dd}`;
      setDate(fetchDate);
      fetchData(fetchDate);
    }, 3000),
    []
  );

  return (
    <>
      <Head>
        <title>Space Surf | Asteroids</title>
      </Head>


      <main className='bg-black min-h-screen text-white text-center'>
        <h1 className=''>See how our Earth is changing!</h1>
        <div className='flex w-screen justify-between'>
          <div>
            <div className='planet w-24 h-24'></div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi est
              ex optio iure dolorum rerum! Veniam quibusdam ratione totam ea?
            </p>
          </div>
          <div className='w-[25rem] mx-auto flex flex-col items-center text-center'>
            <AnimatePresence exitBeforeEnter>
              {data.length === 0 ? null : (
                <div className='overflow-y-scroll flex flex-col h-[27rem] mb-20 custom-scroll'>
                  {data.map((pic) => {
                    return (
                      <div className='' key={pic.identifier}>
                        <motion.img
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ ease: "easeOut", duration: 0.6 }}
                          exit={{ y: "100%", opacity: 0 }}
                          src={`https://api.nasa.gov/EPIC/archive/natural/${date?.replaceAll(
                            "-",
                            "/"
                          )}/png/${
                            pic.image
                          }.png?api_key=1p1iOPh5sEWHCNJsvWZWsUy4SYOmTSdTmYkLUGGJ`}
                        />
                        <p className='text-lg'>Date: {pic.date}</p>
                        <p>
                          Centroid Coordinates:{" "}
                          {JSON.stringify(pic.centroid_coordinates).slice()}
                        </p>
                        <p className='text-2xl'>{pic.caption}</p>
                      </div>
                    );
                  })}
                </div>
              )}
              <input
                type='range'
                value={day}
                min={1}
                max={31}
                onChange={(e) => {
                  setDay(Number(e.target.value));
                }}
              />
              <div>Day: {day}</div>
            </AnimatePresence>
          </div>
          <div>MONTH2</div>

        </div>
      </main>
    </>
  );
};
export default asteroids;
