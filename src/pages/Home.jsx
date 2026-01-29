import React from 'react'

const Home = () => {
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
                    <button>All Posts</button>
                    {/* TODO - Navigate to the blog page */}
                </div>
            </div>

            {/* Recent post section */}
            <div className="recent-post-sec">
                <h2 className='page-heading'>
                    Recent Posts
                </h2>
                <div className="recent-blog-section">

                </div>
            </div>


            {/* Quote and Image section */}
            <div className="quote-sec">

            </div>

            {/* User Info section */}
            <div className="user-info-sec">

            </div>

            {/* Gallery Sections */}
            <div className="gallery-sec">

            </div>
        </div>
    )
}

export default Home