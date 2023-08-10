import React from "react";
import Link from "next/link";

import { Data } from "../types/data";
import Hero from "../components/Hero";
import redis, { REDIS_KEY } from "../lib/db";

const App: React.FC<{ data: Data }> = ({ data }) => (
  <div className="w-full mx-auto">
    <div className="px-4 sm:px-6 py-4 sm:py-6 mb-12 bg-gray-100">
      <div className="flex flex-wrap justify-between">
        <h1 className="basis-4/6 text-2xl font-bold tracking-tight text-gray-900">
          Site
        </h1>
        <Link
          href="/"
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Edit this page
        </Link>
      </div>
    </div>
    <div className="px-4 sm:px-6">
      <Hero data={data} />
    </div>
  </div>
);

export async function getServerSideProps() {
  const data: Data = await redis.get(REDIS_KEY);

  return {
    props: {
      data,
    },
  };
}

export default App;
