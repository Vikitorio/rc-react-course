import React, { useState, useEffect, useCallback } from 'react';
import TopControls from '../components/TopControls/TopControls';
import SearchResult from '../components/SearchResult/SearchResult';
import ErrorBtn from '../components/ErrorBtn/ErrorBtn';

interface AstronomicalObject {
  uid: string;
  name: string;
  astronomicalObjectType: string;
  location: Location;
}
interface Location {
  name: string;
}
interface Pagination {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}
interface ApiResponse {
  page: Pagination;
  astronomicalObjects: AstronomicalObject[];
}

const MainLayout: React.FC = () => {
  const [apiResponce, setApiResponce] = useState<ApiResponse>({
    page: {
      pageNumber: 0,
      pageSize: 10,
      numberOfElements: 0,
      totalElements: 0,
      totalPages: 0,
      firstPage: true,
      lastPage: false,
    },
    astronomicalObjects: [],
  });
  const [searchParam, setSearchParam] = useState<string>(
    localStorage.getItem('searchValue') || ''
  );
  const [currentPageSize, setCurrentPageSize] = useState<string>('10');
  const [currentPage, setCurrentPage] = useState<string>('0');
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = 'https://stapi.co/api/v2/rest/astronomicalObject/';
  const fetchData = useCallback(() => {
    const url = new URL(baseUrl + 'search');
    const bodyForm = new URLSearchParams();
    bodyForm.append('name', searchParam);
    url.searchParams.append('name', searchParam.toString());
    url.searchParams.append('pageNumber', currentPage.toString());
    url.searchParams.append('pageSize', currentPageSize.toString());
    fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyForm.toString(),
    })
      .then((responce) => responce.json())
      .then((data) => {
        setTimeout(() => {
          setisLoading(false);
          setError(null);
          setApiResponce(data);
          setCurrentPage(
            Math.min(Number(currentPage), data.page.totalPages - 1).toString()
          );
        }, 1000);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setisLoading(false);
        setError(error.message);
      });
  }, [searchParam, currentPage, currentPageSize]);

  useEffect(() => {
    setisLoading(true);
    fetchData();
  }, [searchParam, currentPageSize, currentPage, fetchData]);

  const handleSeachParam = (searchValue: string) => {
    if (searchParam === searchValue.trim()) {
      fetchData();
    } else {
      setSearchParam(searchValue);
    }
  };

  return (
    <>
      <TopControls onSearch={handleSeachParam} />
      <SearchResult
        data={apiResponce}
        pageSizeChange={setCurrentPageSize}
        pageChange={setCurrentPage}
        isLoading={isLoading}
        error={error}
        pageSize={currentPageSize}
      />
      <ErrorBtn />
    </>
  );
};

export default MainLayout;
