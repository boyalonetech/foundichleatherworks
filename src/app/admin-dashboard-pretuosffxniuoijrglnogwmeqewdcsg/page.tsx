import AdminDashboard from "@/components/AdminDashboard";
import { getProductsInStock } from "@/lib/getProductsInStock";

const AdminPage = async () => {
  const productsInStock = await getProductsInStock();

  return <AdminDashboard productsInStock={productsInStock} />;
};

export default AdminPage;
