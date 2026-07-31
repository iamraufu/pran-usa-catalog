import axios from "axios";

export async function getProducts() {
  try {
    const params = new URLSearchParams();

    params.append("emp_id", "1457");
    params.append("country_id", "42");
    params.append("site_id", "831");
    params.append("slgp_id", "1");
    params.append("ou_id", "1");
    params.append("dpot_id", "1");
    params.append("discount_id", "0");
    params.append("srid", "1457");
    params.append("is_coworking", "0");

    const response = await axios.post(
      "/warehouse/api/v2/OrderModuleDataUAE/CheckINSyncAllData_Merge",
      params,
      {
        headers: {
          ApiKey: "f06ff43be3310989",
          "App-Language": "en",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return response.data?.Sync_Product_Info_Table?.data || [];
  } catch (error) {
    console.log("STATUS:", error.response?.status);

    console.log("ERROR:", error.response?.data);

    return [];
  }
}
