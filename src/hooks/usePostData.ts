
const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

const usePostData = () => {
  //   const [error, setError] = useState<Error | null>(null);
  //   const [responseData, setResponseData] = useState("");

  const postData = async ({ url, jsonData }: { url: string; jsonData?: any }) => {
    let error: Error | null = null;
    let responseData: any;
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
      responseData = await response.json();
    } catch (err) {
      error = err as Error;
    }
    return { error, responseData };
  };

  return { postData };
};

export default usePostData;
