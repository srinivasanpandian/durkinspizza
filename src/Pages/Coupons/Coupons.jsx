import './Coupons.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import CouponImg1 from '../../assets/images/Coupons/coupons_1.png';
import CouponImg2 from '../../assets/images/Coupons/coupons_2.png';
import CouponImg3 from '../../assets/images/Coupons/coupons_3.png';
import CouponImg4 from '../../assets/images/Coupons/coupon.jpg';


const Coupons = () => {

    const coupon = [
        {
            img: CouponImg1,
            title: 'Coupon 1',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        },
        {
            img: CouponImg2,
            title: 'Coupon 2',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        },
        {
            img: CouponImg4,
            title: 'Coupon 3',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.',
        }
    ]

    return (
        <div className="coupons-page-container">
            <div className="coupons-page">
                <Header />
            </div>

            <div className="coupons-page-content py-5 pt-4">
                <div className="container">
                    <div className="row">
                        <p className="coupons-page-content-title">Deals & Discounts</p>
                        <div className="coupons-page-content-body">
                            <div className="row">
                                {coupon.map((couponItem, index) => (
                                    <div key={index} className="col-12 col-sm-6 col-lg-4 mb-4 mx-auto">
                                        <div className="coupons-page-content-body-card">
                                            <div className="coupons-page-content-body-card-image">
                                                <img src={couponItem.img} alt={couponItem.title} className="img-fluid" />
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
    )
}

export default Coupons;