import { useGetBestProductListByClientApi } from '../../api/useEprocurementApi';
import { FavoriteItem } from './Favorite';

function BestProduct() {
  const { data, isLoading } = useGetBestProductListByClientApi();

  return (
    <FavoriteItem data={data} isLoading={isLoading}/>
  );
}

export default BestProduct
