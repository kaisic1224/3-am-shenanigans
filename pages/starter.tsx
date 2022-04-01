import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

const starter = () => {
  return (
    <>
      <Head>
        <title>Space Surf | Choose</title>
      </Head>
      <main className='bg-black text-white '>
        <motion.div className='overflow-hidden absolute flex flex-col justify-between min-h-screen w-full'>
          <motion.h1
            initial={{ x: "-100%" }}
            animate={{ x: "100vw" }}
            transition={{ type: "tween", duration: 6, repeat: Infinity }}
            className='text-8xl uppercase font-bold bg-gradient-to-t from-slate-700 to-white bg-clip-text text-transparent'
          >
            Space
          </motion.h1>
          <motion.h1
            initial={{ x: "100%" }}
            animate={{ x: "-100vw" }}
            transition={{
              type: "tween",
              duration: 5,
              repeat: Infinity,
              repeatDelay: 0.5
            }}
            className='ml-auto text-8xl uppercase font-bold bg-gradient-to-t from-slate-700 to-white bg-clip-text text-transparent'
          >
            Surf
          </motion.h1>
        </motion.div>
        <motion.div
          transition={{ delayChildren: 0.5 }}
          className='absolute justify-center items-center flex gap-72 h-full w-full px-8'
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, y: 150 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring" }}
            className='font-extrabold bg-blue-900 p-[.75em] px-[1em] rounded-full uppercase
          hover:bg-blue-800'
          >
            <Link href='/asteroids'>
              <a className='text-white no-underline'>
                Earth Picture of the Day
              </a>
            </Link>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ scale: 0, y: 150 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring" }}
            className='font-extrabold bg-blue-900 p-[.75em] px-[1em] rounded-full uppercase
          hover:bg-blue-800'
          >
            <Link href='/APOD'>
              <a className='text-white no-underline'>
                Astronomy Picture of the Day
              </a>
            </Link>
          </motion.button>
        </motion.div>
        <section className='h-screen overflow-hidden'>
          <motion.img
            className='w-full h-full object-cover'
            transition={{ ease: "easeOut", duration: 0.45 }}
            src='/space-bg.jpg'
            layoutId='main-img'
          />
        </section>
      </main>
    </>
  );
};
export default starter;
