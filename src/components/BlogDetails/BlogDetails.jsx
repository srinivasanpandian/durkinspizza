import './BlogDetail.css';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import blogData from '../../utils/blogData.json';

const BlogDetails = () => {
    const { blogTitle } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [previousBlog, setPreviousBlog] = useState(null);
    const [nextBlog, setNextBlog] = useState(null);

    // Function to convert blog title to slug
    const titleToSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    // Function to get slug from blog (use slug field if available, otherwise generate from title)
    const getBlogSlug = (blog) => {
        return blog.slug || titleToSlug(blog['blog-title']);
    };

    // Function to find blog by slug
    const findBlogBySlug = (slug) => {
        return blogData.find(blog => getBlogSlug(blog) === slug);
    };

    useEffect(() => {
        const foundBlog = findBlogBySlug(blogTitle);
        setBlog(foundBlog);

        if (foundBlog) {
            // Find previous blog
            const currentIndex = blogData.findIndex(blog => blog.id === foundBlog.id);
            const prevBlog = currentIndex > 0 ? blogData[currentIndex - 1] : null;
            setPreviousBlog(prevBlog);

            // Find next blog
            const nextBlog = currentIndex < blogData.length - 1 ? blogData[currentIndex + 1] : null;
            setNextBlog(nextBlog);
        }
    }, [blogTitle]);

    const handleNavigation = (blog) => {
        const slug = getBlogSlug(blog);
        navigate(`/blog/${slug}`);
    };

    // Filter recent blogs (excluding current blog and sorting by date)
    const getRecentBlogs = () => {
        if (!blog) return [];

        return blogData
            .filter(blogItem => blogItem.id !== blog.id)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 4); // Show only 4 most recent blogs
    };

    const recentBlogs = getRecentBlogs();

    if (!blog) {
        return (
            <div className="blog-details-container">
                <div className="blog-details">
                    <Header />
                </div>
                <div className="blog-details-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <p>Blog not found</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const renderDescriptionWithLinks = (description, links) => {
        if (!links || links.length === 0) {
            return description;
        }

        // Split the description by link texts to create an array of text and link objects
        let parts = [{ type: 'text', content: description }];

        links.forEach(link => {
            const newParts = [];
            parts.forEach(part => {
                if (part.type === 'text') {
                    const splitContent = part.content.split(link.text);
                    splitContent.forEach((content, index) => {
                        if (content) {
                            newParts.push({ type: 'text', content });
                        }
                        if (index < splitContent.length - 1) {
                            newParts.push({ type: 'link', content: link.text, href: link.href });
                        }
                    });
                } else {
                    newParts.push(part);
                }
            });
            parts = newParts;
        });

        return (
            <span>
                {parts.map((part, index) => {
                    if (part.type === 'link') {
                        // Check if it's an external link (starts with http/https)
                        if (part.href.startsWith('http://') || part.href.startsWith('https://')) {
                            return (
                                <a
                                    key={index}
                                    href={part.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'underline' }}
                                >
                                    {part.content}
                                </a>
                            );
                        } else {
                            // Internal link - use React Router Link
                            return (
                                <Link
                                    key={index}
                                    to={part.href}
                                    style={{ textDecoration: 'underline' }}
                                >
                                    {part.content}
                                </Link>
                            );
                        }
                    }
                    return part.content;
                })}
            </span>
        );
    };

    return (
        <div className="blog-details-container">
            <div className="blog-details">
                <Header />
            </div>

            <div className="blog-details-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-8 mx-auto">
                            <h1 className="blog-details-content-title">
                                {blog['blog-title']}
                            </h1>
                            <p className="blog-details-content-date">{blog.date}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <p className='blog-details-content-description'>
                                {blog['blog-detail-description']}
                            </p>

                            {blog.sections && blog.sections.map((section, index) => (
                                <div key={index} className="blog-details-section-content">
                                    <h2 className="blog-details-section-title">{section.title.toUpperCase()}</h2>
                                    <p className="blog-details-section-description">
                                        {renderDescriptionWithLinks(section.description, section.links)}
                                    </p>
                                </div>
                            ))}

                            {/* Blog Navigation */}
                            <div className="blog-details-navigation">
                                <div className="row">
                                    <div className="col-12 col-md-6 mx-auto mb-2">
                                        {previousBlog && (
                                            <div
                                                className="blog-nav-link blog-nav-prev"
                                                onClick={() => handleNavigation(previousBlog)}
                                            >
                                                <div className="blog-nav-content">
                                                    <span className="blog-nav-label"><i className="fas fa-chevron-left me-2"></i>Previous</span>
                                                    <span className="blog-nav-title">{previousBlog['blog-title']}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12 col-md-6 mx-auto">
                                        {nextBlog && (
                                            <div
                                                className="blog-nav-link blog-nav-next"
                                                onClick={() => handleNavigation(nextBlog)}
                                            >
                                                <div className="blog-nav-content">
                                                    <span className="blog-nav-label">Next<i className="fas fa-chevron-right ms-2"></i></span>
                                                    <span className="blog-nav-title">{nextBlog['blog-title']}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="blog-details-social">
                                <a href="https://www.facebook.com/durkinspizza5" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-facebook"></i>
                                </a>
                                <a href="https://www.instagram.com/durkinspizza/" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a href="https://x.com/durkinspizza" target="_blank" rel="noopener noreferrer">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Blogs Section */}
            <div className="recent-blogs-container">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="recent-blogs-title">Recent Blogs</h2>
                            <div className="row">
                                {recentBlogs.map((recentBlog) => (
                                    <div key={recentBlog.id} className="col-sm-12 col-md-6 col-lg-3 mb-3">
                                        <div
                                            className="recent-blog-card"
                                            onClick={() => handleNavigation(recentBlog)}
                                        >
                                            <div className="recent-blog-image">
                                                <img src={recentBlog.img} alt={recentBlog['blog-title']} />
                                            </div>
                                            <div className="recent-blog-content">
                                                <h3 className="recent-blog-title">{recentBlog['blog-title']}</h3>
                                                <p className="recent-blog-date">{recentBlog.date}</p>
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
    );
};

export default BlogDetails;

