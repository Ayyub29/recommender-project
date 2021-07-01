import Api from "./api";

// Method to get a list of all Pokemon
export const getContent = async () => {
    try {
      const response = await Api.get("/api/content/view");
      return response.data;
    } catch (error) {
      console.error(error);
    }
};

// Get a pokemon details by name
export const updateCount = async(id) => {
    try {
      const response = await Api.put(`/api/content/click/${id}`);
      return response;
    } catch (error) {
      console.error(error);
    }
};