import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@components/OrderListItem';
import { useAdminOrderList } from '@/src/api/orders';
// import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';

export default function ActiveOrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  // useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch active orders</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}