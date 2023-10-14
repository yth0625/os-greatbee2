import React, { useEffect, useState } from 'react';
import {
  getCategory1ListApi,
  getCategoryListApi,
} from 'api/useEprocurementApi';
import { IProdCategory } from 'interfaces/eprocurement';
import { categoryIcons } from 'const/constance';

interface ICategoryBase {
  value: number;
  label: string;
}

interface ICategory extends ICategoryBase {
  to: number;
  children?: ICategory[];
}

interface ICategories {
  icon: string;
  value: number;
  label: string;
  children: ICategory[];
}

const useCategory = () => {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [loading, setLoading] = useState<boolean>(false);



  let secondCategory: any = [];

  const getCategory1List = async () => {
    const res = await getCategory1ListApi();
    const result = res.data.data.map((item: IProdCategory, i: number) => {
      if (categoryIcons[i].value === item.cateNo) {
        return {
          value: item.cateNo,
          label: item.cateNm,
          children: [],
          icon: categoryIcons[i].icon,
        };
      }
    });

    return result.splice(1);
  };

  const getCategory2List = async (category1List: any) => {
    const values = await Promise.all(
      category1List.map((category1: any) =>
        getCategoryListApi({ lCateNo: category1.value }),
      ),
    );
    for (let i = 0; i < values.length; i++) {
      const res = values[i];
      const category2result = res.data.data.map((item: IProdCategory) => {
        return {
          to: category1List[i].value,
          value: item.cateNo,
          label: item.cateNm,
          children: [],
        };
      });
      category1List[i].children = category2result;

      secondCategory.push(category2result);
    }

    return category1List;
  };

  const getCategory3List = async (category1List: any) => {
    const promises = [];
    for (const category1 of category1List) {
      for (const category2 of category1.children) {
        promises.push(getCategoryListApi({ mCateNo: category2.value }));
      }
    }

    const values = await Promise.all(promises);
    // console.log('values333:', values);

    let baseIdx = 0;
    for (let i = 0; i < category1List.length; i++) {
      const category2List = category1List[i].children;

      for (let j = 0; j < category2List.length; j++) {
        const res = values[baseIdx + j];
        // console.log('res:', baseIdx + j, res);
        const category3result = res.data.data.map((item: IProdCategory) => {
          return {
            grand: category1List[i].value,
            to: category2List[j].value,
            value: item.cateNo,
            label: item.cateNm,
            children: [],
          };
        });
        category2List[j].children = category3result;
      }

      baseIdx += category1List[i].children.length;
    }

    return category1List;
  };

  const mappingCategory = async () => {
    setLoading(true);
    const categoryList1 = await getCategory1List();
    const categoryList2 = await getCategory2List(categoryList1);
    const categoryList3 = await getCategory3List(categoryList2);
    setCategories(categoryList3);
    setLoading(false);

    console.log('categories:', categoryList3)

    sessionStorage.setItem('categories', JSON.stringify(categoryList3));
  };

  useEffect(() => {
    const categories = sessionStorage.getItem('categories');
    if (categories !== null) {
      setCategories(JSON.parse(categories));
      return;
    }

    mappingCategory().then(() => {});
  }, []);

  return {
    categories,
    loading,
  };
};

export default useCategory;
