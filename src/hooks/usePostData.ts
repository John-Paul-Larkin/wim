const baseURL = import.meta.env.VITE_BACK_END_BASE_URL;

const usePostData = () => {
  //   const [error, setError] = useState<Error | null>(null);
  //   const [responseData, setResponseData] = useState("");
  // eslint-disable-next-line
  const postData = async ({ url, jsonData }: { url: string; jsonData?: any }) => {
    let error: Error | null = null;
    // eslint-disable-next-line
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

// import { useCallback, useState } from "react";

// const usePostData = <BodyData, ResponseData>(
//   query: string,
//   headers?: HeadersInit
// ): {
//   post: (data: BodyData) => Promise<void>;
//   loading: boolean;
//   error: Error | null;
//   responseData: ResponseData | null;
// } => {
//   const [responseData, setResponseData] = useState<ResponseData | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);

//   const post = useCallback(
//     async (data: BodyData) => {
//       try {
//         setLoading(true);
//         const response = await fetch(query, {
//           method: "POST",
//           body: JSON.stringify(data),
//           headers,
//         });
//         const json = await response.json();

//         setResponseData(json);
//         setLoading(false);
//       } catch (error) {
//         setError(error as Error);
//         setLoading(false);
//       }
//     },
//     [headers, query]
//   );

//   return { responseData, loading, error, postData };
// };
// export default usePostData;
