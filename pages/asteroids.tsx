import Head from "next/head";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const asteroids = () => {
  const [day, setDay] = useState(1);
  const [data, setData] = useState<any>([]);
  const [date, setDate] = useState<string>();
  const [today, setToday] = useState<Date>(new Date());

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
      const deToday = new Date(today);

      const mm = deToday.getMonth() + 1;
      const yyyy = deToday.getFullYear() - 1;
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

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className='bg-black min-h-screen text-white text-center'
      >
        <h1 className=''>See how our Earth is changing!</h1>
        <div className='flex w-screen justify-between'>
          {data.length === 0 ? null : (
            <div className='self-end'>
              <h1>{today?.getMonth()! - 1}</h1>
              <img src='/saturn.jpg' className='object-cover w-[30rem]' />
            </div>
          )}
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
                className='slider'
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
          {data.length === 0 ? null : (
            <div className='self-end'>
              <h1>{today?.getMonth()}</h1>
              <img src='/venus.jpg' className='object-cover w-[30rem]' />
            </div>
          )}
        </div>
      </motion.main>
    </>
  );
};
export default asteroids;
