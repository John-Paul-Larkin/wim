import useFetchData from "../../hooks/useFetchData";

export const Dashboard = () => {
  

  interface test {
    total_cost:number;
  }
  
  const {fetchedData} = useFetchData<test[]>('/dashboard/getTotalValueOfStock')


  console.log(fetchedData?[0])


  return <div>s</div>;




};
