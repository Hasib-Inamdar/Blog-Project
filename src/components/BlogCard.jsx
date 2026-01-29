import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const BlogCard = ({ blog, isManageView = false }) => {
    const navigate = useNavigate()
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    const handleClick = () => {
        if (isManageView) {
            navigate(`/manage-blogs/${blog.id}`)
        } else {
            navigate(`/blogs/${blog.id}`)
        }
    }

    return (
        <article className={isHomePage ? "blog-card home-blog-card" : " blog-card"} onClick={handleClick}>
            <div className="blog-image">
                <img src={blog.image} alt={blog.title} />
            </div>

            <div className="blog-content">
                <div className="blog-author">
                    <img
                        src={blog.aurthorProfileImage}
                        alt={blog.authorName}
                        className="author-avatar"
                    />
                    <div className="author-meta">
                        <p className="author-name">{blog.authorName}</p>
                        <p className="blog-date">{blog.date}</p>
                    </div>
                </div>

                <h3 className="blog-title">{blog.title}</h3>

                <p className="blog-desc">{blog.description}</p>
            </div>
        </article>
    );
};

export default BlogCard;
