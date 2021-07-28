import Api from "./api";

// API to get list of content
export const getContent = async () => {
    try {
      const response = await Api.get("/api/content/view");
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

// API to update click amount in database
// @param id : id program that clicked
export const updateCount = async(id) => {
    try {
      const response = await Api.put(`/api/content/click/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
};