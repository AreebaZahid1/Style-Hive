import React from "react";
import { Link } from "react-router-dom";
import "../Style/Home.css";
import {Shirt,Home as HomeIcon, ShoppingBag} from "lucide-react";

function Home() {
  return (
    <div className="home">

      <section className="hero">
        <div className="hero-content">

          <div className="hero-tag">
            ✦ NEW COLLECTION 2026
          </div>

          <h1>Elevate Your<span>Everyday Style.</span></h1>

          <p>
            Discover thoughtfully selected products that
            bring style, quality and simplicity into your
            everyday life.
          </p>

          <div className="hero-buttons">

            <Link to="/products"className="primary-btn">
              Explore Collection
              <span>→</span>
            </Link>

            <Link to="/category" className="secondary-btn">
              Browse Categories
            </Link>

          </div>

          <div className="hero-stats">

            <div>
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>50+</strong>
              <span>Categories</span>
            </div>

            <div>
              <strong>4.8</strong>
              <span>Customer Rating</span>
            </div>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="visual-circle"></div>

          <div className="visual-card card-one">
            <span>✦</span>
            PREMIUM
          </div>

          <div className="visual-card card-two">
            <strong>STYLE</strong>
            <small>FOR EVERY DAY</small>
          </div>

          <div className="visual-center">
            <div className="center-text">
              <span>THE</span>
              <strong>STYLE</strong>
              <span>COLLECTION</span>
            </div>
          </div>

        </div>

      </section>


      <section className="trust-bar">

        <div className="trust-item">
          <span className="trust-icon">🚚</span>
          <div>
            <strong>Fast Delivery</strong>
            <p>Quick doorstep delivery</p>
          </div>
        </div>

        <div className="trust-item">
          <span className="trust-icon">✓</span>
          <div>
            <strong>Quality Guaranteed</strong>
            <p>Carefully selected products</p>
          </div>
        </div>

        <div className="trust-item">
          <span className="trust-icon">🔒</span>
          <div>
            <strong>Secure Shopping</strong>
            <p>Your data stays protected</p>
          </div>
        </div>

        <div className="trust-item">
          <span className="trust-icon">↻</span>
          <div>
            <strong>Easy Experience</strong>
            <p>Simple & convenient shopping</p>
          </div>
        </div>

      </section>

<section className="categories-section">

  <div className="section-heading">

    <div>
      <p className="section-label">
        DISCOVER MORE
      </p>

      <h2>
        Shop by Category
      </h2>
    </div>

    <Link to="/category">
      View all →
    </Link>

  </div>


  <div className="category-grid">

    {/* Fashion */}

    <Link
      to="/category"
      className="category-card category-fashion"
    >

      <div className="category-icon">
        👗
      </div>

      <div className="category-content">

        <span>01</span>

        <h3>Fashion</h3>

        <p>
          Clothing & everyday wear
        </p>

        <div className="category-arrow">
          Explore →
        </div>

      </div>

    </Link>


    {/* Lifestyle */}

    <Link
      to="/category"
      className="category-card category-lifestyle"
    >

      <div className="category-icon">
        🏠
      </div>

      <div className="category-content">

        <span>02</span>

        <h3>Lifestyle</h3>

        <p>
          Products for better living
        </p>

        <div className="category-arrow">
          Explore →
        </div>

      </div>

    </Link>


    {/* Accessories */}

    <Link
      to="/category"
      className="category-card category-accessories"
    >

      <div className="category-icon">
        👜
      </div>

      <div className="category-content">

        <span>03</span>

        <h3>Accessories</h3>

        <p>
          Complete your everyday look
        </p>

        <div className="category-arrow">
          Explore →
        </div>

      </div>

    </Link>

  </div>

</section>

      {/* ================= PROMO ================= */}

      <section className="promo-section">

        <div className="promo-content">

          <p className="section-label">
            STYLEHIVE EDIT
          </p>

          <h2>
            Designed for
            <br />
            <span>your lifestyle.</span>
          </h2>

          <p>
            From everyday essentials to statement pieces,
            find products that fit your personality and
            make every moment feel a little better.
          </p>

          <Link
            to="/products"
            className="promo-btn"
          >
            Shop the Collection →
          </Link>

        </div>


        <div className="promo-side">

          <div className="promo-number">
            01
          </div>

          <div className="promo-line"></div>

          <div className="promo-word">
            STYLE
          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="final-cta">

        <p className="section-label">
          START EXPLORING
        </p>

        <h2>
          Find something
          <span>you'll love.</span>
        </h2>

        <p>
          Browse our latest collection and discover
          products made for you.
        </p>

        <Link
          to="/products"
          className="final-btn"
        >
          Explore Products →
        </Link>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="footer">

        <div className="footer-brand">

          <Link to="/" className="brand">
            STYLE<span>HIVE</span>
          </Link>

          <p>
            Style. Quality. Simplicity.
          </p>

        </div>

        <p className="copyright">
          © 2026 StyleHive. All rights reserved.
        </p>

      </footer>

    </div>
  );
}

export default Home;
