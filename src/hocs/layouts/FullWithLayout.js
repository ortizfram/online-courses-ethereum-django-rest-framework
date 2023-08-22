import Footer from 'components/navegation/Footer'
import Navbar from 'components/navegation/Navbar'
import {connect} from 'react-redux'



const FullWithLayout = ({children})=> {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    )
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps,{

})(FullWithLayout)
