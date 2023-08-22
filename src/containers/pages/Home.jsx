import FullWithLayout from "hocs/layouts/FullWithLayout";
import { connect } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
import WantDemoForm from 'components/home/forms/WantDemoForm'
import Header from "components/home/Header";

function Home({}) {
  return (
    <FullWithLayout>
      <Header />
      <WantDemoForm />
    </FullWithLayout>
  );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Home);
