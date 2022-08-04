import React from 'react';

const Newsitem =(props) => {
        let {title,description,imageUrl,newsUrl,author,date,source} = props;      
        return <div className="my-3">
            <div className="card mx-2">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:  '90%',zIndex: '1'}}>{source}</span>
                <img src={!imageUrl?"img_not_found.jpg":imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                    <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-danger">Read More</a>
                </div>
            </div>
        </div>;
}

export default Newsitem;
