import { useState } from "react";
import Select from "react-select";


interface Inputs {
    totalValue?:string|null;
}

export default function SelectTime(props:Inputs) {

    let {totalValue} = props;
  
    const [timeInterval, setTimeInterval] = useState<IntervalSelect>({ value: "all-time", label: "all-time" });
  
    const handleChangeIntervalSelect = (selectedOption: IntervalSelect | null) => {
      if (selectedOption) {
        if(totalValue){
            totalValue = null;
        }
        setTimeInterval(selectedOption);
        // refetchData();
      }
    };



  return (
    <>
      <Select
          className=""
          //   placeholder='sdsd'
          options={selectOptions}
          onChange={handleChangeIntervalSelect}
          value={timeInterval}
          defaultValue={timeInterval}
          // menuIsOpen={true}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: 0,
              width: "110px",
              // backgroundColor: "transparent",
            }),
            container: (baseStyles) => ({
              ...baseStyles,
              border: 0,
              width: "110px",
            }),
          }}
        ></Select>
    
    </>
  )
}