import {React,useState,useEffect} from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

const News =(props) =>{


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)


    const handleNextClick = async () => {
        if (page + 1 > Math.ceil(totalResults / 9)) {

        }
        else {
            let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
            setLoading(true)  
            let data = await fetch(url);
            let parsedData = await data.json();
            setPage(page + 1)
            setArticles(parsedData.articles)
            setLoading(false);
        }
    }

    const handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pageSize}`;
        setLoading(true) 
        let data = await fetch(url);
        let parsedData = await data.json();
        setPage(page-1);
        setArticles(parsedData.articles)
        setLoading(false)
    }

    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    }

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
        setLoading(true);   
        props.setProgress(30)
        let data = await fetch(url);  
        let parsedData = await data.json();
        props.setProgress(70)
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults)
        setLoading(false);
        props.setProgress(100)
    }

    useEffect(()=> {
        console.log('render')
        updateNews();
        document.title = `${capitalizeFirstLetter(props.category)} - The News Article`;
    },[]);

        return(
            <>
            <div className="container my-3">
            <h2 style={{marginTop:'90px'}}>Top Headlines from {capitalizeFirstLetter(props.category)} <span className="badge bg-danger">The News Article</span></h2>
            {loading && <Spinner />}
            <InfiniteScroll
                className="infinite-scroll-component"
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </div>
        {/* <div className="container d-flex justify-content-between">
                <button disabled={state.page <= 1} className="btn btn-danger" onClick={handlePrevClick}>&larr; Previous</button>
                <button disabled={(state.page + 1 > Math.ceil(state.totalResults / 9))} className="btn btn-danger" onClick={handleNextClick}>Next &rarr;</button>
            </div> */}
        </>
        )
}

 News.defaultProps = {
    country: 'in',
    pageSize: 9,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number
}
export default News;
