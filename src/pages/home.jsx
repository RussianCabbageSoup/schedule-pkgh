import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import Schedule from "../components/schedule/schelude"

const Home = ({ data }) => {
    return(
        <>
            <Header data={data} />
            <Schedule data={data} />
            <Footer />
        </>
    )
}

export default Home