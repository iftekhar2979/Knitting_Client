export const getYarnReturnTransactions = (item = {}) => {
  const returnLists = [
    item.yarnInformationWithDetails,
    item.YarnInformationWithDetails,
    item.details,
    item.yarnInformationDetails,
    item.returnedYarns,
    item.returns,
  ];

  return returnLists.find(Array.isArray) || [];
};
