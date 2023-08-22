
import Error404 from "containers/errors/Error404";
import Contact from "containers/pages/Contact";
import Home from "containers/pages/Home";
import Search from "containers/pages/Search";
import Blog from "containers/pages/blog/Blog";
import BlogPost from "containers/pages/blog/BlogPost";
import BlogCategory from "containers/pages/blog/category/BlogCategory";

import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import store from "store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {/* Error Display */}
          <Route path="*" element={<Error404/>}/>

          {/* Home Display */}
          <Route path="/" element={<Home/>}/>

          {/* Contact Display */}
          <Route path="/contact" element={<Contact/>}/>

          {/* Blog */}
          <Route path="/blog" element={<Blog/>}/>
          <Route path="/blog/post/:slug" element={<BlogPost/>}/>
          <Route path="/blog/categories/:category_id" element={<BlogCategory/>}/>

          {/* search */}
          <Route path="/search/:term" element={<Search/>}/>

          
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
