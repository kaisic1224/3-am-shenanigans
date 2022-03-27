import Head from "next/head";
import { useCallback, useEffect, useState } from "react";

const asteroids = () => {
  const [day, setDay] = useState(50);
  const [data, setData] = useState<any>();
  const [fetchDate, setFetchDate] = useState<number>();

  async function fetchData() {
    const response = await fetch(
      `https://api.nasa.gov/EPIC/api/natural/images?api_key=89d5yUPlxJBKnTlI9ppycxZeRCecnYcAvDQeFgdj`
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
      setFetchDate(Date.now() + day);
      console.log(Date.now());
    }, 5000),
    []
  );

  return (
    <>
      <Head>
        <title>Space Surf | Asteroids</title>
      </Head>

      <main>
        <h1>See how our Earth is changing!</h1>
        <input
          type='range'
          value={day}
          onChange={(e) => {
            setDay(Number(e.target.value));
            debouncedDay();
          }}
        />
      </main>
    </>
  );
};
export default asteroids;
