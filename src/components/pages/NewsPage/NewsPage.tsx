import { useEffect, useState } from 'react';
import * as React from 'react';
import { fetchNews, NewsItemType } from '../../../api/newsAPI.ts';
import { SearchForm } from '../../common/SearchForm.tsx';
import Pagination from '../../common/Pagination.tsx';
import { NewsItemCard } from './NewsItemCard.tsx';
import { Preloader } from '../../common/Preloader.tsx';
import preloader from '../../../assets/preloaderNews.svg';
import { myStyles } from '../../../myStyles/myStyles.ts';
import { normalizeError } from '../../../lib/utils/errorHandler.ts';
import { useTranslation } from 'react-i18next';

const NEWS_PORTION_SIZE = 2;

const NewsPage: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsItemType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const lastPortionItem = currentPage * NEWS_PORTION_SIZE;
  const firstPortionItem = lastPortionItem - NEWS_PORTION_SIZE;

  const onChangePageNumber = (page: number) => {
    setCurrentPage(page);
  };

  const { t, i18n } = useTranslation('newspage');

  const loadNews = async (term: string | undefined, lang: string) => {
    try {
      setErrorMessage(null);
      const news: NewsItemType[] = await fetchNews(term, lang);
      setNewsData(news);
    } catch (err: unknown) {
      setErrorMessage(normalizeError(err));
    }
  };

  useEffect(() => {
    loadNews(undefined, i18n.language);
  }, []);

  const onSubmit = (term: string) => {
    loadNews(term, i18n.language);
  };

  return (
    <div className="flex flex-col h-full p-4 gap-2">
      <header className="border-b pb-2 w-full">
        <h1 className={`${myStyles.pageTitle}`}>{t('title')}</h1>
      </header>
      <main className="relative grid h-full min-h-0">
        {errorMessage && (
          <strong className="absolute top-0 text-red-700 mt-2">{errorMessage}</strong>
        )}
        {!newsData.length ? (
          <div className="flex items-center justify-center h-full pb-15">
            <Preloader preloader={preloader} />
          </div>
        ) : (
          <div className="flex flex-col gap-1 h-full min-h-0">
            <div className="self-center">
              <Pagination
                totalItemsCount={newsData.length}
                currentPage={currentPage}
                onChangePageNumber={onChangePageNumber}
                pageSize={NEWS_PORTION_SIZE}
              />
            </div>

            <div className="overflow-auto">
              {newsData
                .filter((_, index) => firstPortionItem <= index && index < lastPortionItem)
                .map((n: NewsItemType) => (
                  <NewsItemCard key={n.description} {...n} />
                ))}
            </div>
          </div>
        )}
      </main>
      <footer className="w-full border-t pt-4">
        <SearchForm onSubmit={onSubmit} placeholder={t('searchForm.placeholder')} />
      </footer>
    </div>
  );
};

export default NewsPage;
