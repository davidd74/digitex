export const formatDate = (inputDate) => {
  let date = new Date(inputDate);
  let formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Split and rearrange the date
  let parts = formattedDate.split("/");
  formattedDate = `${parts[1]}.${parts[0]}.${parts[2]}`;

  return formattedDate;
};
