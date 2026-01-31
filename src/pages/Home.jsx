import React from 'react'
import { useGetAllBlogsQuery } from '../features/blogs/blogApi'
import BlogCard from '../components/BlogCard'
import ContactForm from '../components/ContactForm'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const { data: blogs, isLoading: isLoadingBlogs, isError: isErrorLoadingBlogs, error } = useGetAllBlogsQuery()
    const navigate = useNavigate()
    return (
        <div className='home-main-cnt'>

            {/* Hero section */}
            <div className="hero-section">
                <div className="hero-img-sec">
                    <img src="https://static.wixstatic.com/media/84770f_231a1c5c6e1d48e5a425809e93319bdc~mv2.jpg/v1/fill/w_950,h_1099,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/84770f_231a1c5c6e1d48e5a425809e93319bdc~mv2.jpg" alt="" />
                </div>
                <div className="featured-blog">
                    <h4>My Thoughts</h4>
                    <div className='dummy-blog'>
                        <img src="https://static.wixstatic.com/media/f5af78_81b23a68d5ac4cb699ddd6f7fbd93035~mv2_d_3000_2246_s_2.jpg/v1/fill/w_1760,h_1760,fp_0.50_0.50,q_90,enc_avif,quality_auto/f5af78_81b23a68d5ac4cb699ddd6f7fbd93035~mv2_d_3000_2246_s_2.jpg" alt="" />
                        <div className='dummy-blog-text'>
                            <h5>Detoxing my social media feed</h5>
                            <p>Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading....</p>
                        </div>
                    </div>
                    <button onClick={() => navigate("/blogs")}>All Posts</button>
                    {/* TODO - Navigate to the blog page */}
                </div>
            </div>

            {/* Recent post section */}
            <div className="recent-post-sec">
                <h2 className='page-heading'>
                    Recent Posts
                </h2>
                <div className="recent-blog-section">
                    {
                        blogs?.map((blog) => (
                            <BlogCard key={blog.id} blog={blog}></BlogCard>
                        ))
                    }
                </div>
            </div>


            {/* Quote and Image section */}
            <div className="quote-img-sec">
                <div className='quote-cnt'>
                    <p className='quote'>” I always get to where I’m going by walking away from where I have been.”</p>
                    <p className='quote-reference'>~ Winnie the Pooh, A.A. Milne</p>
                </div>
                <div className='img-sec'>
                    <img src="https://static.wixstatic.com/media/f5af78_d7dc4ce6e37b42ce94fd69e41e81d09c~mv2.jpeg/v1/fill/w_950,h_1040,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/f5af78_d7dc4ce6e37b42ce94fd69e41e81d09c~mv2.jpeg" alt="" />
                </div>
            </div>

            {/* User Info section */}
            <div className="user-info-sec">

            </div>

            {/* Gallery Sections */}
            <div className="gallery-sec">
                <div className="gal-heading-sec">
                    <h2 className='page-heading'>Always Makes Me Smile</h2>
                </div>
                <div className="gal-img-sec">
                    <img src="https://picsum.photos/800/400?random=1" alt="" className='gal-img' />
                    <img src="https://picsum.photos/800/400?random=2" alt="" className='gal-img' />
                    <img src="https://picsum.photos/800/400?random=3" alt="" className='gal-img' />
                    <img src="https://picsum.photos/800/400?random=4" alt="" className='gal-img' />
                    <img src="https://picsum.photos/800/400?random=5" alt="" className='gal-img' />
                    <img src="https://picsum.photos/800/400?random=6" alt="" className='gal-img' />
                    <img src="https://picsum.photos/800/400?random=7" alt="" className='gal-img' />
                    <img src="https://picsum.photos/800/400?random=8" alt="" className='gal-img' />
                    <img src="https://picsum.photos/800/400?random=9" alt="" className='gal-img' />
                    <img src="https://picsum.photos/800/400?random=10" alt="" className='gal-img' />
                </div>
            </div>

            {/* Contact Form */}
            <div className='home-form-sec' id='home-form-sec'>
                <div className="home-form-heading">
                    <h2 className='page-heading'>Join the Conversations</h2>
                    <p>Get the content you need, just when you need it</p>
                </div>
                <ContactForm isInFooter={false}></ContactForm>
            </div>
        </div>
    )
}

export default Home