import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useAlert } from "react-alert";

const Alert = ({ alert }) => {
  const showAlert = useAlert();

  useEffect(() => {
    if (alert.show) {
      showAlert.show(alert.msg, { type: alert.type });
    }
  }, [alert]); // Dependency array to trigger effect only when alert changes

  return (
    // Optionally render content based on alert state
    <></>
  );
};

const mapStateToProps = (state) => ({
  alert: state.alerts,
});

export default connect(mapStateToProps)(Alert);