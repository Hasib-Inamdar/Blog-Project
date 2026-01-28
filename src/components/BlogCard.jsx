import React from "react";

const BlogCard = ({ blog }) => {
    return (
        <article className="blog-card">
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
