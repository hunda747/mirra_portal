import { DashboardData } from "@/features/dashboard/dashboardApiSlice";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  Store,
  CheckCircle,
  Clock,
  XCircle,
  Truck
} from "lucide-react";

interface DashboardContainerProps {
  dashboardData: DashboardData;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const STATUS_COLORS: Record<string, string> = {
  pending: '#FFBB28',
  confirmed: '#0088FE',
  delivered: '#00C49F',
  cancelled: '#FF8042',
  preparing: '#8884d8',
  out_for_delivery: '#82ca9d'
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock className="h-4 w-4" />,
  confirmed: <CheckCircle className="h-4 w-4" />,
  delivered: <CheckCircle className="h-4 w-4" />,
  cancelled: <XCircle className="h-4 w-4" />,
  preparing: <ShoppingBag className="h-4 w-4" />,
  out_for_delivery: <Truck className="h-4 w-4" />
};

const DashboardContainer = ({ dashboardData }: DashboardContainerProps) => {
  const { orders, users, revenue, products, shops } = dashboardData;

  // Add safety checks for each section
  const orderData = orders || { totalOrders: 0, todayOrders: 0, ordersByStatus: [] };
  const userData = users || { totalUsers: 0, newUsersToday: 0, usersByStatus: [] };
  const revenueData = revenue || { totalRevenue: 0, totalPlatformFees: 0, todayRevenue: 0, revenueByPaymentMethod: [], monthlyRevenueTrend: [] };
  const productData = products || { totalProducts: 0, productsByCategory: [], topProducts: [] };
  const shopData = shops || { totalShops: 0, openShops: 0, shopsByCategory: [], topShops: [] };

  return (
    <div className="p-5 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <SummaryCard
          title="Total Orders"
          value={orderData.totalOrders}
          description={`${orderData.todayOrders} new today`}
          icon={<ShoppingBag className="h-5 w-5" />}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Total Users"
          value={userData.totalUsers}
          description={`${userData.newUsersToday} new today`}
          icon={<Users className="h-5 w-5" />}
          color="bg-green-500"
        />
        <SummaryCard
          title="Total Revenue"
          value={`$${revenueData.totalRevenue.toLocaleString()}`}
          description={`$${revenueData.todayRevenue} today`}
          icon={<DollarSign className="h-5 w-5" />}
          color="bg-yellow-500"
        />
        <SummaryCard
          title="Total Products"
          value={productData.totalProducts}
          description={`${productData.productsByCategory.length} categories`}
          icon={<Package className="h-5 w-5" />}
          color="bg-purple-500"
        />
        <SummaryCard
          title="Total Shops"
          value={shopData.totalShops}
          description={`${shopData.openShops} shops open`}
          icon={<Store className="h-5 w-5" />}
          color="bg-pink-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Orders by Status</CardTitle>
            <CardDescription>Distribution of orders by their current status</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={orderData.ordersByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="_id"
                  label={({ _id, count }) => `${_id}: ${count}`}
                >
                  {orderData.ordersByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry._id] || COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products by Category</CardTitle>
            <CardDescription>Distribution of products across categories</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData.productsByCategory}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" name="Number of Products" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Most ordered products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {productData.topProducts.map((product) => (
                <div key={product._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{product.orderCount} orders</p>
                    <p className="text-sm text-muted-foreground">{product.totalQuantity} units</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Shops</CardTitle>
            <CardDescription>Best performing shops</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shopData.topShops.map((shop) => (
                <div key={shop._id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Store className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{shop.name}</p>
                      <p className="text-sm text-muted-foreground">{shop.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${shop.totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">{shop.orderCount} orders</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Status Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order Status Breakdown</CardTitle>
          <CardDescription>Detailed view of orders by status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {orderData.ordersByStatus.map((status) => (
              <Card key={status._id} className="border-l-4" style={{ borderLeftColor: STATUS_COLORS[status._id] || '#ccc' }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-1 rounded-full" style={{ backgroundColor: STATUS_COLORS[status._id] || '#ccc' }}>
                        {STATUS_ICONS[status._id] || <ShoppingBag className="h-4 w-4 text-white" />}
                      </div>
                      <span className="text-sm font-medium capitalize">{status._id.replace('_', ' ')}</span>
                    </div>
                    <span className="text-xl font-bold">{status.count}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface SummaryCardProps {
  title: string;
  value: string | number;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const SummaryCard = ({ title, value, description, icon, color }: SummaryCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className={`p-2 rounded-full ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardContainer; 