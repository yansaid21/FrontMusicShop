import React from 'react'
import "./GeneralFooter.scss"
import musicLogo from "../../../assets/svg/music-play-svgrepo-com.svg";
import {FacebookOutlined,LinkedinOutlined,InstagramOutlined} from "@ant-design/icons"

const GeneralFooter = () => {
  return (
    <div className="footer-section">
    <div className="container">
      <div className="footer-cta pt-5 pb-5">
        <div className="row">
          <div className="firstContainer">
            <div className="single-cta">
              <i className="fas fa-map-marker-alt"></i>
              <div className="cta-text">
                <h4>Find us</h4>
                <span>Antigua Estación del Ferrocarril, Manizales, Caldas</span>
              </div>
            </div>
          </div>
          <div className="firstContainer">
            <div className="single-cta">
              <i className="fas fa-phone"></i>
              <div className="cta-text">
                <h4>Call us</h4>
                <span>310-376-7661</span>
              </div>
            </div>
          </div>
          <div className="firstContainer">
            <div className="single-cta">
              <i className="far fa-envelope-open"></i>
              <div className="cta-text">
                <h4>Mail us</h4>
                <span>musicshop@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-content pt-5 pb-5">
        <div className="row">
          <div className="innerContaner">
            <div className="footer-widget">
              <div className="footer-logo">
                <a href="/"><img src={musicLogo} className="img-fluid" alt="logo" /></a>
              </div>
              <div className="footer-text">
                <p>Somos Una empresa que se compromete a entregarte los productos de primera del mercado, puedes confiar en nosotros y en la calidad de lo que ofrecemos</p>
              </div>
              <div className="footer-social-icon">
                <span>Follow us</span>
                <div className='iconsInFooter'>
                <a href="#"><FacebookOutlined /></a>
                <a href="#"><LinkedinOutlined /></a>
                <a href="#"><InstagramOutlined /></a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
            <div className="footer-widget">
              <div className="footer-widget-heading">
                <h3>Useful Links</h3>
              </div>
              <ul>
                <li><a href="/login">LogIn</a></li>
                <li><a href="/SignUp">SignUp</a></li>
                <li><a href="/privacy">Privacy</a></li>
                <li><a href="/pqrsf">PQRSF</a></li>
              </ul>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
          </div>
        </div>
      </div>
    </div>
    <div className="copyright-area">
      <div className="container">
        <div className="row">
          <div className="col-xl-6 col-lg-6 text-center text-lg-left">
            <div className="copyright-text">
              <p>Copyright &copy; 2023, All Right Reserved </p>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
            <div className="footer-menu">
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="privacy">Privacy</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default GeneralFooter
