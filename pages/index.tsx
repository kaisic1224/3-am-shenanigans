import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const vars = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      duration: 1.2
    }
  }
};

const Home: NextPage = () => {
  return (
    <>

      <Head>
        <title>Space Surf | Home</title>
      </Head>
      <AnimatePresence exitBeforeEnter>
        <main>
          <section className='overflow-hidden min-h-screen text-7xl font-semibold text-white bg-black px-8'>
            {/* <Image src={"/space-bg.jpg"} layout='fill' objectFit='cover' /> */}
            <div className='flex items-center relative min-h-screen justify-between'>
              <motion.div
                initial='hidden'
                animate='show'
                variants={{
                  show: {
                    transition: { staggerChildren: 0.7, delayChildren: 0.5 }
                  }
                }}
              >
                <motion.h1
                  variants={vars}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  drag
                  className='hover:text-amber-300 cursor-default'
                >
                  Explore
                </motion.h1>
                <motion.h1
                  variants={vars}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  drag
                  className='hover:text-amber-300 cursor-default'
                >
                  Learn
                </motion.h1>
                <motion.h1
                  variants={vars}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  drag
                  className='hover:text-amber-300 cursor-default'
                >
                  Discover
                </motion.h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1, ease: "easeOut" }}
                className='group overflow-hidden absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 border-4 border-white cursor-pointer'
              >
                <Link href='/starter'>
                  <motion.img
                    className='transition-transform duration-1000 group-hover:scale-150'
                    src='/space-bg.jpg'
                    width={400}
                    height={300}
                    layoutId='main-img'
                  />
                </Link>
                <span
                  className='absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4
                text-xl transition-colors delay-150 duration-700 text-transparent group-hover:text-white'
                >
                  Enter...
                </span>
              </motion.div>
              <motion.div
                className='text-right'
                initial='hidden'
                animate='show'
                variants={{
                  show: {
                    transition: {
                      delayChildren: 0.5,
                      staggerChildren: 0.7,
                      staggerDirection: -1
                    }
                  }
                }}
              >
                <motion.h1
                  variants={vars}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  drag
                  className='hover:text-amber-300 cursor-default'
                >
                  Drift
                </motion.h1>
                <motion.h1
                  variants={vars}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  drag
                  className='hover:text-amber-300 cursor-default'
                >
                  Orbit
                </motion.h1>
                <motion.h1
                  variants={vars}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  drag
                  className='hover:text-amber-300 cursor-default'
                >
                  Rotate
                </motion.h1>
              </motion.div>
            </div>
          </section>
        </main>
      </AnimatePresence>

    </>
  );
};

export default Home;
