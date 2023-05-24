import { useState } from "react";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

const useFetchIndividualData = () => {
  const fetchIndividualData = async ({ url }: { url: string }) => {
    // const data = fetch(baseURL + url)
    //   .then((res) => res.json())
    //   .then((data) => {
    //       console.log(data)
    //     //   returnData = data
    //     //   console.log(returnData)
    //   });

    //   console.log(returnData)
    // return returnData;

    const response = await fetch(baseURL + url);

    const data = await response.json();

    return data;
  };

  return { fetchIndividualData };
};

export default useFetchIndividualData;
