import React from "react";
import FullWithLayout from "hocs/layouts/FullWithLayout";
// /** @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react';

function Error404() {
  return (
    <FullWithLayout>
      <div style={styles.container}>
        <img
          src="https://standsinfire.files.wordpress.com/2012/01/monkey_in_tuxedo_5i4g.jpg"
          alt="404 Monkey"
          style={styles.image}
          
        />
        <h1 style={styles.title}>Oops! Page not found.</h1>
        <p style={styles.text}>
          Looks like you've ventured into the jungle. This page doesn't exist.
        </p>
        <a href="/" style={styles.link}>
          Go back to safety
        </a>
      </div>
    </FullWithLayout>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
  },
  image: {
    maxWidth: '300px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#333',
  },
  text: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#666',
  },
  link: {
    fontSize: '16px',
    color: '#007bff',
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out',
    ':hover': {
      color: '#0056b3',
    },
  },
};

export default Error404;
