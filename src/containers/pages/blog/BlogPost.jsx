import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom'; 
import { get_blog } from 'redux/actions/blog';
import FullWithLayout from 'hocs/layouts/FullWithLayout';
import LoadingCard from 'components/loaders/LoadingCard';

function BlogPost({ get_blog, post }) {
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    get_blog(slug);
  }, [slug, get_blog]); 

  return (
    <FullWithLayout>
      {post ? (
        <div className="relative py-16 bg-white overflow-hidden">
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto">
              {/* <img src={post.thumbnail.url} className='w-full h-full p-4' alt="" /> */}
              <h1>
                <span className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                  {post.category.name}
                </span>
                <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  {post.title}
                </span>
              </h1>
              <p className="mt-8 text-xl text-gray-500 leading-8">{post.excerpt}</p>
            </div>
            <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
              <p>{post.description}</p>
            </div>
          </div>
        </div>
      ) : (
        <LoadingCard />
      )}
    </FullWithLayout>
  );
}

const mapStateToProps = (state) => ({
  post: state.blog.post,
});

export default connect(mapStateToProps, {
  get_blog,
})(BlogPost);
