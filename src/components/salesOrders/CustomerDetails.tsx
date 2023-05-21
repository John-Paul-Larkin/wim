export const CustomerDetails = ({ customerDetails }: { customerDetails: CustomerData | null | undefined }) => {
  return (
    < div className="customer-info">
      <div>
        <span>Customer:</span>
        <span>{customerDetails?.name}</span>
      </div>
      <div>
        <span>Rep:</span>
        <span>{customerDetails?.rep}</span>
      </div>
      <div>
        <span>Contact number:</span>
        <span>{customerDetails?.contact_phone}</span>
      </div>
      <div>
        <span>Email:</span>
        <span>{customerDetails?.email}</span>
      </div>
      <div>
        <span>Address:</span>
        <span>{customerDetails?.address}</span>
      </div>
      <div>
        <span>Customer id:</span>
        <span>{customerDetails?.customer_id}</span>
      </div>
      <div>
        <span>Eircode:</span>
        <span>{customerDetails?.eircode}</span>
      </div>
    </div>
  );
};
