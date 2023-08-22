import FullWithLayout from 'hocs/layouts/FullWithLayout'
import {connect} from 'react-redux'
import {useEffect} from 'react'
import BlogList from 'components/blog/BlogList'
import Header from 'components/blog/Header'
import BlogCategories from 'components/blog/BlogCategories'
import {get_blog_list,get_blog_list_page} from 'redux/actions/blog'

function Blog({
   get_blog_list,
   blog_list,
   count,
   get_blog_list_page
}) {

  useEffect(()=>{
    get_blog_list()
  },[])

  return (
    <FullWithLayout>
        <Header />
        <BlogCategories />
        <BlogList blog_list={blog_list && blog_list} count={count &&count} get_blog_list_page={get_blog_list_page}/>
    </FullWithLayout>

  )
}

const mapStateToProps = state =>({
  blog_list: state.blog.blog_list,
  count: state.blog.count
})

export default connect(mapStateToProps,{
  get_blog_list,
  get_blog_list_page,
})(Blog)
