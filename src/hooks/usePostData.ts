import { useEffect, useState } from "react";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

const usePostData = () => {
  const [error, setError] = useState<Error | null>(null);
  const [responseData, setResponseData] = useState("");

  const postData = async ({ url, jsonData }: { url: string; jsonData: any }) => {
    try {
      const response = await fetch(baseURL + url, {
        method: "POST",
        // mode: "cors",
        // credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonData,
      });
      const response1 = await response.json();
      setResponseData(response1);
    } catch (error) {
      setError(error as Error);
    }
    return { error, responseData };
  };

  return { postData };
};

export default usePostData;
