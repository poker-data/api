const invoicePutBodyFormatter = (receivedBody) => {
  const {
    concepts,
    title,
    cost,
    customerId,
    work,
  } = receivedBody;
  
  return {
    concepts,
    title,
    cost,
    customerId,
    work,
  };
};

const invoicePostBodyFormatter = (receivedBody) => {
  const {
    concepts,
    title,
    cost,
    customerId,
    work,
  } = receivedBody;
  return {
    concepts,
    title,
    cost,
    customerId,
    work,
  };
};
module.exports = { invoicePutBodyFormatter, invoicePostBodyFormatter };
