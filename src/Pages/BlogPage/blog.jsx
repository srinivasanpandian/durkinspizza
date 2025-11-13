import './blog.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import blogData from '../../utils/blogData.json';

const Blog = () => {
    const navigate = useNavigate();

    const handleBlogClick = (blog) => {
        // Use slug if available, otherwise generate from title
        const slug = blog.slug || blog['blog-title']
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
            .trim();
        navigate(`/blog/${slug}`);
    };

    return (
        <div className="blog-page-container">
            <div className="blog-page">
                <Header />
            </div>

            <div className="blog-page-content py-5">
                <div className="container">
                    <div className="row">
                        <p className="blog-page-content-title">Latest Blog Buzz</p>
                        <div className="blog-page-content-body">
                            <div className="row">
                                {blogData.map((blog) => (
                                    <div key={blog.id} className="col-12 col-sm-6 col-lg-4 mb-4">
                                        <div
                                            className="blog-page-content-body-card"
                                            onClick={() => handleBlogClick(blog)}
                                        >
                                            <div className="blog-page-content-body-card-image">
                                                <img src={blog.img} alt={blog['blog-title']} className="img-fluid" />
                                            </div>
                                            <div className="blog-page-content-body-card-content">
                                                <p className="blog-page-content-body-card-title">{blog['blog-title']}</p>
                                                <p className="blog-page-content-body-card-description">{blog['blog-detail-description']}</p>
                                                <p className="blog-page-content-body-card-date">{blog.date}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default Blog;
