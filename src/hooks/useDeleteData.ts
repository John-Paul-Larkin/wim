const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

interface DeleteDataInputs {
  url: string;
  id: number;
}

const useDeleteData = () => {
  const deleteData = async ({ url, id }: DeleteDataInputs) => {
    let error: Error | null = null;
    let responseData: unknown;

    try {
      const response = await fetch(baseURL + url, {
        method: "DELETE",
        //  credentials: "include"
        headers: {
          // "Content-Type": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      responseData = await response.json();
    } catch (err) {
      error = err as Error;
    }
    console.log(responseData);
    return { error, responseData };
  };
  return { deleteData };
};

export default useDeleteData;
