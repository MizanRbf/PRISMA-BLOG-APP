type IOptions = {
  page?: number | string;
  limit?: number | string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

const paginationSortingHelpers = (options: IOptions) => {
  console.log(options);
  return options;
};

export default paginationSortingHelpers;
